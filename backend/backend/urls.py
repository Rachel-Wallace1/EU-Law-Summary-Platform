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
from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from backend import views

schema_view = get_schema_view(
    openapi.Info(
        title="EU Law Backend API",
        default_version="v1",
        description="API Description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="tonyhua18@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("api/admin/", admin.site.urls),
    path('api/', include('accounts.urls')),
    path('api/csrf/', views.Main.csrf, name="csrf"),
    path('api/summaries/', include('llm.urls')),
    path('api/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/edit/<str:celexNumber>', views.Database.edit, name="edit"),
    path('api/update/', views.Database.updateSummary, name="updateSummary"),
    path('api/submit/', views.Database.submit, name="submit"),
    path('api/fetchAll', views.Database.fetchAll, name='fetchAll'),
    path('api/delete', views.Database.delete, name="delete"),
    path('api/submitAnnotation/', views.Database.submitAnnotation, name="submitAnnotation"),
    path('api/updateAnnotation/', views.Database.updateAnnotation, name="updateAnnotation"),
    path('api/fetchAnnotations/', views.Database.fetchAnnotations, name="fetchAnnotations"),
    path('api/deleteAnnotation/', views.Database.deleteAnnotation, name="deleteAnnotation"),
    path('api/deleteAllAnnotations/', views.Database.deleteAllAnnotations, name="deleteAllAnnotations"),
    path('api/summary/<str:celexNumber>/versions', views.Database.getVersionMetadata, name="getVersionMetadata"),
    path('api/summary/<str:celexNumber>/version/<int:version>', views.Database.getVersion, name="getVersion"),
    path('api/editNote', views.Database.editNote, name="editNote"),
    path('api/health/', views.Health.health, name='health'),
]
