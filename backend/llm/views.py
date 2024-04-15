from django.http import Http404, HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from openai import OpenAI
from openai import AzureOpenAI
import openai
import os
from django.contrib import messages
import json
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import OpenAIChatResponse
from .serializers import OpenAIChatResponseSerializer
from .models import ChatGptBot
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse,parse_qs
import nltk 
from llmlingua import PromptCompressor

def check_url_content(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:

            soup = BeautifulSoup(response.content, 'html.parser')

            return soup

        else:
            print("Failed to fetch content from the URL. Status code:", response.status_code)
    except requests.exceptions.RequestException as e:
        print("Error occurred while fetching content:", e)

def get_celex(url):
    parsed_url = urlparse(url)
    query_params = parse_qs(parsed_url.query)
    celex_number = query_params.get('uri')
    
    if celex_number:
        celex_number_str = celex_number[0]
        celex_number2 = celex_number_str.replace("CELEX:", "")

        return celex_number2
    else:
        return None


def get_text_content(content):
    text_content = content.get_text()
    return text_content

def llmlingua_style_compress(prompt):
    llm_lingua = PromptCompressor()
    compressed_prompt = llm_lingua.compress_prompt(prompt, instruction="", question="", target_token=500)
    print("compressed_prompt" + compressed_prompt)
    return compressed_prompt['compressed_prompt']

class OpenAIChatAPIPostView(APIView):

    def post(self, request, *args, **kwargs):

        apiToken = request.data.get('apiToken', '')

        client = OpenAI(
            # This is the default and can be omitted
            api_key=apiToken,
        )

        user_input = request.data.get('input_message', '')

        url = str(user_input).strip()

        content = check_url_content(url)

        text_content = get_text_content(content)

        celex = get_celex(url)

        prompt_struc = """
        Here is the template for the summary structure should follow, make a very long summary:

        SUMMARY OF:
        - [titles of the original resource(s) in bullet form and hyperlinked]

        WHAT IS THE AIM OF ......?
        <content here>

        KEY POINTS
        <content here>

        FROM WHEN DOES THE DECISION APPLY?
        <content here>

        BACKGROUND
        <content here>

        KEY TERMS
        - **<bullet list of terms, bolding the term>**

        MAIN DOCUMENT
        - [the title(s) of the main document(s), in bullet form and hyperlinked]

        RELATED DOCUMENTS
        <titles of related documents if any>
        """
        final_prompt = "given article : " + text_content + " with prompt  " + prompt_struc
        #compressed_prompt = llmlingua_style_compress(final_prompt)
        
        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",   
                messages=[
                    {
                        "role": "user",
                        "content": final_prompt
                    }
                ],
                max_tokens=2000,   
                temperature=0.7,   
                stop=None,   
            )
            title = client.chat.completions.create(
                model="gpt-3.5-turbo",   
                messages=[
                    {
                        "role": "user",
                        "content": "write a title for this content: "+ url,
                    }
                ],
                max_tokens=20,   
            )

            bot_response = response.choices[0].message.content
            title = title.choices[0].message.content
            if response.object == 'chat.completion':
                return Response({"bot_response": bot_response, "celex": celex, "title": title}, status=status.HTTP_201_CREATED)
            else:
                return render(request,  "success.html", {"updatedSummary" : bot_response})
            
        except openai.APIError as e:
            print("OpenAI API Error:", e)
        except Exception as e:
            print("Error:", e)
        except openai.APIConnectionError as e:
            messages.warning(request, f"Failed to connect to OpenAI API, check your internet connection")
        except openai.RateLimitError as e:
            messages.warning(request, f"You exceeded your current quota, please check your plan and billing details.")
            messages.warning(request, f"If you are a developper change the API Key")
        
            



class AzureOpenAIChatAPIPostView(APIView):

    """
    OpenAI on Azure
    Using the curl command to post OpenAI prompt
    Example curl in terminal:
    curl -X POST http://localhost:8000/api/summaries/azureopenai/ -H "Content-Type: application/json" -d '{"input_message": "hello"}'
    curl -X POST http://localhost:8000/api/summaries/azureopenai/ -H "Content-Type: application/json" -d '{"input_message": "Make a summary of https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32019L0633"}'
    """
    def post(self, request, *args, **kwargs):
        # Extract data from the request
        user_input = request.data.get('input_message', '')
        api_base = os.getenv("AZURE_OPENAI_ENDPOINT")
        api_key= os.getenv("AZURE_OPENAI_API_KEY")
        deployment_name = 'gpt4-test'
        api_version = '2023-12-01-preview' # this might change in the future

        client = AzureOpenAI(
            api_key=api_key,
            api_version=api_version,
            base_url=f"{api_base}/openai/deployments/{deployment_name}"

        )
        response = client.chat.completions.create(
            model=deployment_name,
            messages=[
                {"role": "system", "content": user_input},
            ],
            max_tokens=999
        )
        summary = response.choices[0].message.content
        # Check if the request was successful
        if response.object == 'chat.completion':
            # Save the OpenAI response to the database        
            # Serialize and return the response
            serializer = OpenAIChatResponseSerializer(data={'summary': response.choices[0].message.content})
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'error': 'Failed to fetch data from OpenAI API.'}, status=status.HTTP_400_BAD_REQUEST)
