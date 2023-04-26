from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.response import Response
from botano.serializers import *

from rest_framework import viewsets, decorators, status
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from rest_framework_simplejwt.authentication import JWTAuthentication as SimpleJWTAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email = data['email'],
            password = make_password(data['password']),
            )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    
    except:
        message={'details':'USER WITH THIS EMAIL ALREADY EXIST'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
# @decorators.authentication_classes([SimpleJWTAuthentication])
@decorators.permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def handle_form_submission(request):
    if request.method == 'POST':
        # Here you can access the form data that was submitted
        name = request.POST.get('name')
        description = request.POST.get('description')
        image = request.FILES.get('image')

        # Here you can process the form data as needed and return a response
        return JsonResponse({'success': True})
    else:
        # Handle other HTTP methods if needed
        return JsonResponse({'success': False, 'error': 'Invalid request method'})



    
# @api_view(['POST'])
# def obtain_token(request):
#     data = request.data
#     serializer = MyTokenObtainPairSerializer(data=data)
#     if serializer.is_valid():
#         token = serializer.validated_data['access']
#         response = Response({'token': token})
#         response['Access-Control-Expose-Headers'] = 'Authorization'
#         response['Authorization'] = 'Bearer ' + token
#         response.set_cookie("Authorization", 'Bearer ' + token)
#         return response
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)