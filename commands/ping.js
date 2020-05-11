module.exports = {
    name: 'ping',
    description: 'First test command.',
    execute(message, args){
        message.channel.send('This is a test message!');
    },
};