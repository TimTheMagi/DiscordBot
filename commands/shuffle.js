module.exports = {
    name: 'shuffle',
    description: 'Sends all users to a random channel.',
    execute(message, args){
        const channels = message.guild.channels.cache.filter(channel => channel.type === 'voice');

        for (const [channelID, channel] of channels){
            for (const [memberID, member] of channel.members){
                let items = Array.from(channels);

                let randomVC = items[Math.floor(Math.random() * items.length)];
    
                while (randomVC[0] === member.voice.channelID){
                    randomVC = items[Math.floor(Math.random() * items.length)];
                }
                //member.voice.setChannel(randomVC);
                console.log(`Sending ${member.user.username} to ${randomVC[1].name}`);
            }
        }
    },
};