const { Client } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

const PREFIX = '!a'
const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"]
});

client.on("ready", () => {
    client.user.setPresence({
        name: 'à votre service'
    });
    console.log('Connected as :'  + client.user.tag );
});

client.on('messageCreate', async message => {
    // if (message.member.id != client.user.id ) {
    //     message.reply('Que puis-je faire pour vous.')
    // }
    if (message.content.startsWith(PREFIX)) {
        const input = message.content.slice(PREFIX.length).trim().split(" ")
        const command = input.shift();
        // message.reply('TEST');
        switch(command){
            case 'help':
                // message.channel.send('Voici la liste des commande du bot')
                // message.delete();
                help();
                break;
            case 'chuck':
                chuck();
                break
            default:
                defaultmsg();
                break;

        }
    }
    function help() {
        message.channel.send("Voici la liste des commande du bot:\n**help** : Affiche l'aide du bot");
        message.delete();
    }

    function defaultmsg() {
        message.reply("Je ne connais pas cette tache, \nQue puis-je faire pour vous.");
        message.delete();
    }

    function chuck() {
        let url = 'https://chuckn.neant.be/api/rand';

        fetch(url).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Something went wrong');
            }
          })
          .then((responseJson) => {
            const myObj = json.parse(responseJson);
            console.log(myObj.joke)
            // message.channel.send(responseJson);
          })
          .catch((error) => {
            console.log(error)
          });
    }

});



client.login('OTI2OTkxNjY5OTM1NjM2NTAw.YdDuRA.NFdVXNpEuuY2tgIPpEOGcHYqNE8');