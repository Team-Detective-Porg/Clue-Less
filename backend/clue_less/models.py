from django.db import models

# Create your models here.


class Character(models.Model):
    name = models.CharField(max_length=120)
    location = models.CharField(
        default="starting Place"
    )  # TODO Better define this data type and default.
    holder = models.ForeignKey("User", on_delete=models.SET_NULL, blank=True)

    def _str_(self):
        return self.name


class Room(models.Model):
    name = models.CharField(max_length=120)
    holder = models.ForeignKey("User", on_delete=models.SET_NULL, blank=True)

    def _str_(self):
        return self.name


class Weapon(models.Model):
    name = models.CharField(max_length=120)
    location = models.CharField(
        default="Starting Place"
    )  # TODO Better define this data type and default.
    holder = models.ForeignKey("User", on_delete=models.SET_NULL, blank=True)

    def _str_(self):
        return self.name
