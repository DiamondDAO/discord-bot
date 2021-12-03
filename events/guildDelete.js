// a guild was delted/the client left a guild
const { writeEventToFile } = require('../toolbox.js');

module.exports = {
	name: 'guildDelete',
	execute(guild) {

    let path = `guilds/${guild.id}`;
		writeEventToFile(guild, 'guildDelete', path);


	},
};
