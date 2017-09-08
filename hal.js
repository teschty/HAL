
const Discord = require("discord.js")
const client = new Discord.Client()
const config = require("./config.json")

client.on("ready", () => {
  console.log("HAL Running")
  client.user.setGame(">help")
})

client.on("message", async message => {

  // Ignore bots + commands without prefix
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

})

client.login(config.token)
