from rest_framework import serializers
from django.db import transaction
from .models import *


class DestinationsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Destinations
        fields = [
            "id",
            "country",
            "provinces",
            "location",
        ]
class ToursSerializer(serializers.ModelSerializer):
    destinations = DestinationsSerializer(many=True, read_only=True)
    class Meta:
        model = Tours
        fields = [
            "id",
            "tour_title",
            "slug",
            "tour_overview",
            "destinations",
            "tour_cost",
            "duration",
            "start_date",
            "end_date",
            "is_active",
            "created_at",
            "updated_at",
        ]


class ToursAdminSerializer(serializers.ModelSerializer):
    destinations = DestinationsSerializer(many=True)
    class Meta:
        model = Tours
        fields = [
            "id",
            "tour_title",
            "tour_overview",
            "destinations",
            "tour_cost",
            "duration",
            "start_date",
            "end_date",
            "is_active",
        ]

    def create(self, validated_data):
        with transaction.atomic():
            destinations_data = validated_data.pop("destinations")
            tour = Tours.objects.create(**validated_data)
            for destination_data in destinations_data:
                Destinations.objects.create(tour=tour, **destination_data)
            return tour
