module.exports = {
    name: 'prune',
    description: 'Prune up to 99 messages.',
    usage: '<number>',
    args: true,
    execute(message, args){
        const amount = parseInt(args[0]) + 1

        if (isNaN(amount)){
            return message.channel.send('Invalid number.');
        }
        else if(amount <= 1 || amount > 100){
            return message.channel.send('The number must be between 1 and 99 inclusive.');
        }
        else{
            message.channel.bulkDelete(amount, true).catch(err => {
                console.error(err);
                message.channel.send('There was an error when executing that command.');
            }) //Don't think that this catch is necessary 
        }
    },
};