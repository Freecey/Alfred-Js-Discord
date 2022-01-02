const { Client, VoiceChannel, MessageEmbed } = require("discord.js");

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

const PREFIX = '!a'
const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES"]
});

client.on("ready", async () => {
    client.user.setPresence({
        name: 'à votre service'
    });
    console.log('Connected as :' + client.user.tag);
});

var randomInteger = function (pow) {
	return Math.floor( 1 + Math.random() * pow);
};

client.on('messageCreate', async message => {
    // if (message.member.id != client.user.id ) {
    //     message.reply('Que puis-je faire pour vous.')
    // }
    if (message.content.startsWith(PREFIX)) {
        const input = message.content.slice(PREFIX.length).trim().split(" ")
        const command = input.shift();
        // message.reply('TEST');
        switch (command) {
            case 'help':
                // message.channel.send('Voici la liste des commande du bot')
                // message.delete();
                help();
                break;
            case 'chuck':
                chuck();
                break;
            case 'batman':
                batmat();
                break;
            case 'de':
                // console.log(input[0])
                deroll(input[0]);
                break
            default:
                defaultmsg();
                break;

        }
    }
    function help() {
        const EmbedHelp = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Alfred P. - Discord.js Bot')
            .setURL('https://gitlab.yana.xyz/cedric/alfred-js-discord')
            .setAuthor({ name: 'Alfred P.', iconURL: 'attachment://Alfred.webp', url: 'https://gitlab.yana.xyz/cedric/alfred-js-discord' })
            .setDescription('**Voici la liste des commandes du bot**')
            .setThumbnail('attachment://Alfred.webp')
            .addFields(
                { name: '**help** :', value: 'Affiche l\'aide du bot' },
                { name: '**de** :', value: 'lance un dé pour vous (un dé 10 par défaut, mais vous pouvez en spécifier un autre "!a de xxx").' },
                { name: '**chuck** :', value: 'Un petit Chuck Norris Fact.' },
                { name: '**batman** :', value: '???????' },
                { name: '\u200B', value: '\u200B' },
            )
            .setTimestamp()
            .setFooter('by Cedric', 'https://i.pinimg.com/originals/b1/45/92/b145929e78c131593b303a042b6dfa16.jpg');
        message.channel.send({ embeds: [EmbedHelp], files: ['./Alfred.webp'] });
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
                console.log(responseJson.joke);
                message.channel.send(responseJson.joke);
                message.delete();
            })
            .catch((error) => {
                console.log(error)
            });
    }

    async function batmat() {
        const embed = new MessageEmbed().setTitle('Na na na na na na na na na na na na na na na\n... BATMAN!').setImage('attachment://batman-1966x.jpg');
        message.channel.send({ embeds: [embed], files: ['./batman-1966x.jpg'] });
        message.delete();
    }

    function deroll(nb) {
        console.log(Number.isInteger(nb));
        if (!isNaN(nb) || typeof nb == "undefined") {
            nb = (nb != null) ? nb : 10 ;
            var rand = randomInteger(nb);
            msg = "J'ai lance pour vous un dé "+nb+" Vous avez obtenu **"+rand+"**";
            console.log(msg);
        } else {
            msg = "Je n\'ai pas de dé \""+nb+"\" désolé."
        }
        message.reply(`${msg}`);
        // message.delete();
    }

});



client.login('OTI2OTkxNjY5OTM1NjM2NTAw.YdDuRA.NFdVXNpEuuY2tgIPpEOGcHYqNE8');