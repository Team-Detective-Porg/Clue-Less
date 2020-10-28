# Generated by Django 3.1.2 on 2020-10-27 02:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clue_less', '0002_game_gamelog_gamesquare'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='gamelog',
            name='game',
        ),
        migrations.RemoveField(
            model_name='gamelog',
            name='player',
        ),
        migrations.RemoveField(
            model_name='gamesquare',
            name='game',
        ),
        migrations.RemoveField(
            model_name='gamesquare',
            name='owner',
        ),
        migrations.DeleteModel(
            name='Game',
        ),
        migrations.DeleteModel(
            name='GameLog',
        ),
        migrations.DeleteModel(
            name='GameSquare',
        ),
    ]
