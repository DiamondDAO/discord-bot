const { writeEventToFile } = require('../toolbox.js');

module.exports = {
	name: 'roleDelete',
	execute(role) {

		const path = `guilds/${role.guild.id}/roles`;
    writeEventToFile(role, 'roleDelete', path)

	},
};
