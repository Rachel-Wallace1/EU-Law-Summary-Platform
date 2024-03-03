from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Example: Adding an optional bio field to our user model
    # bio = models.TextField(null=True, blank=True)

    # No additional fields are needed now, we can easily add them here later
    pass
