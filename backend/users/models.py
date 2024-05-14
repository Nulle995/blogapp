from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class EditorUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(
        upload_to="profile", default="profile/default_avatar.jpg"
    )
    bio = models.TextField()
