const {prefix} = require('../config.json');

module.exports = {
    name: 'help',
    aliases: ['commands'],
    description: 'Lists all commands.',
    usage: '[command]',
    execute(message, args){
        const data = [];
        const {commands} = message.client;

        if (!args.length){
            data.push('Here\'s a list of currently supported commands: ');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can also send \`${prefix}help [command name]\` to get help on a specific command!`);

            return message.author.send(data, {split: true})
                .then(() => {
                    if (message.channel.type === 'dm') return;
                })
                .catch(error => {
                    console.error(`Could not send DM to ${message.author.tag}.\n`, error);
                    message.channel.send(`DM\'s for user ${message.author.tag} disabled.`);
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