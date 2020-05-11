module.exports = {
    name: 'stop',
    description: 'Stops the bot.',
    execute(message, args){
        console.log('Stop command received.');
        message.client.destroy();
    },
};