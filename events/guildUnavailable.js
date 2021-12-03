// Emitted whenever a guild becomes unavailable, likely due to a server outage.
// a guild was delted/the client left a guild
const { writeEventToFile } = require('../toolbox.js');


module.exports = {
	name: 'guildUnavailable',
	execute(guild) {

    let path = `guilds/${guild.guildId}`;
		writeEventToFile(guild, 'guildUnavailable', path);


	},
};
