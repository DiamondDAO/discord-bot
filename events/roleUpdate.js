const { writeData } = require('../toolbox.js')
const { Util } = require('discord.js');

module.exports = {
	name: 'roleUpdate',
	execute(oldRole, newRole) {


		let oldRoleFilled = Util.flatten(oldRole);
		oldRoleFilled['members'] = oldRole.members

		let obj = Util.flatten(newRole);
		obj["oldRole"] = oldRoleFilled;
		obj["members"] = newRole.members

		let path = `guilds/${newRole.guild.id}/roles`;

		writeData(obj, path, 'roleUpdate');
	},
};
