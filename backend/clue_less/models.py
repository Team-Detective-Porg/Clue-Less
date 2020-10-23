from django.db import models

# Create your models here.


class Character(models.Model):
    name = models.CharField(max_length=120)
    starting_place = models.CharField()  # TODO Better define this data type.
    holder = models.ForeignKey("User", on_delete=models.SET_NULL, blank=True)

    def _str_(self):
        return self.name
