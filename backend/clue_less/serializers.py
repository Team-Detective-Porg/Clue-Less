from rest_framework import serializers
from .models import Character, Player, Location, Session, Weapon


class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = ("id", "location", "name", "holder")


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ("id", "character", "room", "weapon")


class WeaponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weapon
        fields = ("id", "location", "name", "holder")


class LocationSerializer(serializers.ModelSerializer):
    characterList = CharacterSerializer(
        source="character_location", many=True, read_only=True
    )
    weaponList = WeaponSerializer(source="weapon_location", many=True, read_only=True)

    class Meta:
        model = Location
        fields = (
            "is_card",
            "name",
            "display_name",
            "holder",
            "valid_moves",
            "characterList",
            "weaponList",
        )


class PlayerSerializer(serializers.ModelSerializer):
    characterList = CharacterSerializer(
        source="character_holder", many=True, read_only=True
    )
    roomList = LocationSerializer(source="room_holder", many=True, read_only=True)
    weaponList = WeaponSerializer(source="weapon_holder", many=True, read_only=True)

    class Meta:
        model = Player
        fields = (
            "active",
            "characterList",
            "game_session",
            "roomList",
            "user_character",
            "user_name",
            "weaponList",
        )
