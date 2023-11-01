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
        queryset = Tours.objects.prefetch_related("destinations").all()
        if not self.request.user.is_superuser:
            queryset = queryset.filter(is_active=True)
        return queryset

    def get_serializer_class(self):
        if self.action == "list" and not self.request.user.is_superuser:
            return TourListSerializer
        elif (
            self.action in ["create", "update", "partial_update"]
            and self.request.user.is_superuser
        ):
            return ToursAdminSerializer
        return ToursSerializer

    # Apply custom permission class for admin actions
    permission_classes = [
        permissions.AllowAny
    ]  # Default permission for non-admin actions

    def get_permissions(self):
        if not self.request.user.is_superuser and self.action in [
            "create",
            "update",
            "partial_update",
            "destroy",
        ]:
            return [permissions.IsAdminUser()]
        return super().get_permissions()


class GalleryViewSet(ModelViewSet):
    serializer_class = GallerySerializer

    def get_queryset(self):
        queryset = Gallery.objects.select_related("tour").filter(
            tour_id=self.kwargs["tours_pk"]
        )
        if not self.request.user.is_superuser:
            queryset = queryset.filter(tour__is_active=True)
        return queryset

    def get_serializer_context(self):
        return super().get_serializer_context() | {"tour_id": self.kwargs["tours_pk"]}

    permission_classes = [
        permissions.AllowAny
    ]  # Default permission for non-admin actions

    def get_permissions(self):
        if not self.request.user.is_superuser and self.action in [
            "create",
            "update",
            "partial_update",
            "destroy",
        ]:
            return [permissions.IsAdminUser()]
        return super().get_permissions()
