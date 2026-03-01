from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("Backend is running successfully 🚀")

urlpatterns = [
    path('', home),  # 👈 THIS FIXES 500 AT ROOT
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]