from django.urls import path
from botano.views import plant_views as views


urlpatterns = [
    path('', views.get_plants, name='plants'),
    path('<str:pk>/', views.get_plant, name='plant'),
]