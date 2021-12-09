const { writeEventToFile } = require('../toolbox.js')
const { Util } = require('discord.js')


module.exports = {
	name: 'roleCreate',
	execute(role) {
		let obj = Util.flatten(role);
		obj['members'] = role.members
		let path = `guilds/${role.guild.id}/roles`;
		writeEventToFile(obj, '', path);

	},
};
