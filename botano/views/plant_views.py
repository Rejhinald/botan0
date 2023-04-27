from django.shortcuts import render
from rest_framework.response import Response
from botano.models import Plant
from botano.serializers import PlantSerializer

from rest_framework import viewsets, decorators, status
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from rest_framework_simplejwt.authentication import JWTAuthentication as SimpleJWTAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser

@api_view(['GET'])
@decorators.authentication_classes([SimpleJWTAuthentication])
def get_plants(request):
    plants = Plant.objects.all()
    serializer = PlantSerializer(plants, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_plant(request, pk):
    try:
        plant = Plant.objects.get(_id=pk)
    except Plant.DoesNotExist:
        return Response({'error': 'Plant not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = PlantSerializer(plant, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@decorators.authentication_classes([SimpleJWTAuthentication])
@decorators.permission_classes([IsAdminUser])
def create_plant(request):
    serializer = PlantSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@decorators.authentication_classes([SimpleJWTAuthentication])
@decorators.permission_classes([IsAdminUser])
def update_plant(request, pk):
    try:
        plant = Plant.objects.get(id=pk)
    except Plant.DoesNotExist:
        return Response({'error': 'Plant not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = PlantSerializer(plant, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@decorators.authentication_classes([SimpleJWTAuthentication])
@decorators.permission_classes([IsAdminUser])
def delete_plant(request, pk):
    try:
        plant = Plant.objects.get(id=pk)
    except Plant.DoesNotExist:
        return Response({'error': 'Plant not found'}, status=status.HTTP_404_NOT_FOUND)

    plant.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
