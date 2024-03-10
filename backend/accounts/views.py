from rest_framework import status, views
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth import authenticate, login, logout, get_user_model

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

@method_decorator(csrf_exempt, name='dispatch')
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
    def post(self, request):
        with transaction.atomic():  # Ensures the operation is atomic
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                # Optionally, you can log the user in immediately after sign up
                login(request, user, backend='django.contrib.auth.backends.ModelBackend')
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(views.APIView):
    """
    User login view.
    """
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': 'User Logged In'})
        else:
            # Providing more generic message to avoid enumeration attacks
            return Response({'message': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(views.APIView):
    """
    User logout view.
    """
    def get(self, request):
        logout(request)
        return Response({'message': 'User Logged Out'})

@method_decorator(csrf_exempt, name='dispatch')
class HelloWorld(views.APIView):
    """
    Sample HelloWorld view to test the API.
    """
    def get(self, request):
        return Response({'message': 'Hello World GET request is working!'})


# method to see all users in the database
# TODO:



# method to log out all users in the database
# TODO:


# method to delete all users in the database for debugging
# TODO