from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # This line includes all the URLs from your Pos_App
    path('api/', include('Pos_App.urls')),
]