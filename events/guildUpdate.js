const { writeData } = require('../toolbox.js')
const { Util } = require('discord.js');

module.exports = {
	name: 'guildUpdate',
	execute(oldGuild, newGuild) {

		let obj = Util.flatten(newGuild);
		obj["oldGuild"] = Util.flatten(oldGuild);

		let path = `guilds/${newGuild.id}`;
		writeData(obj, path, 'guildUpdate');



	},
};
