const { writeData } = require('../toolbox.js')
const { Util } = require('discord.js');

module.exports = {
	name: 'channelUpdate',
	execute(oldChannel, newChannel) {


		let obj = Util.flatten(newChannel);
		obj["oldMember"] = Util.flatten(oldChannel);

		let path = `guilds/${newChannel.guildId}/channels`;

		writeData(obj, path, 'channelUpdate');



	},
};
