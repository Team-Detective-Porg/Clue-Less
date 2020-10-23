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


# TODO Replace this placeholder that is used to allow Foreign Keys to work.
class Player(models.Model):
    name = models.CharField(max_length=120)

    def _str_(self):
        return self.name


class Room(models.Model):
    name = models.CharField(max_length=120)
    holder = models.ForeignKey(
        "Player", on_delete=models.SET_NULL, blank=True, null=True
    )

    def _str_(self):
        return self.name


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
