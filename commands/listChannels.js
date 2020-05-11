module.exports = {
    name: 'listchannels',
    description: 'Returns the ID of all channels in the server.',
    execute(message, args){     
        const guild = message.guild;

        const channels = guild.channels.cache;
        const data = [];

        channels.forEach(channel => {
            data.push(`${channel.name} : ${channel.id} - ${channel.type}`);
        })

        message.channel.send(data, {split: true});
    },
};