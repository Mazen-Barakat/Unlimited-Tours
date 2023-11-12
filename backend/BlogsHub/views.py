from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from .models import *
from .serializers import *
from .permissions import *
from rest_framework import permissions

# Create your views here.


class BlogsViewSet(ModelViewSet):
    queryset = (
        Blog.objects.select_related("author")
        .prefetch_related("likes")
        .only(
            "id",
            "author__username",
            "title",
            "slug",
            "content",
            "created_at",
            "updated_at",
        )
    )
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    serializer_classes = {
        "default": BlogsSerializer,
        "list": BlogsListedSerializer,
    }

    def get_serializer_class(self):
        return self.serializer_classes.get(
            self.action, self.serializer_classes["default"]
        )

    def get_serializer_context(self):
        return super().get_serializer_context() | {"author": self.request.user}

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            self.permission_classes = [permissions.IsAdminUser]
        return super(BlogsViewSet, self).get_permissions()

    @action(detail=True, methods=["GET", "POST", "PUT", "PATCH"], url_path="like")
    def like(self, request, *args, **kwargs):
        blog = self.get_object()
        author = self.request.user
        like_status = request.data.get("like_status")

        if request.method == "GET":
            queryset = Likes.objects.filter(blog=blog, author=author)
            serializer = BlogsLikesSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method in ["POST", "PUT", "PATCH"]:
            # Check if a like record already exists for the user and blog
            existing_like = Likes.objects.filter(author=author, blog=blog).first()
            if existing_like:
                # If it exists, update the existing record
                serializer_context = {"author": author, "blog": blog}
                serializer = BlogsLikesSerializer(
                    existing_like,
                    data={"like_status": like_status},
                    context=serializer_context,
                    partial=True,
                )
                serializer.is_valid(raise_exception=True)
                serializer.save()
            else:
                # If it doesn't exist, create a new record
                serializer_context = {"author": author, "blog": blog}
                serializer = BlogsLikesSerializer(
                    data={"like_status": like_status}, context=serializer_context
                )
                serializer.is_valid(raise_exception=True)
                serializer.save()

            return Response(
                {"success": "Like status updated"}, status=status.HTTP_200_OK
            )


class MyBlogsViewSet(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    serializer_classes = {
        "default": BlogsSerializer,
        "list": BlogsListedSerializer,
    }

    def get_serializer_class(self):
        return self.serializer_classes.get(
            self.action, self.serializer_classes["default"]
        )

    def get_serializer_context(self):
        return super().get_serializer_context() | {"author": self.request.user}

    def get_queryset(self):
        return (
            Blog.objects.prefetch_related("likes")
            .select_related("author")
            .filter(author=self.request.user)
            .only(
                "id",
                "author__username",
                "title",
                "slug",
                "content",
                "created_at",
                "updated_at",
            )
        )

    @action(detail=True, methods=["GET", "POST", "PUT", "PATCH"], url_path="like")
    def like(self, request, *args, **kwargs):
        blog = self.get_object()
        author = self.request.user
        like_status = request.data.get("like_status")

        if request.method == "GET":
            queryset = Likes.objects.filter(blog=blog).exclude(like_status=0)
            serializer = MyBlogsLikesSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method in ["POST", "PUT", "PATCH"]:
            # Check if a like record already exists for the user and blog
            existing_like = Likes.objects.filter(author=author, blog=blog).first()
            print(blog, author, like_status)
            if existing_like:
                # If it exists, update the existing record
                serializer_context = {"author": author, "blog": blog}
                serializer = MyBlogsLikesSerializer(
                    existing_like,
                    data={"like_status": like_status},
                    context=serializer_context,
                    partial=True,
                )
                serializer.is_valid(raise_exception=True)
                serializer.save()
            else:
                # If it doesn't exist, create a new record
                serializer_context = {"author": author, "blog": blog}
                serializer = MyBlogsLikesSerializer(
                    data={"like_status": like_status}, context=serializer_context
                )
                serializer.is_valid(raise_exception=True)
                serializer.save()

            return Response(
                {"success": "Like status updated"}, status=status.HTTP_200_OK
            )


class CommentsViewSet(ModelViewSet):
    serializer_class = CommentsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        blog_id = self.kwargs.get("blogs_pk") or self.kwargs.get("my_blogs_pk")
        return (
            Comments.objects.select_related("author")
            .only(
                "id",
                "author__username",
                "blog__id",
                "content",
                "created_at",
                "updated_at",
            )
            .filter(blog__id=blog_id)
        )

    def get_serializer_context(self):
        return super().get_serializer_context() | {"request": self.request}

    def get_permissions(self):
        if self.action in ["create"]:
            self.permission_classes = [permissions.IsAuthenticated]
        elif self.action in ["update", "partial_update", "destroy"]:
            self.permission_classes = [IsCommentAuthorOrAdmin]
        return super(CommentsViewSet, self).get_permissions()


class BlogGalleryViewSet(ModelViewSet):
    serializer_class = BlogGallerySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        blog_id = self.kwargs.get("blogs_pk") or self.kwargs.get("my_blogs_pk")
        if self.kwargs.get("blogs_pk"):
            return (
                BlogGallery.objects.select_related("blog", "blog__author")
                .only("id", "blog__id", "blog__title", "image", "blog__author__id")
                .filter(blog__id=blog_id)
            )
        else:
            return (
                BlogGallery.objects.select_related("blog", "blog__author")
                .only("id", "blog__id", "blog__title", "image", "blog__author__id")
                .filter(blog__id=blog_id, blog__author=self.request.user)
            )

    def get_serializer_context(self):
        return super().get_serializer_context() | {"request": self.request}

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAuthorOrAdmin()]
        return super(BlogGalleryViewSet, self).get_permissions()
