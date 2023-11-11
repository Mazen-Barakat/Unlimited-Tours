from rest_framework import permissions


class IsCommentAuthorOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allow if the request user is the author of the comment or an admin
        return obj.author == request.user or request.user.is_staff
