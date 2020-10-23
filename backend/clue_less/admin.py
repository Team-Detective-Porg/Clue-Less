from django.contrib import admin
from .models import Character, Room, Weapon


# Create Character Admin interface
class CharacterAdmin(admin.ModelAdmin):
    list_display = ("holder", "location", "name")


admin.site.register(Character, CharacterAdmin)


# Create Room Admin interface
class RoomAdmin(admin.ModelAdmin):
    list_display = ("holder", "name")


admin.site.register(Room, RoomAdmin)


# Create Weapon Admin interface
class WeaponAdmin(admin.ModelAdmin):
    list_display = ("holder", "location", "name")


admin.site.register(Weapon, WeaponAdmin)
