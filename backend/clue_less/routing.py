from django.urls import path, re_path
from . import consumers

websocket_urlpatterns = [
    re_path('lobby/', consumers.ChatConsumer),
    # path('lobby/', consumers.LobbyConsumer),
    # path('game/<int:pk>/', consumers.GameConsumer),
    path('game/', consumers.GameConsumer)
]