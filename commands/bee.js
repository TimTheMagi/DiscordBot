const fs = require('fs');

module.exports = {
    name: 'bee',
    description: 'Bee movie.',
    execute(message, args){
        fs.readFile("./bee movie.txt", (err, data) => {
            if (err){
                console.error(err);
                return
            }
            message.channel.send(data.toString(), {split: true});
        })
    },
};