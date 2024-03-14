from django.contrib.auth.models import User
from rest_framework import serializers
from .models import OpenAIChatResponse

# Ensure we are using our custom user model
class OpenAIChatResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpenAIChatResponse
        fields = ('summary',)
