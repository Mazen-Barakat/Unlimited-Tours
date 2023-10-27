from django.contrib.auth.models import AbstractUser 
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone_number_1 = PhoneNumberField(null=True, blank=True)
    phone_number_2 = PhoneNumberField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to="profile_pictures", null=True, blank=True)
