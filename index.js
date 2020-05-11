const fs = require('fs');
const {prefix, token} = require('./config.json');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command)
}

client.on('ready', () => {
    console.log("Bot listening to server!")
})

client.on('message', message => {
    if (!(message.channel.id === '539496518852411413')) return; //Return if the command is not input into the bot-commands channel

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!message.member.roles.cache.some(role => role.name === 'Admin')) return message.channel.send('I only listen to Admins!');
    
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    if (command.args && !args.length){
        return message.channel.send(`Err: No arguments provided.`)
    }

    try{
        command.execute(message, args);
    }
    catch (error){
        console.error(error);
        message.reply('There was an error when executing that command.')
    }
})

client.login(token)