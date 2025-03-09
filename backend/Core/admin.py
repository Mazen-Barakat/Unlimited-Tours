from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    # Fields to display in the "add user" form
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "email",
                    "password1",
                    "password2",
                    "first_name",
                    "last_name",
                    "profile_picture",  # Add profile_picture to the add form
                ),
            },
        ),
    )

    # Fields to display in the "edit user" form
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (
            "Personal info",
            {"fields": ("first_name", "last_name", "email", "profile_picture")},
        ),  # Add profile_picture here
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    # Fields to display in the list view of users
    list_display = (
        "username",
        "email",
        "first_name",
        "last_name",
        "is_staff",
        "profile_picture",
    )  # Add profile_picture to the list view

    # Optional: Add a filter for profile_picture in the admin list view
    list_filter = ("is_staff", "is_superuser", "is_active", "groups", "profile_picture")

    # Optional: Make profile_picture searchable in the admin
    search_fields = ("username", "first_name", "last_name", "email", "profile_picture")
