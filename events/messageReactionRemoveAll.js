const { writeEventToFile } = require('../toolbox.js');

// Only executes on messages made after the client instance started.
module.exports = {
	name: 'messageReactionRemoveAll',
	execute(message) {

		const path = `guilds/${messageReaction.message.guildId}/messages`;
    	writeEventToFile(message, 'messageReactionRemoveAll', path);

	},
};
