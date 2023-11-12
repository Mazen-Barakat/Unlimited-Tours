from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import *
from .serializers import *
from rest_framework import permissions
from rest_framework.filters import SearchFilter
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


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


class TourReviewsViewSet(ModelViewSet):
    def get_queryset(self):
        queryset = (
            TourReviews.objects.select_related("tour", "user")
            .prefetch_related("review_replies")
            .filter(tour_id=self.kwargs["tours_pk"])
        )
        if not self.request.user.is_superuser:
            queryset = queryset.filter(tour__is_active=True)
        return queryset

    def get_serializer_context(self):
        return (
            super().get_serializer_context()
            | {"tour_id": self.kwargs["tours_pk"]}
            | {"user": self.request.user}
        )

    def get_serializer_class(self):
        if self.request.user.is_superuser:
            return TourReviewsAdminSerializer
        return TourReviewsSerializer

    permission_classes = [
        permissions.AllowAny
    ]  # Default permission for non-admin actions

    def get_permissions(self):
        if not self.request.user.is_superuser and self.action in [
            "create",
            "retrieve",
            "update",
            "partial_update",
            "destroy",
        ]:
            return [permissions.IsAdminUser()]
        return super().get_permissions()

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        total_reviews = len(serializer.data)
        average_rating = (
            sum(review["rating"] for review in serializer.data) / total_reviews
            if total_reviews > 0
            else 0
        )

        return Response(
            {
                "reviews_count": total_reviews,
                "total_rating": average_rating,
                "reviews": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    @action(
        detail=False,
        methods=["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
        permission_classes=[permissions.IsAuthenticated],
        url_path="your-review",
    )
    def your_review(self, request, *args, **kwargs):
        tour_id = self.kwargs["tours_pk"]
        user = self.request.user

        queryset = (
            TourReviews.objects.select_related("tour", "user")
            .prefetch_related("review_replies")
            .filter(user=user, tour_id=tour_id).exclude(tour__is_active=False)
        )

        serializer_context = {"tour_id": tour_id, "user": user}
        
        if request.method in ["GET", "HEAD", "OPTIONS"]:
            serializer = TourReviewsSerializer(queryset, many=True, context=serializer_context)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method in ["POST", "PUT", "PATCH"]:
            # Try to get an existing review, or create one if it doesn't exist
            review = TourReviews.objects.filter(tour_id=tour_id, user=user).first()

            if review.tour.is_active == False:
                return Response(
                    {"detail": "This tour is not active anymore."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if request.method == "POST":
                if review:
                    return Response(
                        {"detail": "You have already reviewed this tour."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                serializer = TourReviewsSerializer(
                    data=request.data, context=serializer_context
                )
            else:  # PUT or PATCH
                if not review:
                    review = get_object_or_404(TourReviews, tour_id=tour_id, user=user)
                serializer = TourReviewsSerializer(
                    instance=review,
                    data=request.data,
                    partial=True,
                    context=serializer_context,
                )

            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

        elif request.method == "DELETE":
            review = queryset.first()
            if review:
                review.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response(status=status.HTTP_404_NOT_FOUND)


class TourProgramsViewSet(ModelViewSet):
    serializer_class = TourProgramsSerializer

    def get_queryset(self):
        queryset = TourPrograms.objects.select_related("tour").filter(
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


class TourFacilitiesViewSet(ModelViewSet):
    serializer_class = TourFacilitiesSerializer

    def get_queryset(self):
        queryset = TourFacilities.objects.select_related("tour").filter(
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


class TouristViewSet(ModelViewSet):
    queryset = Tourist.objects.select_related("user").all()
    serializer_class = TouristSerializer
    permission_classes = [permissions.IsAdminUser]

    @action(
        detail=False,
        methods=["GET", "PUT"],
        permission_classes=[permissions.IsAuthenticated],
        url_path="me",
    )
    def me(self, request):
        (tourist, created) = Tourist.objects.select_related("user").get_or_create(
            user=request.user
        )
        if request.method == "GET":
            serializer = self.get_serializer(tourist)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif request.method == "PUT":
            serializer = self.get_serializer(tourist, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)


class TourBookingViewSet(ModelViewSet):
    serializer_class = TourBookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = (
            TourBooking.objects.select_related("tour", "user")
            .only(
                "id",
                "tour__id",
                "tour__tour_title",
                "tour__is_active",
                "user__id",
                "user__username",
                "booking_status",
                "total_cost",
                "created_at",
            )
            .prefetch_related("booking_users")
            .filter(tour_id=self.kwargs["tours_pk"])
        )
        if not self.request.user.is_superuser:
            queryset = queryset.filter(tour__is_active=True, user=self.request.user)
        return queryset

    def get_serializer_context(self):
        return (
            super().get_serializer_context()
            | {"tour_id": self.kwargs["tours_pk"]}
            | {"user": self.request.user}
        )
