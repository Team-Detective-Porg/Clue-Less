from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CharacterSerializer, RoomSerializer, WeaponSerializer
from .models import Character, Room, Weapon


class CharacterView(viewsets.ModelViewSet):
    serializer_class = CharacterSerializer
    queryset = Character.objects.all()


class RoomView(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()


class WeaponView(viewsets.ModelViewSet):
    serializer_class = WeaponSerializer
    queryset = Weapon.objects.all()
