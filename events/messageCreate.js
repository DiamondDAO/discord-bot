const { Util } = require('discord.js');
const { writeData } = require('../toolbox.js');

module.exports = {
	name: 'messageCreate',
	async execute(message) {

		let flatMessage = Util.flatten(message);
		flatMessage["mentions"] = Util.flatten(message.mentions); // capture the message mentions

		const path = `guilds/${message.guildId}/messages`
		writeData(flatMessage, path, '');

	},
};
