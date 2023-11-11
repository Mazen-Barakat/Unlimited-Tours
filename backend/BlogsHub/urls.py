from django.urls import path, include
from rest_framework_nested import routers
from .views import *

router = routers.DefaultRouter()
router.register("blogs", BlogsViewSet, basename="blogs")
router.register("my-blogs", MyBlogsViewSet, basename="my-blogs")

blogs_router = routers.NestedDefaultRouter(router, r"blogs", lookup="blogs")
blogs_router.register(r"comments", CommentsViewSet, basename="blogs-comments")

my_blogs_router = routers.NestedDefaultRouter(router, r"my-blogs", lookup="my_blogs")
my_blogs_router.register(r"comments", CommentsViewSet, basename="my-blogs-comments")

urlpatterns = [
    path("", include(router.urls)),
] + blogs_router.urls + my_blogs_router.urls
