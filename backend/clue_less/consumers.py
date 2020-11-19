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
        logger.info(text_data_json)

        move_type = text_data_json['move_type']
        #if (move_type == 'move'):
        #    data = text_data_json['location']
        #elif (move_type == 'suggestion'):
        #    data = text_data_json['suggestion']
        
        async_to_sync(self.channel_layer.group_send)(
            "game",
            {
                'type': 'game.message',
                'content': text_data_json,
            },
        )

    def game_message(self, event):
        """
        Receive a broadcast message and send it over a websocket
        """
        logger.info(event)

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'type': 'game.message',
            'data': event
        }))