from django.db import models

# Create your models here.


class Character(models.Model):
    name = models.CharField(max_length=120)
    location = models.CharField(max_length=50, blank=True, null=True)
    holder = models.ForeignKey(
        "Player",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="character_holder",
    )

    def _str_(self):
        return self.name


class Player(models.Model):
    active = models.BooleanField(default=True)
    game_session = models.ForeignKey(
        "Session",
        on_delete=models.CASCADE,
    )
    # roomList = models.ManyToManyField("Room", related_name="golder", blank=True)
    user_character = models.ForeignKey(
        "Character",
        on_delete=models.PROTECT,
        blank=False,
    )  # TODO Validator to ensure character is unused.
    user_name = models.CharField(max_length=120, blank=False, unique=True)

    def _str_(self):
        return self.name


class Room(models.Model):
    name = models.CharField(max_length=120)
    holder = models.ForeignKey(
        "Player",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="room_holder",
    )

    def _str_(self):
        return self.name


class Session(models.Model):
    character = models.ForeignKey(
        "Character", on_delete=models.SET_NULL, blank=True, null=True
    )
    room = models.ForeignKey("Room", on_delete=models.SET_NULL, blank=True, null=True)
    weapon = models.ForeignKey(
        "Weapon", on_delete=models.SET_NULL, blank=True, null=True
    )


class Weapon(models.Model):
    name = models.CharField(max_length=120)
    location = models.CharField(max_length=50, blank=True, null=True)
    holder = models.ForeignKey(
        "Player",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="weapon_holder",
    )

    def _str_(self):
        return self.name
