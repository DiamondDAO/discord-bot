const { writeData } = require('../toolbox.js')
const { Util } = require('discord.js');

module.exports = {
	name: 'messageUpdate',
	execute(oldMessage, newMessage) {

		let obj = Util.flatten(newMessage);
		obj["oldMessage"] = Util.flatten(oldMessage);

		let path = `guilds/${newMessage.guildId}/messages`;

		writeData(obj, path, 'messageUpdate');



	},
};
