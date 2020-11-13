from rest_framework import viewsets
from .serializers import (
    CharacterSerializer,
    LocationSerializer,
    PlayerSerializer,
    SessionSerializer,
    WeaponSerializer,
)
from .models import Character, Player, Location, Session, Weapon

from django.shortcuts import render


class CharacterView(viewsets.ModelViewSet):
    serializer_class = CharacterSerializer
    queryset = Character.objects.all()

    def get_queryset(self):
        """ allow rest api to filter by name """
        queryset = Character.objects.all()
        available = self.request.query_params.get("available", None)
        if available is not None:
            # TODO Adjust to filter on game sessions.
            used_characters = list()
            for player in Player.objects.all():
                used_characters.append(player.user_character.name)
            if available == "True":
                queryset = queryset.exclude(name__in=used_characters)
            elif available == "False":
                queryset = queryset.filter(name__in=used_characters)

        return queryset


class LocationView(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()

    def get_queryset(self):
        """ allow rest api to filter by name """
        queryset = Location.objects.all()
        card = self.request.query_params.get("card", None)
        if card is not None:
            # TODO Adjust to filter on game sessions.
            queryset = queryset.filter(is_card=card)

        return queryset


class PlayerView(viewsets.ModelViewSet):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()


class SessionView(viewsets.ModelViewSet):
    serializer_class = SessionSerializer
    queryset = Session.objects.all()


class WeaponView(viewsets.ModelViewSet):
    serializer_class = WeaponSerializer
    queryset = Weapon.objects.all()
