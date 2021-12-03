// a chunk of members joined a guild
const { Util } = require('discord.js');
const { writeEventToFile, writeData } = require('../toolbox.js');


module.exports = {
	name: 'guildMembersChunk',
	execute(members, guild) {

    let path = `guilds/${guild.guildId}`;

    members.forEach( (member) => {

      let flat = Util.flatten(member);
      let path = `guilds/${member.guildId}/members`;
  		writeData(flat, path);

      flat = Util.flatten(member.user);
      path = `users`;
  		writeData(flat, path);

    });

		writeEventToFile(guild, 'guildMembersChunk', path);


	},
};
