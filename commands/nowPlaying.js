module.exports = {
    name: 'nowPlaying',
    aliases: ['np'],
    description: 'Outputs the name of the song/video that is currently playing through the bot.',
    execute: async (message, args) => {
        let player = message.client.player;
        let queue = player.getQueue(message.guild.id);

        if (!queue){
            return message.channel.send(`No songs are currently playing!`);
        }

        let song = await player.nowPlaying(message.guild.id);
        message.channel.send(`**Now Playing** - ${song.name}.`);
    }
}
