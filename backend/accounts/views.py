from rest_framework import status, views
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth import authenticate, login, logout, get_user_model

#jwt tokens
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# swagger API
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Import Django's transaction management to ensure atomicity
from django.db import transaction

# csrf exempt for testing
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# Obtain the custom user model
User = get_user_model()

class UserCreate(views.APIView):
    """
    User signup view.
    """
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['email', 'password'],
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='User password'),
                'first_name': openapi.Schema(type=openapi.TYPE_STRING, description='User first name'),
                'last_name': openapi.Schema(type=openapi.TYPE_STRING, description='User last name'),
            },
        ),
        responses={201: 'User Created', 400: 'Invalid Input'}
    )
    @csrf_exempt
    def post(self, request):
        with transaction.atomic():  # Ensures the operation is atomic
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                # Optionally, you can log the user in immediately after sign up
                login(request, user, backend='django.contrib.auth.backends.ModelBackend')
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(views.APIView):
    """
    User login view.
    """
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['email', 'password'],
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='User password'),
            },
        ),
        responses={200: 'User Logged In', 401: 'Invalid Credentials'}
    )
    @csrf_exempt
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)

            user_data = {
                "username" : user.username,
                "first_name" : user.first_name,
                "last_name" : user.last_name,
                "email" : user.email,
                "role" : user.role
            }

            # Generate JWT token
            token_serializer = TokenObtainPairSerializer(data=request.data)
            if token_serializer.is_valid():
                return Response({"user_data" : user_data, "token" : token_serializer.validated_data}, status=status.HTTP_200_OK)
            return Response(token_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Providing more generic message to avoid enumeration attacks
            return Response({'message': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(views.APIView):
    """
    User logout view.
    """
    @swagger_auto_schema(
        responses={200: 'User Logged Out'}
    )
    @csrf_exempt
    def get(self, request):
        logout(request)
        return Response({'message': 'User Logged Out'})

class UpdateRole(views.APIView):
    """
    User update role view
    """

    @swagger_auto_schema(
        responses={200: 'User Logged In', 404: 'User not found'}
    )

    @csrf_exempt
    def post(self, request):
        id = request.data.get('id')
        role = request.data.get('role')

        try:
            user = User.objects.get(id=id)
            user.role = role
            user.save()
            return Response({'message': 'User role updated'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message': 'No user found'}, status=status.HTTP_404_NOT_FOUND)

class Users(views.APIView):
    """
    Fetch all users
    """
    
    @swagger_auto_schema(
        responses={200: 'User Response', 404: 'Users not found'}
    )

    @csrf_exempt
    def get(self, request):
        users = User.objects.all()

        user_list = []
        for user in users:
            user_info = {
                "id" : user.id,
                "username" : user.username,
                "first_name" : user.first_name,
                "last_name" : user.last_name,
                "role" : user.role
            }
            user_list.append(user_info)

        if users is not None:
            return Response({'users': user_list}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'No users found'}, status=status.HTTP_404_NOT_FOUND)

class UserDelete(views.APIView):
    """
    Delete specified user
    """

    @swagger_auto_schema(
        responses={200: 'User Deleted', 404: 'User not found'}
    )

    @csrf_exempt
    def post(self, request):
        id = request.data.get('id')

        try:
            user = User.objects.get(id=id)
            user.delete()
            return Response({'message': 'User deleted'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message': 'No user found'}, status=status.HTTP_404_NOT_FOUND)