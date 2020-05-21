module.exports = {
    name: 'skip',
    aliases: ['s'],
    description: 'Skips the current song in the queue.',
    execute: async (message, args) => {
        let player = message.client.player;
        let queue = player.getQueue(message.guild.id);

        if (!queue){
            return message.channel.send(`There are no songs to skip!`);
        }

        let song = await player.skip(message.guild.id);
        message.channel.send(`"${song.name}" was skipped!`)
    }
}
