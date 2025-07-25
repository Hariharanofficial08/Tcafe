# project_root/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('Pos_App.urls')),  # ✅ This line connects your Pos_App
]
