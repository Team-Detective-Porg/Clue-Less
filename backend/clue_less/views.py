from django.http import JsonResponse
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


def start_game(request, session_id):
    session = Session.objects.get(pk=session_id)
    players = Player.objects.filter(game_session=session_id).order_by("?")

    # Set winning character then assign remainder to players.
    session.character = Character.objects.order_by("?").first()

    while Character.objects.filter(holder__isnull=True).count() != 0:
        for player in players:
            character = (
                Character.objects.exclude(pk=session.character.pk)
                .order_by("?")
                .filter(holder__isnull=True)
                .first()
            )
            if character:
                character.holder = player
                character.save()
            else:
                break

    # Set winning weapon then assign remainder to players.
    session.weapon = Weapon.objects.order_by("?").first()

    while Weapon.objects.filter(holder__isnull=True).count() != 0:
        for player in players:
            weapon = (
                Weapon.objects.exclude(pk=session.weapon.pk)
                .order_by("?")
                .filter(holder__isnull=True)
                .first()
            )
            if weapon:
                weapon.holder = player
                weapon.save()
            else:
                break

    # Set winning room then assign remainder to players.
    session.room = Location.objects.filter(is_card=True).order_by("?").first()

    while (
        Location.objects.filter(is_card=True).filter(holder__isnull=True).count() != 0
    ):
        for player in players:
            room = (
                Location.objects.exclude(pk=session.weapon.pk)
                .filter(is_card=True)
                .order_by("?")
                .filter(holder__isnull=True)
                .first()
            )
            if room:
                room.holder = player
                room.save()
            else:
                break

    session.save()

    data = {
        "success": True,
        "session_id": session_id,
        "message": "Game successfully started",
    }
    return JsonResponse(data)


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

    def get_queryset(self):
        """ Allows for generating wining cards """
        queryset = Session.objects.all()
        generate = self.request.query_params.get("generate", None)
        _id = self.request.query_params.get("id", None)
        if generate is not None:
            # TODO Adjust to filter on game sessions.
            used_characters = list()
            for player in Player.objects.all():
                used_characters.append(player.user_character.name)
            if available == "True":
                queryset = queryset.exclude(name__in=used_characters)
            elif available == "False":
                queryset = queryset.filter(name__in=used_characters)

        return queryset


class WeaponView(viewsets.ModelViewSet):
    serializer_class = WeaponSerializer
    queryset = Weapon.objects.all()
