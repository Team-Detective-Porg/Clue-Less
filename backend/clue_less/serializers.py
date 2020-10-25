from rest_framework import serializers
from .models import Character, Player, Room, Session, Weapon


class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = ("id", "holder", "location", "name")


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ("active", "game_session", "user_character", "user_name")


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ("id", "holder", "name")


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ("id", "character", "room", "weapon")


class WeaponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weapon
        fields = ("id", "holder", "location", "name")
