module.exports = {
    name: 'testargs',
    description: 'Outputs arguments after the command.',
    usage: '<arg1> [, arg2, arg3, ...]',
    args: true,
    execute(message, args){     
        message.channel.send(`Arguments: ${args}`);
    },
};