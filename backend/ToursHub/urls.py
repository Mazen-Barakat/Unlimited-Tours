from django.urls import path, include
from rest_framework_nested import routers
from .views import *

router = routers.DefaultRouter()
router.register('tours', ToursViewSet, basename='tours')
tour_router = routers.NestedDefaultRouter(router, r'tours', lookup='tours')
tour_router.register(r'gallery', GalleryViewSet, basename='tours-gallery')


urlpatterns = [
    path('', include(router.urls)),
]+tour_router.urls