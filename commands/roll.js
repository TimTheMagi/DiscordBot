const math = require('mathjs');
var usage = '<num>d<sides>[expr]';

module.exports = {
    name: 'roll',
    description: 'Rolls the specified dice.',
    usage: usage,
    args: true,
    execute(message, args){
        //TODO: Handle multiple dice in one command.
        let expr = args.join('');
        let result = 0;
        try{
            if (!expr.match(/.+d.+/)){
                console.log('Not a valid format.');
                throw 'Bad roll command input.';
            }
            let number = expr.split('d')[0];
            let sides = expr.split('d')[1].match(/[0-9]+/);

            expr = expr.split('d')[1].replace(/[0-9]+/, '');
            
            for (var i = 0; i < number; i++){
                result = result + Math.floor(1 + (Math.random() * sides));
            }
            result = math.evaluate(result.toString() + expr);
        }
        catch (err){
            result = `Please input a valid argument in the format: ${usage}`;
            console.log(err);
        }
        message.channel.send(result);
    }
}
