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


class TourListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tours
        fields = [
            "id",
            "tour_title",
            "slug",
            "tour_overview",
            "tour_cost",
            "duration",
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
            tour = super().create(validated_data)
            for destination_data in destinations_data:
                Destinations.objects.create(tour=tour, **destination_data)
            return tour

    def update(self, instance, validated_data):
        with transaction.atomic():
            destinations_data = validated_data.pop("destinations")
            destinations = instance.destinations.all()
            destinations = list(destinations)
            instance = super().update(instance, validated_data)
            for destination_data in destinations_data:
                destination = destinations.pop(0)
                destination.country = destination_data.get(
                    "country", destination.country
                )
                destination.provinces = destination_data.get(
                    "provinces", destination.provinces
                )
                destination.location = destination_data.get(
                    "location", destination.location
                )
                destination.save()
            return instance


class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ["id", "image"]

    def create(self, validated_data):
        return Gallery.objects.create(
            tour_id=self.context.get("tour_id"), **validated_data
        )
