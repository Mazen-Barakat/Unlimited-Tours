from django.urls import path, include
from rest_framework_nested import routers
from .views import *

router = routers.DefaultRouter()
router.register("tours", ToursViewSet, basename="tours")
tour_router = routers.NestedDefaultRouter(router, r"tours", lookup="tours")
tour_router.register(r"gallery", GalleryViewSet, basename="tours-gallery")
tour_router.register(r"reviews", TourReviewsViewSet, basename="tours-reviews")
tour_router.register(r"program", TourProgramsViewSet, basename="tours-program")
tour_router.register(r"facilities", TourFacilitiesViewSet, basename="tours-facilities")
router.register(r'tourist', TouristViewSet, basename='tourist')
tourist_router = routers.NestedDefaultRouter(router, r'tourist', lookup='tourist')


urlpatterns = [
    path("", include(router.urls)),
] + tour_router.urls + tourist_router.urls
