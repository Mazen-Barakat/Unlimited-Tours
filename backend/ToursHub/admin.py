from collections.abc import Sequence
from typing import Any
from django.contrib import admin
from django.db.models.query import QuerySet
from django.http.request import HttpRequest
from . import models

# Register your models here.


@admin.register(models.Tours)
class ToursAdmin(admin.ModelAdmin):
    list_display = (
        "tour_title",
        "duration",
        "is_active",
        "created_at",
        "updated_at",
    )
    list_filter = ("is_active", "created_at", "updated_at")
    search_fields = ("tour_title", "tour_overview")
    list_editable = ("duration", "is_active")
    prepopulated_fields = {"slug": ("tour_title",)}


@admin.register(models.Tourist)
class TouristAdmin(admin.ModelAdmin):
    list_display = (
        "user_id",
        "user",
        "country",
    )
    search_fields = ("user", "country", "about")

    def get_queryset(self, request):
        return (
            super()
            .get_queryset(request)
            .select_related("user")
            .only("user", "user_id", "country", "about")
        )


@admin.register(models.Destinations)
class DestinationsAdmin(admin.ModelAdmin):
    list_display = ("country", "state", "location")
    list_filter = ("country", "state", "location")
    search_fields = ("country", "state", "location")


@admin.register(models.TourFacilities)
class TourFacilitiesAdmin(admin.ModelAdmin):
    list_display = ("tour", "tour_facility")
    list_filter = ("tour", "tour_facility")
    search_fields = ("tour", "tour_facility")

    def get_queryset(self, request):
        return (
            super()
            .get_queryset(request)
            .select_related("tour")
            .only("tour", "tour_facility")
        )


@admin.register(models.TourPrograms)
class TourProgramsAdmin(admin.ModelAdmin):
    list_display = ("tour", "title", "day")

    def get_queryset(self, request: HttpRequest) -> QuerySet[Any]:
        return (
            super()
            .get_queryset(request)
            .select_related("tour")
            .only("tour", "title", "day")
        )


@admin.register(models.Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ("tour", "image")

    def get_queryset(self, request):
        return (
            super().get_queryset(request).select_related("tour").only("tour", "image")
        )


@admin.register(models.TourReviews)
class TourReviewsAdmin(admin.ModelAdmin):
    list_display = ("tour", "user", "rating")
    list_filter = ("tour", "rating")
    search_fields = ("tour", "review")

    def get_queryset(self, request):
        return (
            super()
            .get_queryset(request)
            .select_related("user", "tour")
            .only("tour", "user", "rating")
        )


@admin.register(models.ReviewReplies)
class ReviewRepliesAdmin(admin.ModelAdmin):
    list_display = ("tour_review", "reply")

    def get_queryset(self, request):
        return (
            super()
            .get_queryset(request)
            .select_related("tour_review")
            .only("tour_review", "reply")
        )


@admin.register(models.TourCost)
class TourCostAdmin(admin.ModelAdmin):
    list_display = (
        "tour",
        "price_currency",
        "adult_cost",
        "child_cost",
        "infant_cost",
        "discount",
        "tax",
    )

    def get_queryset(self, request):
        return (
            super()
            .get_queryset(request)
            .select_related("tour")
            .only(
                "tour",
                "price_currency",
                "adult_cost",
                "child_cost",
                "infant_cost",
                "discount",
                "tax",
            )
        )


@admin.register(models.TourBooking)
class TourBookingAdmin(admin.ModelAdmin):
    list_display = (
        "tour",
        "user",
        "first_name",
        "last_name",
        "booking_date",
        "total_adults",
        "total_children",
        "total_infants",
        "total_cost",
    )
    list_filter = ("tour", "user", "booking_date")
    search_fields = ("tour", "user")

    def get_queryset(self, request):
        return (
            super()
            .get_queryset(request)
            .select_related("tour", "user")
        
        )
