import re
import logging
import json
import datetime
import asyncio
from asgiref.sync import async_to_sync
from .models import *
from channels.generic.websocket import WebsocketConsumer, JsonWebsocketConsumer
from channels.consumer import AsyncConsumer
from channels.layers import get_channel_layer
from .serializers import *
from .views import *

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ChatConsumer(WebsocketConsumer):

    def connect(self):
        self.accept()
        async_to_sync(self.channel_layer.group_add)("lobby", self.channel_name)

    def disconnect(self):
        async_to_sync(self.channel_layer.group_discard)("lobby", self.channel_name)

    def receive(self, text_data):
        """
        Receive a message and broadcast it to a room group
        UTC time is included so the client can display it in each user's local time
        """
        
        text_data_json = json.loads(text_data)
        character = text_data_json['character']
        user_name = text_data_json['userName']
        utc_time = datetime.datetime.now(datetime.timezone.utc)
        utc_time = utc_time.isoformat()
        
        async_to_sync(self.channel_layer.group_send)(
            "lobby",
            {
                'type': 'lobby.message',
                'character': character,
                'userName': user_name,
                'utc_time': utc_time,
            },
        )

    def lobby_message(self, event):
        """
        Receive a broadcast message and send it over a websocket
        """
        logger.info(event)
        players = PlayerSerializer(list(Player.objects.all()), many=True)

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'type': 'lobby.message',
            'player_list': players.data
        }))

class GameConsumer(JsonWebsocketConsumer):

    def connect(self):
        self.accept()
        async_to_sync(self.channel_layer.group_add)("game", self.channel_name)

    def disconnect(self):
        async_to_sync(self.channel_layer.group_discard)("game", self.channel_name)

    def receive(self, text_data):
        """
        Receive a message and broadcast it to a room group
        UTC time is included so the client can display it in each user's local time
        """
        
        text_data_json = json.loads(text_data)
        move_type = text_data_json['move_type']
        logger.info('receive %s', move_type)
        #if (move_type == 'move'):
        #    data = text_data_json['location']
        #elif (move_type == 'suggestion'):
        #    data = text_data_json['suggestion']

        async_to_sync(self.channel_layer.group_send)(
            "game", text_data_json,
        )

    def game_message(self, event):
        """
        Receive a broadcast message and send it over a websocket
        """
        move = LocationSerializer(list(Location.objects.all()), many=True)
        move_type = event['move_type']
        logger.info('game_message ' + move_type)

        # Send message to WebSocket
        if (move_type == 'move' or move_type == 'suggestion'):
            self.send(text_data=json.dumps({
                'type': 'game.message',
                'move_type': move_type,
                'locations_list': move.data
            }))
        elif (move_type == 'notification'):
            move = event['move']
            if (move == 'move'):
                moved_to = Character.objects.get(id = event['character'])
                self.send(text_data=json.dumps({
                    'type': 'game.message',
                    'move_type': 'notification',
                    'text': event['user_name'] + ' moved to ' + moved_to.location.name
                }))
            elif (move == 'suggestion'):
                self.send(text_data=json.dumps({
                    'type': 'game.message',
                    'move_type': 'notification',
                    'text': event['user_name'] + ' made a suggestion'
                }))
            elif (move == 'accusation'):
                response_data = event['response_data']
                if (response_data['correct']):
                    self.send(text_data=json.dumps({
                        'type': 'game.message',
                        'move_type': 'notification',
                        'text': event['user_name'] + ' won the game!'
                    }))
            else:
                self.send(text_data=json.dumps(event))
        else:
            self.send(text_data=json.dumps(event))