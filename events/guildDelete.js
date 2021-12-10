// a guild was delted/the client left a guild
const { writeEventToFile } = require('../toolbox.js');

module.exports = {
	name: 'guildDelete',
	execute(guild) {

    let path = `guilds/guildEvents`;
		writeEventToFile(guild, 'guildDelete', path);


	},
};
