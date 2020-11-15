from django.db import models

# Create your models here.


class Character(models.Model):
    name = models.CharField(max_length=120)
    location = models.ForeignKey(
        "Location",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="character_location",
    )
    holder = models.ForeignKey(
        "Player",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="character_holder",
    )

    def _str_(self):
        return self.name


class Location(models.Model):
    is_card = models.BooleanField(default=False)
    display_name = models.CharField(max_length=120, unique=True)
    holder = models.ForeignKey(
        "Player",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="room_holder",
    )
    name = models.CharField(max_length=120, unique=True, primary_key=True)
    valid_moves = models.ManyToManyField(
        "self", related_name="valid_move", blank=True, symmetrical=False
    )

    def _str_(self):
        return self.name


class Player(models.Model):
    active = models.BooleanField(default=True)
    game_session = models.ForeignKey(
        "Session",
        on_delete=models.CASCADE,
    )
    user_character = models.ForeignKey(
        "Character",
        on_delete=models.PROTECT,
        blank=False,
    )  # TODO Validator to ensure character is unused.
    user_name = models.CharField(max_length=120, blank=False, unique=True)

    def _str_(self):
        return self.name


class Session(models.Model):
    character = models.ForeignKey(
        "Character", on_delete=models.SET_NULL, blank=True, null=True
    )
    room = models.ForeignKey(
        "Location", on_delete=models.SET_NULL, blank=True, null=True
    )
    weapon = models.ForeignKey(
        "Weapon", on_delete=models.SET_NULL, blank=True, null=True
    )


class Weapon(models.Model):
    name = models.CharField(max_length=120)
    location = models.ForeignKey(
        "Location",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="weapon_location",
    )
    holder = models.ForeignKey(
        "Player",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="weapon_holder",
    )

    def _str_(self):
        return self.name
