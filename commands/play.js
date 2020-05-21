const {Player} = require('discord-player');

module.exports = {
    name: 'play',
    aliases: ['p'],
    description: 'Searches YouTube for the first result and plays it in your current voice channel.',
    usage: '<search term>',
    args: true,
    execute: async (message, args) => {
        let member = message.member;
        let guild = message.guild;
        let queue = message.client.player.getQueue(guild.id);

        if (!member.voice.channelID){
            return message.channel.send(`User ${member.user.username} is not connected to any voice channel.`)
        }

        let toSearch = args.join(' ');

        if (!queue){
            message.client.player.play(member.voice.channel, toSearch, member.user).then((song) => {
                return message.channel.send(`Now playing ${song.name}!`);
            }).catch((err) => {
                return message.channel.send(`No song found for ${toSearch}`);
            });
        }
        else{
            message.client.player.addToQueue(guild.id, toSearch, member.user).then((song) => {
                return message.channel.send(`${song.name} has been added to the queue.`)
            }).catch((err) => {
                return message.channel.send(`Error: ${err}`);
            })
        }
    }
}
