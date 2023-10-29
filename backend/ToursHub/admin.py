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
        "tour_cost",
        "duration",
        "is_active",
        "created_at",
        "updated_at",
    )
    list_filter = ("is_active", "created_at", "updated_at")
    search_fields = ("tour_title", "tour_overview")
    list_editable = ("tour_cost", "duration", "is_active")
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
    list_display = ("country", "provinces", "location")
    list_filter = ("country", "provinces", "location")
    search_fields = ("country", "provinces", "location")


@admin.register(models.TourFacilitiesIncluded)
class TourFacilitiesIncludedAdmin(admin.ModelAdmin):
    list_display = ("tour", "tour_facility")

    def get_queryset(self, request):
        return (
            super()
            .get_queryset(request)
            .select_related("tour", "tour_facility")
            .only("tour", "tour_facility")
        )


@admin.register(models.TourFacilities)
class TourFacilitiesAdmin(admin.ModelAdmin):
    list_display = ("tour_facility",)

@admin.register(models.TourPrograms)
class TourProgramsAdmin(admin.ModelAdmin):
    list_display = ("tour", "title", "day")

    def get_queryset(self, request: HttpRequest) -> QuerySet[Any]:
        return super().get_queryset(request).select_related("tour").only("tour", "title", "day")

@admin.register(models.Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ("tour", "image")
    
    def get_queryset(self, request):
        return (
            super()
            .get_queryset(request)
            .select_related("tour")
            .only("tour", "image")
        )


@admin.register(models.TourReviews)
class TourReviewsAdmin(admin.ModelAdmin):
    list_display = ("tour", "user", "rating")
    list_filter = ("tour", "rating")
    search_fields = ("tour", "review")

    def get_queryset(self, request):
        return super().get_queryset(request).select_related("user", "tour").only("tour", "user", "rating")


@admin.register(models.ReviewReplies)
class ReviewRepliesAdmin(admin.ModelAdmin):
    list_display = ("tour_review", "reply")

    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related("tour_review").only("tour_review", "reply")


@admin.register(models.BookingUsers)
class BookingUsersAdmin(admin.ModelAdmin):
    list_display = ('booking_id',"booking__tour", "first_name", "last_name", "email", "phone_number")
    
    def booking__tour(self, obj):
        return obj.booking.tour
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related("booking", "booking__tour").only("booking", "first_name", "last_name", "email", "phone_number")


@admin.register(models.TourBooking)
class TourBookingAdmin(admin.ModelAdmin):
    list_display = ("tour", "user", "booking_status")
    search_fields = ("tour", "user", "booking_status")

    def get_queryset(self, request: HttpRequest) -> QuerySet[Any]:
        return super().get_queryset(request).select_related("tour", "user").only("tour__tour_title", "user__username", "booking_status")
