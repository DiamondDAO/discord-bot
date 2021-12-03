const { writeData } = require('../toolbox.js')
const { Util } = require('discord.js');

module.exports = {
	name: 'channelUpdate',
	execute(oldChannel, newChannel) {

		const obj = {
			'id':oldChannel.id,
			'oldChannel': Util.flatten(oldChannel),
			'newChannel': Util.flatten(newChannel)
		};

		let path = `guilds/${newChannel.guildId}/channels`;

		writeData(obj, path, 'channelUpdate');



	},
};
