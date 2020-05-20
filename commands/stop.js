module.exports = {
    name: 'stop',
    description: 'Stops the bot.',
    execute: async (message, args) => {
        message.client.player.stop(message.guild.id).then(() => {
            message.channel.send(`Song stopped successfully.`);
        })
        .catch(err => {
            if (err === 'Not playing'){
                message.channel.send(`There are no songs playing.`);
            }
            else{
                message.channel.send('Unknown error: contact Tim to check console.');
                console.log(err);
            }
        })
    }
};
