from django.db import models

# Create your models here.


class Character(models.Model):
    name = models.CharField(max_length=120)
    location = models.CharField(
        default="starting Place", max_length=10
    )  # TODO Better define this data type and default.
    holder = models.ForeignKey(
        "Player", on_delete=models.SET_NULL, blank=True, null=True
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


class Room(models.Model):
    name = models.CharField(max_length=120)
    holder = models.ForeignKey(
        "Player", on_delete=models.SET_NULL, blank=True, null=True
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
    location = models.CharField(
        default="Starting Place", max_length=10
    )  # TODO Better define this data type and default.
    holder = models.ForeignKey(
        "Player", on_delete=models.SET_NULL, blank=True, null=True
    )

    def _str_(self):
        return self.name
