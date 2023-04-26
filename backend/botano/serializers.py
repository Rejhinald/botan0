from rest_framework import serializers
from .models import Plant
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
# from .models import Subscription

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name
        
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = '__all__'

# class SubscriptionSerializer(serializers.ModelSerializer):
#     plant = PlantSerializer()

#     class Meta:
#         model = Subscription
#         fields = '__all__'

class NoSubscriptionPlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = ('id', 'name', 'image_thumbnail', 'short_description')

# def to_representation(self, instance):
#     if not self.context['request'].user.is_authenticated:
#         instance.short_description = instance.short_description[:100]+'...'
#     return super().to_representation(instance)