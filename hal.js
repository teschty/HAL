// HAL Discord bot

const Discord = require("discord.js")
const request = require("request")
const client = new Discord.Client()
const config = require("./config.json")

client.on("ready", () => {
  console.log("HAL Running")
  client.user.setGame("+help")
})

client.on("message", async message => {

  // Ignore bots + commands without prefix
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

//------------------------------------------------------------
//                     IP GEO Command
//------------------------------------------------------------

  if (command === 'ip') {
    const ip = args[0]
    if (args[0]) {
      request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
        const x = JSON.parse(body)

        message.channel.send(`\n
        IP: ${x.query}
        City: ${x.city}
        Region: ${x.region}
        Country: ${x.country}
        Zip: ${x.zip}
        ISP: ${x.isp}
        LAT: ${x.lat}
        LON: ${x.lon}
        `)
        console.log("IP Search: " + ip)
      })
    } else {
    message.channel.send("Add IP address")
    console.log("IP search failed")
    }
  }

//------------------------------------------------------------
//                     Help Command
//------------------------------------------------------------

  if (command === 'help') {
    message.reply("```+[command] [args]  \n\nip           Return IP geolocation data\nurl          Return true URL from a URL shortened link\nmovie        Return data from a movie using OMBD API\nweather      Returns weather from a given location\nstock        Returns stock info for given stock\nhelp         Returns this page\n```")
  }
})

client.login(config.token)
