const { writeData } = require('../toolbox.js')
const { Util } = require('discord.js');

module.exports = {
	name: 'guildMemberUpdate',
	execute(oldMember, newMember) {

		const obj = {
			'id':newMember.id,
			'oldMember': Util.flatten(oldMember),
			'newMember': Util.flatten(newMember)
		};


		let path = `guilds/${newMember.guild.id}/members`;
		writeData(obj, path, 'guildMemberUpdate');

	},
};
