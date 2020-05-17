module.exports = {
    name: 'roll',
    description: 'Rolls the specified dice.',
    usage: '<num>d<sides>[expr]',
    args: true,
    execute(message, args){
        let expr = args.join('');
        let number = expr.split('d')[0];
        let sides = expr.split('d')[1].match(/[0-9]+/);
        let result = 0;

        expr = expr.split('d')[1].replace(/[0-9]+/, '');
        
        for (var i = 0; i < number; i++){
            result = result + Math.floor(1 + (Math.random() * sides));
        }
        
        result = eval(result.toString() + expr);

        message.channel.send(result);
    }
}
