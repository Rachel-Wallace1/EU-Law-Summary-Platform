from django.contrib.auth import authenticate, login, logout
from rest_framework import status, views
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth import get_user_model

# get our custom user model from db
User = get_user_model()

# User signup methods
class UserCreate(views.APIView):
    @api_view(['POST'])
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# user login methods
class LoginView(views.APIView):
    @api_view(['POST'])
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password)
        if user:
            login(request, user)
            return Response({'message': 'User Logged In'})
        return Response({'message': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

# user logout methods
class LogoutView(views.APIView):
    @api_view(['GET'])
    def get(self, request):
        logout(request)
        return Response({'message': 'User Logged Out'})

# sample hello world view
class HelloWorld(views.APIView):
    @api_view(['GET'])
    def get(self, request):
        return Response({'message': 'Hello World!'})
