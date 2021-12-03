const { writeEventToFile } = require('../toolbox.js');

module.exports = {
	name: 'guildMemberRemove',
	execute(member) {

    let path = `guilds/${member.guild.id}/members`;
		writeEventToFile(member, 'guildMemberRemove', path, 'user');


	},
};
