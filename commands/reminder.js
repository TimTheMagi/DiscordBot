module.exports = {
    name: 'reminder',
    description: 'Sets a reminder for the specified time.',
    usage: '<time> [mention] [message]',
    args: true,
    execute: async (message, args) => {
        let mentionsArr = args.filter(arg => arg.match(/\<\@.+\>/));
        args = args.filter(arg => !arg.match(/\<\@.+\>/));
        
        try{
            let time = args[0];
            let minutes = time.match(/[0-9]+(m|M)/)[0].slice(0, -1);
            let seconds = time.match(/[0-9]+(s|S)/)[0].slice(0, -1);
            let hours = time.match(/[0-9]+(h|H)/)[0].slice(0, -1);

            console.log(seconds);

            time = (seconds * 1000) + (minutes * 60000) + (hours * 3600000);
            message.channel.send(`Reminding you in ${hours}H:${minutes}M:${seconds}S.`);

            setTimeout(() => message.reply('Reminding'), time);
        }
        catch (err){
            console.log(err);
        }
    }
}
