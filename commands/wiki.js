const https = require('https');
const Discord = require('discord.js');

module.exports = {
    name: 'wiki',
    aliases: [wikipedia],
    description: 'Search wikipedia for an article and outputs the opening paragraph.',
    usage: '<subject>',
    args: true,
    execute(message, args){
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
                    let article = content[key].extract.replace(/\n/gi, '\n\n');

                    chunks = article.match(/([\s\S]{1,2048})/g);
                    for (chunk of chunks){
                        try {
                            embed.setColor('#0099ff');
                            embed.setDescription(chunk);
                            embed.setTitle(content[key].title)
                            embed.setURL(wikilink + key);
                            embed.setThumbnail(content[key].thumbnail.source);
                        } catch (error) {
                            console.log(error);
                            console.log(query);
                        }

                        message.channel.send(embed);
                    }

                }
            })
        })
    },
};