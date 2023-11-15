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
            "state",
            "location",
        ]


class TourCostSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourCost
        fields = [
            "price_currency",
            "adult_cost",
            "child_cost",
            "infant_cost",
            "discount",
            "tax",
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
    tour_cost = TourCostSerializer(read_only=True)

    class Meta:
        model = Tours
        fields = [
            "id",
            "tour_title",
            "slug",
            "tour_main_image",
            "tour_overview",
            "destinations",
            "tour_cost",
            "people_count",
            "duration",
            "start_date",
            "end_date",
            "is_active",
            "created_at",
            "updated_at",
        ]


class ToursAdminSerializer(serializers.ModelSerializer):
    destinations = DestinationsSerializer(many=True, required=False)
    tour_cost = TourCostSerializer()
    tour_main_image = serializers.ImageField(required=False)

    class Meta:
        model = Tours
        fields = [
            "id",
            "tour_title",
            "tour_main_image",
            "tour_overview",
            "destinations",
            "tour_cost",
            "people_count",
            "duration",
            "tour_type",
            "start_date",
            "end_date",
            "is_active",
        ]

    def create(self, validated_data):
        with transaction.atomic():
            destinations_data = validated_data.pop("destinations")
            tour_cost_data = validated_data.pop("tour_cost")
            tour = super().create(validated_data)
            TourCost.objects.create(tour=tour, **tour_cost_data)
            for destination_data in destinations_data:
                Destinations.objects.create(tour=tour, **destination_data)
            return tour

    def update(self, instance, validated_data):
        with transaction.atomic():
            destinations_data = validated_data.pop("destinations", [])
            tour_cost_data = validated_data.pop("tour_cost", {})
            destinations = instance.destinations.all()
            destinations = list(destinations)
            instance = super().update(instance, validated_data)
            TourCost.objects.filter(tour=instance).update(**tour_cost_data)
            for destination_data in destinations_data:
                destination = destinations.pop(0)
                destination.country = destination_data.get(
                    "country", destination.country
                )
                destination.state = destination_data.get("state", destination.state)
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


class ReviewRepliesSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    tour_review = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = ReviewReplies
        fields = ["id", "tour_review", "reply", "created_at"]


class TourReviewsSerializer(serializers.ModelSerializer):
    review_replies = ReviewRepliesSerializer(many=True, read_only=True)
    id = serializers.IntegerField(read_only=True)
    user = serializers.StringRelatedField(read_only=True)
    tour = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = TourReviews
        fields = [
            "id",
            "user",
            "tour",
            "review",
            "rating",
            "created_at",
            "review_replies",
        ]

    def create(self, validated_data):
        print(self.context)
        return TourReviews.objects.create(
            tour_id=self.context.get("tour_id"),
            user=self.context.get("user"),
            **validated_data
        )

    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)
        instance.save()
        return instance


class TourReviewsAdminSerializer(serializers.ModelSerializer):
    review_replies = ReviewRepliesSerializer(many=True)
    id = serializers.IntegerField(read_only=True)
    user = serializers.StringRelatedField(read_only=True)
    tour = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = TourReviews
        fields = [
            "id",
            "user",
            "tour",
            "review",
            "rating",
            "created_at",
            "review_replies",
        ]

    def update(self, instance, validated_data):
        review_replies_data = validated_data.pop("review_replies")
        instance = super().update(instance, validated_data)
        review_replies = []
        for reply_data in review_replies_data:
            reply, created = ReviewReplies.objects.get_or_create(
                tour_review=instance, defaults={"reply": reply_data["reply"]}
            )
            if not created:
                reply.reply = reply_data["reply"]
                reply.save()
            review_replies.append(reply)
        instance.review_replies.set(review_replies)
        return instance


class TourProgramsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    tour = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = TourPrograms
        fields = ["id", "tour", "title", "day", "description"]

    def create(self, validated_data):
        return TourPrograms.objects.create(
            tour_id=self.context.get("tour_id"), **validated_data
        )


class TourFacilitiesSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    tour = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = TourFacilities
        fields = ["id", "tour", "tour_facility", "icon", "description"]

    def create(self, validated_data):
        return TourFacilities.objects.create(
            tour_id=self.context.get("tour_id"), **validated_data
        )


class TouristSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Tourist
        fields = [
            "user_id",
            "username",
            "about",
            "address",
            "city",
            "country",
            "gender",
            "birth_date",
        ]


class TourBookingSerializer(serializers.ModelSerializer):
    tour = serializers.StringRelatedField(read_only=True)
    user = serializers.StringRelatedField(source= 'user.username',read_only=True)
    class Meta:
        model = TourBooking
        fields = [
            "id",
            "tour",
            "user",
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "age",
            "nationality",
            "nationality_id",
            "passport_number",
            "gender",
            "total_adults",
            "total_children",
            "total_infants",
            "price_currency",
            "total_cost",
            "booking_status",
            "booking_date",
        ]

        read_only_fields = [
            "id",
            "tour",
            "user",
            "booking_status",
            "booking_date",
        ]

    def create(self, validated_data):
        return TourBooking.objects.create(
            tour_id=self.context.get("tour_id"),
            user=self.context.get("user"),
            **validated_data
        )
