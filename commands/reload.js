module.exports = {
    name: 'reload',
    description: 'Reloads a command from disk.',
    usage: '<command>',
    adminsOnly: true,
    args: true,
    execute: async (message, args) => {
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
        if (!command){
            return message.channel.send(`There is no command with name or alias ${commandName}`);
        }

        delete require.cache[require.resolve(`./${command.name}.js`)];

        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`Reload of command ${command.name} successful!`);
        } catch (error) {
            console.log(error);
            message.channel.send(`There was an error when reloading command ${command.name}`);
        }
    }
}
