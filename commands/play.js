const {Player} = require('discord-player');

module.exports = {
    name: 'play',
    aliases: ['p'],
    description: 'Searches YouTube for the first result and plays it in your current voice channel.',
    usage: '<search term>',
    args: true,
    execute: async (message, args) =>{
        let member = message.member;

        if (!member.voice.channelID){
            return message.channel.send(`User ${member.user.username} is not connected to any voice channel.`)
        }

        let toSearch = args.join(' ');

        message.client.player.play(member.voice.channel, toSearch).then((song) => {
            message.channel.send(`Now playing ${song.name}!`);
        }).catch((err) => {
            message.channel.send(`No song found for ${toSearch}`);
        });
    }
}
