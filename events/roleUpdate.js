const { writeData } = require('../toolbox.js')
const { Util } = require('discord.js');

module.exports = {
	name: 'roleUpdate',
	execute(oldRole, newRole) {

		const obj = {
			'id':newRole.id,
			'oldRole': Util.flatten(oldRole),
			'newRole': Util.flatten(newRole)
		};


		let path = `guilds/${newRole.guild.id}/roles`;

		writeData(obj, path, 'roleUpdate');



	},
};
