from rest_framework import serializers
from .models import Category, Post, Comment, Image


class AuthorSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    username = serializers.CharField(read_only=True)


class CategoryNameSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    title = serializers.CharField(read_only=True)


class CommentsDetailSerializer(serializers.Serializer):
    author = AuthorSerializer(read_only=True)
    created_at = serializers.CharField(read_only=True)
    content = serializers.CharField(read_only=True)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "title", "posts"]
        extra_kwargs = {"posts": {"read_only": True}, "id": {"read_only": True}}


class PostListSerializer(serializers.ModelSerializer):
    comment_count = serializers.SerializerMethodField(read_only=True)
    author_detail = AuthorSerializer(source="author", read_only=True)
    category_detail = CategoryNameSerializer(source="category", read_only=True)

    class Meta:
        model = Post
        fields = [
            "pk",
            "title",
            "slug",
            "desc",
            "thumbnail",
            "category",
            "category_detail",
            "author",
            "author_detail",
            "created_at",
            "edited_at",
            "comment_count",
        ]

    def get_comment_count(self, obj):
        return obj.comments.count()


class PostDetailSerializer(serializers.ModelSerializer):
    comment_count = serializers.SerializerMethodField(read_only=True)
    comments_detail = CommentsDetailSerializer(
        source="comments", read_only=True, many=True
    )
    author_detail = AuthorSerializer(source="author", read_only=True)
    category_detail = CategoryNameSerializer(source="category", read_only=True)

    class Meta:
        model = Post
        fields = [
            "pk",
            "title",
            "slug",
            "desc",
            "content",
            "thumbnail",
            "category",
            "category_detail",
            "author",
            "author_detail",
            "created_at",
            "edited_at",
            "comments",
            "comments_detail",
            "comment_count",
        ]
        extra_kwargs = {"comments": {"read_only": True}, "author": {"read_only": True}}

    def get_comment_count(self, obj):
        return obj.comments.count()


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["author", "post", "created_at", "content"]
        extra_kwargs = {"author": {"read_only": True}, "post": {"read_only": True}}


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ["url"]
