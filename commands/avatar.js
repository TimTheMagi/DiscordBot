const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    aliases: ['icon', 'pfp'],
    usage: '[user]',
    description: 'Get the profile image for the specified user. If no users are specified, gets the profile image of the user that called the command.',
    execute(message, args){
        const embed = new Discord.MessageEmbed();
        let user;

        if (!message.mentions.users.size){
            user = message.author;
        }
        else{
            user = message.mentions.users.first();
        }

        embed.setAuthor(`${user.username}'s avatar`, message.client.user.displayAvatarURL({format: "png", dynamic: true}));
        embed.setImage(user.displayAvatarURL({format: "png", dynamic: true}));

        message.channel.send(embed);
    },
};