// HAL Discord bot

const Discord = require("discord.js")
const request = require("request")
const config = require("./config.json")
const talkedRecently = new Set()
const client = new Discord.Client()

client.on("ready", () => {
  console.log("HAL Running")
  client.user.setGame("+help")
})

client.on("message", async message => {

  // Ignore bots + commands without prefix
  if(message.author.bot) return
  if(message.content.indexOf(config.prefix) !== 0) return
  
  // Creates an array from all parts of the given command
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  // Cooldown of 2.5s for msgs
  if (talkedRecently.has(message.author.id))
  return
  talkedRecently.add(message.author.id)
  setTimeout(() => {
    talkedRecently.delete(message.author.id)
  }, 2500)

//------------------------------------------------------------
//                     IP GEO Command
//------------------------------------------------------------

if (command === 'ip') {
  const ip = args[0]
  if (args[0]) {
    request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
      const x = JSON.parse(body)
      message.channel.send({embed: {
        color: 0xff0000,
        fields: [{
          name: "IP",
          value: x.query
        },
        {
          name: "City",
          value: x.city
        },
        {
          name: "Region",
          value: x.region
        },
        {
          name: "Country",
          value: x.country
        },
        {
          name: "ISP",
          value: x.isp
        }],
      }}).catch(err => console.log(err))
    })
  } else {
    message.channel.send("Needs IP Argument")
    console.log("IP search failed")
  }
}

//------------------------------------------------------------
//                         Movie Search
//------------------------------------------------------------

if (command === 'movie') {
  const movie = args[0]
  if (args[0]) {
    request(`http://www.omdbapi.com/?t=${movie}&apikey=${config.ombd_key}`, (error, response, body) => {
      const x = JSON.parse(body)
      message.channel.send(`
      Title: ${x.Title}
      Year: ${x.Year}
      Tomato: ${x.Ratings[1].value}
      Rated: ${x.Rated}
      Genre: ${x.Genre}
      Director: ${x.Director}
      Actors: ${x.Actors}
      Plot: ${x.Plot}`)
      console.log("Movie Search: " + movie)
    })
  } else {
  message.channel.send("Needs Movie")
  console.log("Movie search failed")
  }
}

//------------------------------------------------------------
//                     Help Screen
//------------------------------------------------------------

  if (command === 'help') {
    message.channel.send({embed: {
      "description" : "```+[command] [args]  \n\nip           Returns IP geolocation data\nurl          Returns true URL from a URL shortened link\nmovie        Returns data from a movie using OMBD API\nweather      Returns weather from a given location\nstock        Returns stock info for given stock\nhelp         Returns this page\n```",
      "color": 0xff0000
    }})
    console.log("Help Screen")
  }
})

client.on("error", (e) => console.error(e))
client.on("warn", (e) => console.warn(e))
client.on("debug", (e) => console.info(e))

client.login(config.token)
