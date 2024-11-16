from django.urls import path
from . import views
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', views.player_list, name='player_list'),
    path('admin/', admin.site.urls),
    path('', include('players.urls')),
]
