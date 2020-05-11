module.exports = {
    name: 'uptime',
    description: 'Outputs how long the bot has been running.',
    execute(message, args){
        let uptime = message.client.uptime;
        let uptimeSeconds = uptime / 1000;

        let hours = (uptimeSeconds / 3600);

        message.channel.send(`The bot has been running for ${uptimeSeconds}s \/ ${hours}h`)
    },
};