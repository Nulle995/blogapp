from django.urls import path
from .views import (
    CategoryListCreateView,
    PostCreateView,
    PostListView,
    PostDetailView,
    PostUpdateView,
    CommentCreateView,
    ImageListCreateView,
)

urlpatterns = [
    path("category/", CategoryListCreateView.as_view(), name="category"),
    path("post/list/", PostListView.as_view(), name="post_list"),
    path("post/create/", PostCreateView.as_view(), name="post_create"),
    path("post/<slug:slug>/", PostDetailView.as_view(), name="post_detail"),
    path("post/update/<slug:slug>/", PostUpdateView.as_view(), name="post_update"),
    path("comment/", CommentCreateView.as_view(), name="comment"),
    path("image/", ImageListCreateView.as_view(), name="image"),
]
