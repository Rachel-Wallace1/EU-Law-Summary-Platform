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


class sample_output(APIView):
    """
    Returns an output of sample summary without API 
    Message Input: Make a summary of https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32019L0633
    """
    def get(self, request):
        return Response({'message': 'The link provided points to the legal text of the Council Directive (EU) 2019/633 of 17 April 2019 on unfair trading practices in business-to-business relationships in the agricultural and food supply chain. This directive was enacted by the European Parliament and the Council of the European Union.\n\nSummary of the Directive (EU) 2019/633:\n\nPurpose: The directive aims to protect smaller suppliers in the agricultural and food supply chain from unfair trading practices (UTPs) by larger buyers. Such practices can undermine the financial viability of suppliers, and the directive seeks to promote fairness and equality.\n\nScope:\n- The directive covers agricultural and food products traded in the supply chain, extending to farmers, agribusinesses, and food companies within the European Union.\n- It targets UTPs in business-to-business relationships where there is a significant imbalance in bargaining power between suppliers and buyers.\n\nMain Provisions:\n- The directive lists specific unfair trading practices that are prohibited. This includes late payments, last-minute order cancellations, unilateral or retroactive contract changes, and forcing the supplier to pay for wasted products.\n- Suppliers are protected against retaliation when they file complaints regarding UTPs.\n- The directive requires EU Member States to designate public authorities to enforce the rules and impose penalties for infringements.\n- Member States must also ensure that suppliers have access to confidential complaint procedures.\n\nImplementation:\n- EU countries must adopt and publish the laws, regulations, and administrative provisions necessary to comply with the directive.\n- They must also communicate the measures they take to the European Commission.\n- The directive contains provisions for the assessment and reporting of the implemented measures to ensure their effectiveness.\n\nIn summary, Directive (EU) 2019/633 sets out a framework to protect suppliers in the food supply chain from unfair trading practices by larger buyers, with the objective of creating a fairer and more balanced food supply chain within the EU. It establishes prohibited practices, provides for the creation of enforcement authorities in each Member State, and outlines procedures to handle complaints confidentially. Member States are required to implement the necessary national measures to comply with the directive and report on their effectiveness.'})
    
class OpenAIChatAPIPostView(APIView):

    """
    export OPENAI_API_KEY = "Enter Your Key Here"
    curl -X POST http://localhost:8000/api/summaries/openai/ -H "Content-Type: application/json" -d '{"input_message": "hello"}'
    curl -X POST http://localhost:8000/api/summaries/openai/ -H "Content-Type: application/json" -d '{"input_message": "Make a summary of https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32019L0633"}'
    """
    def post(self, request, *args, **kwargs):
        client = OpenAI(
            # This is the default and can be omitted
            api_key=os.getenv("OPENAI_API_KEY"),
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
            #get response
            
            bot_response = response.choices[0].message.content
            print("clean_user_input is " +clean_user_input)
            print("Bot response is " +bot_response)
            # Check if the request was successful
            if response.object == 'chat.completion':
                return Response(bot_response, status=status.HTTP_201_CREATED)
                # Save the OpenAI response to the database
                # OpenAIChatResponse.objects.create(response=response['choices'][0]['message']['content'])
            
                # Serialize and return the response
                # serializer = OpenAIChatResponseSerializer(data={'summary': response.choices[0].message.content})
                # if serializer.is_valid():
                #     return Response(serializer.data, status=status.HTTP_201_CREATED)
                # else:
                #     return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                #return Response({'error': 'Failed to fetch data from OpenAI API.'}, status=status.HTTP_400_BAD_REQUEST)
                #x = Database.docdb.updateSummary(celexNumber, author, updatedSummary)

                return render(request, "success.html", {"updatedSummary" : bot_response})
        
            # obj, created = ChatGptBot.objects.get_or_create(
            #     # user=request.user,
            #     messageInput=clean_user_input,
            #     bot_response=bot_response,
            # 
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
            # OpenAIChatResponse.objects.create(response=response['choices'][0]['message']['content'])
        
            # Serialize and return the response
            serializer = OpenAIChatResponseSerializer(data={'summary': response.choices[0].message.content})
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'error': 'Failed to fetch data from OpenAI API.'}, status=status.HTTP_400_BAD_REQUEST)

        #return Response({'message': summary})
        

