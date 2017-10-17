
import discord
import asyncio
import json

with open("config.json", "r") as f:
    config = json.load(f)
token = config["token"]

client = discord.Client()

@client.event
async def on_ready():
    print('Logged in as')
    print(client.user.name)
    print(client.user.id)
    print('------')

@client.event
async def on_message(message):
    if message.content.startswith('!test'):
        await client.send_message(message.channel, 'Test command')

client.run(token)
