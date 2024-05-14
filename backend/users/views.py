from .serializers import EditorUserSerializer, CustomTokenObtainPairSerializer
from .models import EditorUser
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User


# Create your views here.
class EditorUserCreateView(generics.CreateAPIView):
    queryset = EditorUser.objects.all()
    serializer_class = EditorUserSerializer
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        username = self.request.data.get("username")
        password = self.request.data.get("password")
        bio = self.request.data.get("bio")
        print(username, password, bio)
        user = User.objects.create_user(username=username, password=password)
        print(user.id)
        editor = EditorUser.objects.create(user=user, bio=bio)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
