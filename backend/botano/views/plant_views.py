from django.shortcuts import render
from rest_framework.response import Response
from botano.models import Plant
from botano.serializers import *

from rest_framework import viewsets, decorators, status
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from rest_framework_simplejwt.authentication import JWTAuthentication as SimpleJWTAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser



@api_view(['GET'])
@decorators.authentication_classes([SimpleJWTAuthentication])
def getPlants(request):
    plants = Plant.objects.all()
    serializer = PlantSerializer(plants, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@decorators.authentication_classes([SimpleJWTAuthentication])
# @decorators.permission_classes([IsAuthenticated])
def getPlant(request, pk):
    plant = Plant.objects.get(_id=pk)
    serializer = PlantSerializer(plant, many=False)
    return Response(serializer.data)