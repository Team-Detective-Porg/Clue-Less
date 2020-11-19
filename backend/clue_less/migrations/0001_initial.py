# Generated by Django 3.1.2 on 2020-11-17 16:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Character',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('is_card', models.BooleanField(default=False)),
                ('display_name', models.CharField(max_length=120, unique=True)),
                ('name', models.CharField(max_length=120, primary_key=True, serialize=False, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('user_name', models.CharField(max_length=120, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Weapon',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('holder', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='weapon_holder', to='clue_less.player')),
                ('location', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='weapon_location', to='clue_less.location')),
            ],
        ),
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('character', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='clue_less.character')),
                ('room', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='clue_less.location')),
                ('weapon', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='clue_less.weapon')),
            ],
        ),
        migrations.AddField(
            model_name='player',
            name='game_session',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clue_less.session'),
        ),
        migrations.AddField(
            model_name='player',
            name='user_character',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='clue_less.character'),
        ),
        migrations.AddField(
            model_name='location',
            name='holder',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='room_holder', to='clue_less.player'),
        ),
        migrations.AddField(
            model_name='location',
            name='valid_moves',
            field=models.ManyToManyField(blank=True, related_name='valid_move', to='clue_less.Location'),
        ),
        migrations.AddField(
            model_name='character',
            name='holder',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='character_holder', to='clue_less.player'),
        ),
        migrations.AddField(
            model_name='character',
            name='location',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='character_location', to='clue_less.location'),
        ),
    ]
