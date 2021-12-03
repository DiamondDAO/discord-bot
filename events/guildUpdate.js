const { writeData } = require('../toolbox.js')
const { Util } = require('discord.js');

module.exports = {
	name: 'guildUpdate',
	execute(oldGuild, newGuild) {

		const obj = {
			'id':newGuild.id,
			'oldGuild': Util.flatten(oldGuild),
			'newGuild': Util.flatten(newGuild)
		};

		let path = `guilds/${newGuild.id}`;
		writeData(obj, path, 'guildUpdate');



	},
};
