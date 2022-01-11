const { Util } = require('discord.js');
const { writeData } = require('../toolbox.js');


module.exports = {
	name: 'threadDelete',
	execute(thread) {

		let flat = Util.flatten(thread);
    	let path = `guilds/${thread.guildId}/channels`;
		writeData(flat, path, 'threadDelete');

	},
};
