const {prefix} = require('../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['commands'],
    description: 'Lists all commands.',
    usage: '[command]',
    execute: async (message, args) => {
        const data = [];
        const embed = new Discord.MessageEmbed()
        .setTitle('WiosnaBot')
        .setDescription(`Here\'s a list of commands currently supported by Wiosna: `);
        const {commands} = message.client;

        if (!args.length){
            embed.addField('Commands', commands.map(command => command.name).join('\n'));
            message.channel.send(embed)
            .then(() => message.channel.send(`\nYou can also send \`${prefix}help [command name]\` to get help on a specific command!`))
            .catch(err => {
                console.log(err);
                throw err;
            })
        }
        else{
            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(name));

            if (!command){
                return message.channel.send(`\`${name}\` is an unknown command!`);
            }

            data.push(`Command: ${command.name}`);

            if (command.aliases) data.push(`Aliases: ${command.aliases.join(', ')}`);
            if (command.description) data.push(`Description: ${command.description}`);
            if (command.usage) data.push(`Usage: \`${prefix}${command.name} ${command.usage}\``);

            message.channel.send(data, {split: true});
        }
    },
};
