from django.db import models

# Create your models here.

class OpenAIChatResponse(models.Model):
    summary = models.TextField()