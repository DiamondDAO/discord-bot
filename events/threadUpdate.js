const { writeData } = require('../toolbox.js')
const { Util } = require('discord.js');

module.exports = {
	name: 'threadUpdate',
	execute(oldThread, newThread) {


		let obj = Util.flatten(newThread);
		obj["oldMember"] = Util.flatten(oldThread);

		let path = `guilds/${newThread.guildId}/channels`;

		writeData(obj, path, 'threadUpdate');



	},
};
