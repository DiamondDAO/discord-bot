const { Util } = require('discord.js');
const { writeData } = require('../toolbox.js');

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {

		let flat = Util.flatten(member);
		flat['roles'] = member.roles.cache;
    let path = `guilds/${member.guild.id}/members`;
		writeData(flat, path, '');

    flat = Util.flatten(member.user);
    path = `users`;
		writeData(flat, path, '');

	},
};
