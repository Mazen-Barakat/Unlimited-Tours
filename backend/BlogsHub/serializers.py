from rest_framework import serializers
from .models import *
from django.core.exceptions import ObjectDoesNotExist


class BlogsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = serializers.StringRelatedField(read_only=True)
    slug = serializers.SlugField(read_only=True)
    net_likes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Blog
        fields = [
            "id",
            "author",
            "title",
            "slug",
            "content",
            "net_likes",
            "created_at",
            "updated_at",
            "main_image",
        ]

    def get_net_likes(self, instance):
        likes_dislikes = instance.likes.all()
        likes_count = 0
        dislikes_count = 0
        for like in likes_dislikes:
            if like.like_status == 1:
                likes_count += 1
            elif like.like_status == -1:
                dislikes_count += 1
        return {"like": likes_count, "dis_like": dislikes_count}

    def create(self, validated_data):
        return Blog.objects.create(author=self.context.get("author"), **validated_data)


class BlogsListedSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = serializers.StringRelatedField(read_only=True)
    slug = serializers.SlugField(read_only=True)

    class Meta:
        model = Blog
        fields = [
            "id",
            "author",
            "title",
            "slug",
            "created_at",
            "main_image",
        ]


class CommentsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = serializers.StringRelatedField(source="author.username", read_only=True)
    profile_picture = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Comments
        fields = [
            "id",
            "author",
            "content",
            "created_at",
            "updated_at",
            "profile_picture",
        ]

    def get_profile_picture(self, obj):
        try:
            if obj.author.profile_picture:
                request = self.context.get("request")
                if request:
                    return request.build_absolute_uri(obj.author.profile_picture.url)
                else:
                    return obj.author.profile_picture.url
            else:
                return None
        except ObjectDoesNotExist:
            return None

    def create(self, validated_data):
        blog_pk = self.context["view"].kwargs.get("blogs_pk") or self.context[
            "view"
        ].kwargs.get("my_blogs_pk")

        return Comments.objects.create(
            author=self.context["request"].user, blog_id=blog_pk, **validated_data
        )

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Check if the author is the current user
        current_user = self.context["request"].user
        if current_user.is_authenticated and instance.author == current_user:
            representation["author"] = "Me"

        return representation


class BlogsLikesSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)  # Add this
    blog = serializers.StringRelatedField(read_only=True)  # Add this

    class Meta:
        model = Likes
        fields = ["author", "blog", "like_status"]  # Include all relevant fields
        extra_kwargs = {
            "like_status": {"required": True}  # Ensure this field is required
        }

    def create(self, validated_data):
        # This is correct! Context is used to set author/blog.
        return Likes.objects.create(
            author=self.context.get("author"),
            blog=self.context.get("blog"),
            **validated_data
        )


class MyBlogsLikesSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Likes
        fields = [
            "id",
            "author",
            "like_status",
        ]

    def create(self, validated_data):
        return Likes.objects.create(
            author=self.context.get("author"),
            blog=self.context.get("blog"),
            **validated_data
        )


class BlogGallerySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = BlogGallery
        fields = [
            "id",
            "image",
        ]

    def create(self, validated_data):
        blog_pk = self.context["view"].kwargs.get("my_blogs_pk")
        return BlogGallery.objects.create(blog_id=blog_pk, **validated_data)
