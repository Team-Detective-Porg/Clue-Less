from django.contrib import admin
from .models import Character, Player, Room, Weapon


# Create Character Admin interface
class CharacterAdmin(admin.ModelAdmin):
    list_display = ("holder", "location", "name")


admin.site.register(Character, CharacterAdmin)


# Create Room Admin interface
class RoomAdmin(admin.ModelAdmin):
    list_display = ("holder", "name")


admin.site.register(Room, RoomAdmin)


# Create Player Admin interface
class PlayerAdmin(admin.ModelAdmin):
    list_display = ("active", "game_session", "user_character", "user_name")


admin.site.register(Player, PlayerAdmin)


# Create Weapon Admin interface
class WeaponAdmin(admin.ModelAdmin):
    list_display = ("holder", "location", "name")


admin.site.register(Weapon, WeaponAdmin)
