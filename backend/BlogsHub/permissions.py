from rest_framework import permissions
from .models import Blog


class IsCommentAuthorOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allow if the request user is the author of the comment or an admin
        return obj.author == request.user or request.user.is_staff


class IsAuthorOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow authors of the associated Blog to create images in the BlogGallery.
    """

    def get_blog_instance(self, blog_id):
        # Assuming you have a Blog model with a `get` method to get the Blog instance based on the id
        return Blog.objects.select_related("author").get(id=blog_id)

    def has_permission(self, request, view):
        blog_id = view.kwargs.get("blogs_pk") or view.kwargs.get("my_blogs_pk")
        if blog_id:
            blog = self.get_blog_instance(blog_id)
            return blog.author == request.user or request.user.is_staff
        return False
