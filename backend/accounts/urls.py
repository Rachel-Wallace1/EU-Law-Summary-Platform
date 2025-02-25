"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
import accounts.views as views

urlpatterns = [
    path("signup/", views.UserCreate.as_view(), name="signup"),
    path("signin/", views.LoginView.as_view(), name="login"),
    path("signout/", views.LogoutView.as_view(), name="logout"),
    path("users/", views.Users.as_view(), name="users"),
    path("updateRole/", views.UpdateRole.as_view(), name="updateRole"),
    path("userDelete/", views.UserDelete.as_view(), name="userDelete")
]
