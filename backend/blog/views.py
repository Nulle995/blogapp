from django.shortcuts import get_object_or_404
from django.contrib.auth.models import AnonymousUser
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .permissions import EditorPermission
from rest_framework.exceptions import PermissionDenied
from .models import Category, Post, Comment, Image
from .serializers import (
    CategorySerializer,
    PostListSerializer,
    PostDetailSerializer,
    CommentSerializer,
    ImageSerializer,
)
from django.contrib.auth.models import User


# Create your views here.
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def create(self, request, *args, **kwargs):
        user = self.request.user
        if not user.is_superuser:
            raise PermissionDenied("No tienes permisos para crear una categoría.")
        return super().create(request, *args, **kwargs)


class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    permission_classes = [AllowAny]


class PostCreateView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
    permission_classes = [
        IsAuthenticated,
        EditorPermission,
    ]

    def perform_create(self, serializer):
        user = self.request.user
        print(user.editoruser)
        print(user)
        print(".------------------.")
        if not user or not hasattr(user, "editoruser"):
            raise PermissionDenied("No tienes permisos para crear un post.")
        serializer.save(author=user)


class PostDetailView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
    lookup_field = "slug"
    permission_classes = [AllowAny]


class PostUpdateView(generics.UpdateAPIView):
    serializer_class = PostDetailSerializer
    lookup_field = "slug"
    permission_classes = [IsAuthenticated, EditorPermission]

    def get_queryset(self):
        user = self.request.user
        print(user.is_staff)
        print(user.is_superuser)
        return Post.objects.filter(author=user)


class CommentCreateView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        post_id = self.request.data.get("post_id")
        user = self.request.user
        post = get_object_or_404(Post, id=post_id)

        if user.is_anonymous:
            try:
                guest_user = User.objects.get(username="Invitado")
            except User.DoesNotExist:
                password = User.objects.make_random_password()
                guest_user, created = User.objects.get_or_create(
                    username="Invitado", password=password
                )
            serializer.save(author=guest_user, post=post)
        elif user.is_authenticated:
            serializer.save(author=user, post=post)


class ImageListCreateView(generics.ListCreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
