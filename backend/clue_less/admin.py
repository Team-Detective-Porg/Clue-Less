from django.contrib import admin
from .models import Character, Player, Location, Session, Weapon


# Create Character Admin interface
class CharacterAdmin(admin.ModelAdmin):
    list_display = ("location", "name", "holder")


admin.site.register(Character, CharacterAdmin)


# Create Player Admin interface
class PlayerAdmin(admin.ModelAdmin):
    list_display = (
        "active",
        "game_session",
        "user_character",
        "user_name",
    )


admin.site.register(Player, PlayerAdmin)


# Create Location Admin interface
class LocationAdmin(admin.ModelAdmin):
    fields = ["is_card", "holder", "display_name", "name", "valid_moves"]


admin.site.register(Location, LocationAdmin)


# Create Session Admin interface
class SessionAdmin(admin.ModelAdmin):
    list_display = ("character", "room", "weapon")


admin.site.register(Session, SessionAdmin)


# Create Weapon Admin interface
class WeaponAdmin(admin.ModelAdmin):
    list_display = ("location", "name", "holder")


admin.site.register(Weapon, WeaponAdmin)
