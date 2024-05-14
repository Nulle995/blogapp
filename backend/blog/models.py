from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Category(models.Model):
    title = models.CharField(max_length=30)

    def __str__(self):
        return self.title


class Post(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=50, unique=True)
    desc = models.CharField(max_length=400)
    content = models.TextField()
    thumbnail = models.ImageField(upload_to="post", blank=True, null=True)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, blank=True, null=True, related_name="posts"
    )
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True, auto_now_add=False)

    class Meta:
        ordering = [
            "-created_at",
        ]

    def __str__(self):
        return self.title + " - " + self.author.username


class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.CharField(max_length=1000)

    def __str__(self):
        return self.author.username + " - " + self.post.title


class Image(models.Model):
    url = models.ImageField(upload_to="post/content")
