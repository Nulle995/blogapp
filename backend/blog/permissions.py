from rest_framework import permissions


class EditorPermission(permissions.BasePermission):
    def has_permission(self, request, view):

        return request.user.editoruser is not None
