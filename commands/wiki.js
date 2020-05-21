const https = require('https');
const Discord = require('discord.js');

module.exports = {
    name: 'wiki',
    aliases: ['wikipedia'],
    description: 'Search wikipedia for an article and outputs the opening paragraph.',
    usage: '<subject>',
    args: true,
    cooldown: 10,
    execute: async (message, args) => {
        let query = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=pageimages%7Cextracts&pithumbsize=200&exintro&explaintext&redirects=1&titles=';

        let wikilink = 'https://en.wikipedia.org/?curid=';
        
        for (const [i, value] of args.entries()){
            query = query + value;
            if (i === Array.length - 1){
                query = query + '%20';
            }
        }

        https.get(query, response => {
            let data = '';
            let content = '';

            response.on('data', chunk => {
                data += chunk;
            })

            response.on('end', () => {
                let embed = new Discord.MessageEmbed()
                    .setFooter('From Wikipedia, the free encyclopedia', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/200px-Wikipedia-logo-v2.svg.png');

                content = JSON.parse(data).query.pages;
                for (key in content){
                    let article;
                    let thumbnail;
                    try{
                        article = content[key].extract.replace(/\n/gi, '\n\n');
                        if (article.includes("may refer to:")){
                            content[key].title += ' (disambiguation)';
                        }
                    }
                    catch (err){
                        console.log(err);
                        console.log(query);
                        embed.setColor('#ff0000');
                        embed.setDescription(`There was an error searching for ${args.join(' ')}.
                        \nMany pages will not appear unless spelled properly with proper capitalization.
                        \nCheck your spelling and contact Tim if problem persists.`);
                        return message.channel.send(embed);
                    }
                    try {
                        thumbnail = content[key].thumbnail.source;
                    }
                    catch (e){
                        thumbnail = null;
                    }
                    try{
                        //Split the input into chunks that will fit in a MessageEmbed
                        chunks = article.match(/([\s\S]{1,2048}(\s+|$))/g);
                        for (chunk of chunks){
                            embed.setColor('#0099ff');
                            embed.setDescription(chunk);
                            embed.setTitle(content[key].title)
                            embed.setURL(wikilink + key);
                            if (thumbnail) embed.setThumbnail(thumbnail);
                            message.channel.send(embed);
                        }
                        
                    }
                    catch (error){
                        console.log(error);
                        embed.setColor('#ff0000');
                        embed.setDescription(`There was an unknown error searching for ${args.join(' ')}.
                        \nContact Tim with your search term.`);
                        message.channel.send(embed);
                        //console.log(query);
                    }
                }
            })
        })
    },
}
