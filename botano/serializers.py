from rest_framework import serializers
from .models import Plant

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