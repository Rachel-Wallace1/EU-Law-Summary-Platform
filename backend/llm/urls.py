
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
import llm.views as views
from .views import OpenAIChatAPIPostView, AzureOpenAIChatAPIPostView

urlpatterns = [
    path('open_ai/sample_output/', views.sample_output.as_view()),
    path('openai/', OpenAIChatAPIPostView.as_view(), name='openai_chat_api_post'),
    path('azureopenai/', AzureOpenAIChatAPIPostView.as_view(), name='azure_openai_chat_api_post'),
    
]

