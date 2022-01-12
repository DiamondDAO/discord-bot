const { Util } = require('discord.js');
const { writeData } = require('../toolbox.js');

// Only executes on messages made after the client instance started.
module.exports = {
	name: 'messageReactionAdd',
	execute(messageReaction, user) {

		function generateUID(stringInt1, stringInt2){
			let int1 = parseInt(stringInt1);
			let int2 = parseInt(stringInt2);
			let average = (int1 + int2)/2;
			return average;
		}

	let obj = Util.flatten(messageReaction);
                let reactionId = generateUID(user.id, messageReaction.message.id);
				
                obj['id'] = reactionId;
                obj['fetchedOnBotJoin'] = false;
                obj['user'] = user.id;
                obj['reactionEmoji'] = messageReaction._emoji['name'];

		const path = `guilds/${messageReaction.message.guildId}/reactions`;
		writeData(obj, path, '');


	},
};
