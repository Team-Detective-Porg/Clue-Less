from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
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

    while (
        Character.objects.exclude(pk=session.character.pk)
        .filter(holder__isnull=True)
        .count()
        != 0
    ):
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

    while (
        Weapon.objects.exclude(pk=session.weapon.pk).filter(holder__isnull=True).count()
        != 0
    ):
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
        Location.objects.exclude(pk=session.room.pk)
        .filter(is_card=True)
        .filter(holder__isnull=True)
        .count()
        != 0
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


@method_decorator(csrf_exempt, name="dispatch")
def suggestion(request):
    body_unicode = request.body.decode("utf-8")
    body = json.loads(body_unicode)

    suggested_character = Character.objects.filter(pk=body["character"]).first()
    suggested_weapon = Weapon.objects.filter(pk=body["weapon"]).first()
    suggested_location = Location.objects.filter(pk=body["location"]).first()

    # Orders the players to start with the suggesting player.
    players = list(Player.objects.filter(game_session=body["session_id"]))

    for index, player in enumerate(players):
        if player.id == body["player"]:
            player_index = index
            break

    players = players[player_index:] + players[:player_index]
    players.pop(0)

    for player in players:
        # TODO randomize the order of which type of card is checked first.
        if suggested_character in list(Character.objects.filter(holder=player)):
            data = {
                "player_name": player.user_name,
                "card_name": suggested_character.name,
            }
            break
        elif suggested_weapon in list(Weapon.objects.filter(holder=player)):
            data = {"player_name": player.user_name, "card_name": suggested_weapon.name}
            break
        elif suggested_location in list(Location.objects.filter(holder=player)):
            data = {
                "player_name": player.user_name,
                "card_name": suggested_location.display_name,
            }
            break
        else:
            data = {"player_name": "", "card_name": ""}

    return JsonResponse(data)


def ac(request, session_id):
    pass
    """if correct:
        # channel push "User1 won."
        data = {"correct": True}
    else:
        # set player in active
        data = {"correct": False}"""


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
