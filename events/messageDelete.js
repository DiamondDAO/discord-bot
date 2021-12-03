const { Util } = require('discord.js');
const { writeData } = require('../toolbox.js');

// Only executes on messages made after the client instance started.
module.exports = {
	name: 'messageDelete',
	execute(message) {

		let flat = Util.flatten(message);
		flat.mentions = Util.flatten(message.mentions); // capture the message mentions

		const path = `guilds/${message.guildId}/messages/events`;
		writeData(flat, path, 'messageDelete');


	},
};
