from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework import serializers

# Ensure we are using our custom user model
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Pop the password from the validated_data
        password = validated_data.pop('password')
        # Use the email from the validated_data as the username argument for create_user
        user = User.objects.create_user(username=validated_data['email'], password=password, **validated_data)
        return user
