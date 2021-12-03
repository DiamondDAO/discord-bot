const { Util } = require('discord.js');
const { writeData } = require('../toolbox.js');

// Only executes on messages made after the client instance started.
module.exports = {
	name: 'messageReactionAdd',
	execute(messageReaction, user) {

    let obj = {
		'id': 'reaction', //todo: generate ID for reaction
		'message':messageReaction.message,
    'reaction' : Util.flatten(messageReaction),
    'user' : Util.flatten(user)};


		const path = `guilds/${messageReaction.message.guildId}/messages`;
		writeData(obj, path, 'messageReactionAdd');


	},
};
