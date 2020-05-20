const poker = require('poker');

module.exports = {
    name: 'poker',
    description: 'Starts a round of holdem with the mentioned players.',
    usage: '<player1, player2> [player3, ...]',
    args: true,
    adminOnly: true,
    execute(message, args){
        const table = new poker.Table({
            ante: 0,
            smallBlind: 10,
            bigBlind: 20
        })

        let players = new Map();

        if (message.mentions.members.size < 2){
            message.channel.send(`You need at least two players to play poker.`);
            return;
        }

        let i = 1;
        message.mentions.members.forEach((member, memberID) => {
            players.set(i, memberID);
            i++;
        })
        
        players.forEach((value, key) => table.sitDown(key, 1000))

        players.forEach((value, key) => message.channel.send(`Seat ${key} is held by member with ID ${value}`));
    }
}
