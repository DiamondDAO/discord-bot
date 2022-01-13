// a chunk of members joined a guild
const { Util } = require('discord.js');
const { writeEventToFile, writeData } = require('../toolbox.js');


module.exports = {
	name: 'guildMembersChunk',
	execute(members, guild) {

	if (Array.isArray(members)){ // only fire if an array of members is added
    let path = `guilds/${guild.id}`;
	writeEventToFile(guild, 'guildMembersChunk', path);

	}


	},
};
