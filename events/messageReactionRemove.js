const { Util } = require('discord.js');
const { writeData } = require('../toolbox.js');

// Only executes on messages made after the client instance started.
module.exports = {
	name: 'messageReactionRemove',
	execute(messageReaction, user) {

    let obj = {
		'id': 'reaction', //todo: generate ID for reaction
		'message':messageReaction.message,
		'emoji':messageReaction.emoji,
    'reaction' : Util.flatten(messageReaction),
    'user' : Util.flatten(user),
		'deleted' : true
	};


		const path = `guilds/${messageReaction.message.guildId}/reactions`;
		writeData(obj, path, 'messageReactionRemove');

	},
};
