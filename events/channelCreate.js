const { writeEventToFile } = require('../toolbox.js')

module.exports = {
	name: 'channelCreate',
	execute(channel) {

		let path = `guilds/${channel.guildId}/channels`;
		writeEventToFile(channel, '', path);

	},
};
