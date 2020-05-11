module.exports = {
    name: 'yeet',
    description: 'Sends user to a random channel.',
    usage: '<user>',
    args: true,
    execute(message, args){
        if (message.mentions.members.size){
            const toYeet = message.mentions.members.first();
            const channels = message.guild.channels.cache.filter(channel => channel.type === 'voice');

            let items = Array.from(channels);

            let randomVC = items[Math.floor(Math.random() * items.length)];

            while (randomVC[0] === toYeet.voice.channelID){
                randomVC = items[Math.floor(Math.random() * items.length)];
            }

            toYeet.voice.setChannel(randomVC[1]);
        }
    },
};