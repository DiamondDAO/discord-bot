const { Util } = require('discord.js');
const { writeData } = require('../toolbox.js');


module.exports = {
	name: 'channelDelete',
	execute(channel) {

	  let flat = Util.flatten(channel);
    let path = `guilds/${channel.guildId}/channels/events`;
		writeData(flat, path, 'channelDelete');

	},
};
