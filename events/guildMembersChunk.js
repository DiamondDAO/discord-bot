// a chunk of members joined a guild
const { Util } = require('discord.js');
const { writeEventToFile, writeData } = require('../toolbox.js');


module.exports = {
	name: 'guildMembersChunk',
	execute(members, guild) {

    let path = `guilds/${guild.id}`;

		writeEventToFile(guild, 'guildMembersChunk', path);


	},
};
