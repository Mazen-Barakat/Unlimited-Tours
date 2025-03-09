from django.db import models
from django.conf import settings
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.text import slugify
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.


class Tours(models.Model):
    TOUR_TYPE_CHOICES = [
        ("T", "Trip"),
        ("C", "Cruise"),
        ("A", "Activity"),
    ]

    tour_title = models.CharField(max_length=300)
    slug = models.SlugField(max_length=300, null=True, blank=True)
    tour_overview = models.TextField()
    duration = models.SmallIntegerField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tour_main_image = models.ImageField(upload_to="tours", blank=True)
    tour_type = models.CharField(max_length=1, choices=TOUR_TYPE_CHOICES)
    people_count = models.IntegerField()

    def __str__(self) -> str:
        return self.tour_title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.tour_title)
        super(Tours, self).save(*args, **kwargs)

    class Meta:
        ordering = ["created_at"]


class TourCost(models.Model):
    PRICE_CURRENCY_TYPE_CHOICES = [
        ("USD", "USD"),
        ("EUR", "EUR"),
        ("GBP", "GBP"),
        ("JPY", "JPY"),
        ("CNY", "CNY"),
        ("CAD", "CAD"),
        ("AUD", "AUD"),
        ("EGP", "EGP"),
    ]
    tour = models.OneToOneField(
        Tours, on_delete=models.CASCADE, related_name="tour_cost", primary_key=True
    )
    price_currency = models.CharField(
        max_length=3, choices=PRICE_CURRENCY_TYPE_CHOICES, default="USD"
    )
    adult_cost = models.IntegerField()
    child_cost = models.IntegerField()
    infant_cost = models.IntegerField()
    discount = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)], default=0
    )
    tax = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)], default=0
    )

    def __str__(self) -> str:
        return self.tour.tour_title


class Tourist(models.Model):
    gender_choices = [
        ("M", "Male"),
        ("F", "Female"),
    ]
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="tourist",
        primary_key=True,
    )
    address = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    gender = models.CharField(
        max_length=1, choices=gender_choices, null=True, blank=True
    )
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self) -> str:
        return self.user.username


class Destinations(models.Model):
    tour = models.ForeignKey(
        Tours, on_delete=models.CASCADE, related_name="destinations"
    )
    country = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    location = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.tour.tour_title

    class Meta:
        ordering = ["country", "state", "location"]


class TourFacilities(models.Model):
    tour = models.ForeignKey(
        Tours, on_delete=models.CASCADE, related_name="tour_facilities"
    )
    tour_facility = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self) -> str:
        return self.tour_facility


class TourPrograms(models.Model):
    tour = models.ForeignKey(
        Tours, on_delete=models.CASCADE, related_name="tour_programs"
    )
    title = models.CharField(max_length=100)
    day = models.IntegerField()
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to="programs", null=True, blank=True)

    def __str__(self) -> str:
        return self.tour.tour_title

    class Meta:
        ordering = ["day"]


class Gallery(models.Model):
    tour = models.ForeignKey(Tours, on_delete=models.CASCADE, related_name="gallery")
    image = models.ImageField(upload_to="gallery")

    def __str__(self) -> str:
        return self.tour.tour_title


class TourReviews(models.Model):
    tour = models.ForeignKey(
        Tours, on_delete=models.CASCADE, related_name="tour_reviews"
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user_review"
    )
    review = models.TextField()
    rating = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.tour.tour_title

    class Meta:
        ordering = ["created_at"]


class ReviewReplies(models.Model):
    tour_review = models.ForeignKey(
        TourReviews, on_delete=models.CASCADE, related_name="review_replies"
    )
    reply = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]


class TourBooking(models.Model):
    BOOKING_STATUS_CHOICES = [
        ("P", "Pending"),
        ("C", "Confirmed"),
        ("R", "Rejected"),
    ]

    GENDER_CHOICES = [
        ("M", "Male"),
        ("F", "Female"),
    ]

    tour = models.ForeignKey(
        Tours, on_delete=models.CASCADE, related_name="tour_booking"
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user_booking"
    )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = PhoneNumberField(null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    age = models.IntegerField()
    nationality = models.CharField(max_length=100)
    nationality_id = models.CharField(max_length=100, null=True, blank=True)
    passport_number = models.CharField(max_length=100, null=True, blank=True)
    gender = models.CharField(
        max_length=1, choices=GENDER_CHOICES, null=True, blank=True
    )
    total_adults = models.IntegerField(default=0, blank=True)
    total_children = models.IntegerField(default=0, blank=True)
    total_infants = models.IntegerField(default=0, blank=True)
    price_currency = models.CharField(max_length=3, default="USD")
    total_cost = models.IntegerField()
    booking_status = models.CharField(
        max_length=1, choices=BOOKING_STATUS_CHOICES, default="P"
    )
    booking_date = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.tour.tour_title

    class Meta:
        ordering = ["booking_date"]
