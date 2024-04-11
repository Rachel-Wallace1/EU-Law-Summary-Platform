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


class OpenAIChatAPIPostView(APIView):

    """
    curl -X POST http://localhost:8000/api/summaries/openai/ -H "Content-Type: application/json" -d '{"input_message": "hello"}'
    curl -X POST http://localhost:8000/api/summaries/openai/ -H "Content-Type: application/json" -d '{"input_message": "Make a summary of https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32019L0633"}'
    """
    def post(self, request, *args, **kwargs):
        apiToken = request.data.get('apiToken', '')
        client = OpenAI(
            # This is the default and can be omitted
            api_key=apiToken,
        )
        user_input = request.data.get('input_message', '')
        
        clean_user_input = str(user_input).strip()
        try:
            response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                        {
                            "role": "user",
                            "content": clean_user_input,
                        }
                    ],
                )
            
            bot_response = response.choices[0].message.content
            print("clean_user_input is " +clean_user_input)
            print("Bot response is " +bot_response)
            # Check if the request was successful
            if response.object == 'chat.completion':
                return Response(bot_response, status=status.HTTP_201_CREATED)
            else:

                return render(request, "success.html", {"updatedSummary" : bot_response})
        
        except openai.APIConnectionError as e:
            #Handle connection error here
            messages.warning(request, f"Failed to connect to OpenAI API, check your internet connection")
        except openai.RateLimitError as e:
            #Handle rate limit error (we recommend using exponential backoff)
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
