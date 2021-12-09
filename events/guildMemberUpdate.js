const { writeData } = require('../toolbox.js')
const { Util } = require('discord.js');

module.exports = {
	name: 'guildMemberUpdate',
	execute(oldMember, newMember) {

		let obj = Util.flatten(newMember);
		obj["oldMember"] = Util.flatten(oldMember);
		obj["roles"] = newMember.roles.cache;
		obj["id"] = newMember["user"];


		let path = `guilds/${newMember.guild.id}/members`;
		writeData(obj, path, 'guildMemberUpdate');

	},
};
