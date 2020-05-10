module.exports = {
    name: 'testargs',
    description: 'Command to output args.',
    execute(message, args){
        if (!args.length){
            return message.channel.send(`Err: no arguments provided!`);
        }
        
        message.channel.send(`Arguments: ${args}`);
    },
};