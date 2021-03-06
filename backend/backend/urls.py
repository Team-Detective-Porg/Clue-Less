"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from clue_less import views

router = routers.DefaultRouter()
router.register(r"characters", views.CharacterView, "character")
router.register(r"locations", views.LocationView, "location")
router.register(r"players", views.PlayerView, "player")
router.register(r"sessions", views.SessionView, "session")
router.register(r"weapons", views.WeaponView, "weapon")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("gamestart/<int:session_id>/", views.start_game),
    path("suggestion/", views.suggestion),
    path("accusation/", views.accusation),
]
