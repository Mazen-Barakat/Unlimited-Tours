from django.urls import path, include
from .views import *

urlpatterns = [
    path('blogs', index, name='blogs')
]