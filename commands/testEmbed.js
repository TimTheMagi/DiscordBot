const Discord = require('discord.js');

module.exports = {
    name: 'testembed',
    description: 'Testing embed.',
    adminOnly: true,
    execute(message, args){     
        const embed = new Discord.MessageEmbed()
            .setAuthor('WiosnaTest')
            .setDescription('Just testing some embeds.')
            .setImage(message.author.displayAvatarURL({format: "png", dynamic: true}));

        message.channel.send(embed);
    },
};
