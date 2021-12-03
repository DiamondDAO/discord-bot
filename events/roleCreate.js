const { writeEventToFile } = require('../toolbox.js')

module.exports = {
	name: 'roleCreate',
	execute(role) {

		let path = `guilds/${role.guild.id}/roles`;
		writeEventToFile(role, 'roleCreate', path);

	},
};
