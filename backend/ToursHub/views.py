from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import *
from .serializers import *
from rest_framework import permissions
from rest_framework.filters import SearchFilter


# Create your views here.
class ToursViewSet(ModelViewSet):
    filter_backends = [SearchFilter]
    search_fields = ["tour_title", "tour_overview"]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Tours.objects.prefetch_related("destinations").all()
        return Tours.objects.prefetch_related("destinations").filter(is_active=True)

    def get_serializer_class(self):
        if self.request.method in permissions.SAFE_METHODS:
            return ToursSerializer
        else:
            return ToursAdminSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        else:
            return [permissions.IsAdminUser()]
