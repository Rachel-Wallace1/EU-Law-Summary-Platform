from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    LEGAL_EXPERT = 1
    EDITOR = 2
    MANAGER = 3
    CITIZEN = 4
    
    ROLE_CHOICES = {
        (LEGAL_EXPERT, 'Legal Expert'),
        (EDITOR, 'Editor'),
        (MANAGER, 'Manager'),
        (CITIZEN, 'Citizen')
    }

    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, blank=False, null=True)

    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    # Example: Adding an optional bio field to our user model
    # bio = models.TextField(null=True, blank=True)

