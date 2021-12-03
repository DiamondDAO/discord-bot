const { writeData } = require('../toolbox.js')
const { Util } = require('discord.js');

module.exports = {
	name: 'messageUpdate',
	execute(oldMessage, newMessage) {

		const obj = {
			'id':newMessage.id,
			'oldMessage': Util.flatten(oldMessage),
			'newMessage': Util.flatten(newMessage)
		};

		let path = `guilds/${newMessage.guildId}/messages`;

		writeData(obj, path, 'messageUpdate');



	},
};
