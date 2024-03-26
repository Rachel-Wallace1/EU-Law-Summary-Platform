from django.db import models
from djongo import models

# Create your models here.

class OpenAIChatResponse(models.Model):
    summary = models.TextField()


class ChatGptBot(models.Model):
    messageInput = models.TextField()
    bot_response = models.TextField()



