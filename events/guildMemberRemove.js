const { writeEventToFile } = require('../toolbox.js');

module.exports = {
	name: 'guildMemberRemove',
	execute(member) {

    let path = `guilds/${member.guildId}/members`;
		writeEventToFile(member, 'guildMemberRemove', path, 'user');


	},
};
