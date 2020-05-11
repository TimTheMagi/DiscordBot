module.exports = {
    name: 'flip',
    aliases: ['isaac'],
    description: 'Flips a coin.',
    execute(message, args){
        if (Math.random() < 0.5) message.channel.send('Heads!');
        else message.channel.send('Tails!');
    },
};