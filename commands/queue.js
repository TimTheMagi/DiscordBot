module.exports = {
    name: 'queue',
    aliases: ['q'],
    description: 'Lists the songs currently in the queue.',
    execute: async (message, args) => {
        let queue = message.client.player.getQueue(message.guild.id);

        if (!queue){
            return message.channel.send(`The queue is empty.`);
        }

        //TODO: Add duration of song to the queue list.
        let data = [];
        let index = 1;
        for (song of queue.songs){
            var date = new Date(null);
            date.setSeconds(song.duration / 100);
            data.push(`**${index}** - ${song.name} (${date.toISOString().substr(11,8)})`);
            index++;
        }

        return message.channel.send(data);
    }
}
