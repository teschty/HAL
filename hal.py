
"""
Basic Discord.py Rewrie Bot
Intend to include examples covering lots of different things

# Hacktoberfest 2017
"""

import discord
from discord.ext import commands
import asyncio
import aiohttp
import json
import datetime
import logging

with open("config.json", "r") as f:
    config = json.load(f)
    f.close()
token = config["token"]

description = "HAL"
bot = commands.Bot(command_prefix='!', self_bot=False, description=description)

async def background_task():
    # This task may mess up after reconnect?
    counter = 0
    while True:
        await asyncio.sleep(60)
        counter += 1
        logging.log(20, "Approximate Time Since Connect: {} mins".format(counter))


@bot.command()
async def christmas(ctx):
    now = datetime.datetime.now()
    christmas_date = datetime.datetime(2017, 12, 25)
    time_delta = christmas_date - now
    await ctx.send("Time 'til Christmas!: " + str(time_delta))


@bot.command(hidden = True)
async def embed_example(ctx):
    embed = discord.Embed(title="This", url='http://potato.org', description="is an example", color=0xff0000)
    #embed.set_author(name="Dank Meme", url='http:///google.com', icon_url='''http://maxcdn.icons8.com/Share/icon/Plants/potato1600.png''')
    embed.set_thumbnail(url='''http://maxcdn.icons8.com/Share/icon/Plants/potato1600.png''')
    embed.add_field(name="monty", value="python", inline=False)
    embed.set_footer(text="asdf")
    await ctx.send(embed=embed)


@bot.command()
async def hal(ctx):
    """:O:"""
    await ctx.send(file=discord.File('hal.png'))


@bot.command()
async def jake(ctx):
    await ctx.send("https://whataburger.com/food")


@bot.command()
async def echo(ctx, *, message: str):
    await ctx.send("{0.author} said: {0.content}".format(message))


@bot.command()
async def dog(ctx):
    """Gives a dog picture from random.dog/woof via https"""
    # changes to aiohttp -> set the session to a var and call things with it. Kill the session when done...
    async with aiohttp.ClientSession() as session:
        async with session.get("https://random.dog/woof") as r:
            if r.status == 200:
                dog_link = await r.text()
                await ctx.send("https://random.dog/" + dog_link)
        await session.close()


@bot.command()
async def cat(ctx):
    """Gives a cat picture from random.cat/meow via https"""
    async with aiohttp.ClientSession() as session:
        async with session.get('https://random.cat/meow') as r:
        # 200 -> everything fine.
            if r.status == 200:
                content = await r.json()
                # removes spaces from link and replaces with url encoded space
                await ctx.send(content['file'].replace(' ', '%20'))
        await session.close()


@bot.event
async def on_ready():
    print("Logged in as {0.user}".format(bot))
    print(bot.user.name)
    print(bot.user.id)
    print("~~~~~~~")
    await bot.change_presence(game=discord.Game(name="!help for help"))


logging.basicConfig(level=logging.INFO)
bot.run(token)
