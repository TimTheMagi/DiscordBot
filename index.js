//TODO: Consider making a class that extends Discord.Client() to store various important bot variables.
//TODO: Put important channel and role id's into variables.

const fs = require('fs');
const {prefix, token, YT_APIKEY} = require('./config.json');
const Discord = require('discord.js');
const {Player} = require('discord-player');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const player = new Player(client, YT_APIKEY, {leaveOnEnd: true, leaveOnEmpty: true});
client.player = player;

//Finding all files in the /commands directory
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Dynamically importing all of the command files
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command)
}

const cooldowns = new Discord.Collection();

//Event handler for when the bot is started
client.on('ready', () => {
    client.user.setActivity('say ;;help', {
        type: "LISTENING"
    })
    console.log("Bot listening to server!")
})

//Event handler for message created
client.on('message', async message => {
    const adminMessage = message.member.roles.cache.some(role => role.name === 'Admin');

    if (!(message.channel.id === '539496518852411413')) return; //Return if the command is not input into the #bot-commands channel

    if (!message.content.startsWith(prefix) || message.author.bot) return; //Return if the message does not begin with the prefix or is sent by the bot

    //Getting the command and arguments from the message
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    //Checking that there is a recognized command or alias for the typed command
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    //Checking that the member is a role that is allowed to use the bot (Likely will be opened later)
    if (command.adminOnly && !adminMessage){
        return message.channel.send('This command is usable only by Admins or is currently under construction.');
    }

    //If the command requires arguments, return and send feedback
    if (command.args && !args.length){
        return message.channel.send(`Error: This command requires at least one argument.`)
    }

    if (!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 2) * 1000;

    if (timestamps.has(message.author.id)){
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime){
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(`You currently have a cooldown of ${timeLeft.toFixed(1)} second(s) for that command.`)
        }
    }

    if (!adminMessage){
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    try{
        command.execute(message, args); //Running the given command
    }
    catch (error){
        console.error(error);
        message.reply('There was an error when executing that command.')
    }
})

client.login(token)
