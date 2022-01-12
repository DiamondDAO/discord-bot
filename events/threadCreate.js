const { writeEventToFile } = require('../toolbox.js')

module.exports = {
	name: 'threadCreate',
	execute(thread) {

		let path = `guilds/${thread.guildId}/channels`;
		writeEventToFile(thread, '', path);

		

	},
};
