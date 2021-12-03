const { writeEventToFile } = require('../toolbox.js')

module.exports = {
	name: 'channelPinsUpdate',
	execute(channel, time) {

		let path = `guilds/${channel.guildId}/channels`;
		writeEventToFile(channel, 'channelPinsUpdate', path);

	},
};
