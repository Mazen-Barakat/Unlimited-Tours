from djoser.serializers import (
    UserCreateSerializer as BaseUserCreateSerializer,
    UserSerializer as BaseUserSerializer,
)
from rest_framework import serializers


class UserCreateSerializer(BaseUserCreateSerializer):
    date_joined = serializers.DateTimeField(read_only=True)

    class Meta(BaseUserCreateSerializer.Meta):
        fields = [
            "id",
            "email",
            "username",
            "password",
            "first_name",
            "last_name",
            "phone_number_1",
            "date_joined",
        ]


class UserSerializer(BaseUserSerializer):
    date_joined = serializers.DateTimeField(read_only=True)

    class Meta(BaseUserSerializer.Meta):
        fields = [
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "profile_picture",
            "phone_number_1",
            "date_joined",
        ]
