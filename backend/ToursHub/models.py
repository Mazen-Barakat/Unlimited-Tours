from django.db import models
from django.conf import settings
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.text import slugify

# Create your models here.


class Tours(models.Model):
    tour_title = models.CharField(max_length=300)
    slug = models.SlugField(max_length=300, null=True, blank=True)
    tour_overview = models.TextField()
    tour_cost = models.IntegerField()
    duration = models.IntegerField()
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

    def __str__(self) -> str:
        return self.tour_title
    class Meta:
        ordering = ['created_at']

class Tourist(models.Model):
    gender_choices = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="tourist",
        primary_key=True
    )
    address = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    gender = models.CharField(max_length=1, choices=gender_choices, null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self) -> str:
        return self.user.username


class Destinations(models.Model):
    tour = models.ForeignKey(
        Tours, on_delete=models.CASCADE, related_name="destinations"
    )
    country = models.CharField(max_length=100)
    provinces = models.CharField(max_length=100)
    location = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.tour.tour_title
    class Meta:
        ordering = ['country', 'provinces', 'location']    


class TourFacilitiesIncluded(models.Model):
    tour = models.ForeignKey(
        Tours, on_delete=models.CASCADE, related_name="tour_facilities_included"
    )
    tour_facility = models.OneToOneField(
        "TourFacilities", on_delete=models.CASCADE, related_name="tour_facilities"
    )
    description = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.tour.tour_title
    

class TourFacilities(models.Model):
    tour_facility = models.CharField(max_length=100)
    icon = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.tour_facility

class TourPrograms(models.Model):
    tour = models.ForeignKey(Tours, on_delete=models.CASCADE, related_name="tour_programs")
    title = models.CharField(max_length=100)
    day = models.IntegerField()
    description = models.TextField(null=True, blank=True)

    def __str__(self) -> str:
        return self.tour.tour_title

    class Meta:
        ordering = ['day']

class Gallery(models.Model):
    tour = models.ForeignKey(Tours, on_delete=models.CASCADE, related_name="gallery")
    image = models.ImageField(upload_to='gallery')

    def __str__(self) -> str:
        return self.tour.tour_title


class TourReviews(models.Model):
    tour = models.ForeignKey(Tours, on_delete=models.CASCADE, related_name="tour_reviews")
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user_review"
    )
    review = models.TextField()
    rating = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.tour.tour_title

    class Meta:
        ordering = ['created_at']

class ReviewReplies(models.Model):
    tour_review = models.ForeignKey(TourReviews, on_delete=models.CASCADE, related_name="review_replies")
    reply = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['created_at']

class TourBooking(models.Model):
    booking_status_choices = [
        ('P', 'Pending'),
        ('C', 'Confirmed'),
        ('R', 'Rejected'),
    ]

    tour = models.ForeignKey(Tours, on_delete=models.CASCADE, related_name="tour_booking")
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user_booking"
    )
    total_cost = models.IntegerField()
    booking_status = models.CharField(max_length=1, choices=booking_status_choices, default='P')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.tour.tour_title

    class Meta:
        ordering = ['created_at']


class BookingUsers(models.Model):
    gender_choices = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]

    booking = models.ForeignKey(TourBooking, on_delete=models.CASCADE, related_name="booking_users")
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = PhoneNumberField(null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    age = models.IntegerField()
    nationality = models.CharField(max_length=100)
    nationality_id = models.CharField(max_length=100)
    passport_number = models.CharField(max_length=100, null=True, blank=True)
    gender = models.CharField(max_length=1, choices=gender_choices, null=True, blank=True)
