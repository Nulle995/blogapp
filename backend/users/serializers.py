from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import EditorUser


class EditorUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = EditorUser
        fields = ["user", "avatar", "bio"]
        extra_kwargs = {"user": {"read_only": True}}


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["username"] = user.username
        print("--------")
        try:
            token["is_editor"] = user.editoruser is not None
            token["avatar"] = user.editoruser.avatar.url
        except ObjectDoesNotExist:
            token["is_editor"] = False
        token["is_superuser"] = user.is_superuser

        return token
