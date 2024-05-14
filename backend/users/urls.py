from django.urls import path
from .views import EditorUserCreateView

urlpatterns = [
    path("editor/create/", EditorUserCreateView.as_view(), name="create-editor"),
]
