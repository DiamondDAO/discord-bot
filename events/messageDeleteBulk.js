const { Util } = require('discord.js');
const { writeData } = require('../toolbox.js');

// Only executes on messages made after the client instance started.
module.exports = {
	name: 'messageDelete',
	execute(messages) {

    if (Array.isArray(messages)){
    messages.forEach((message) => {

      let flat = Util.flatten(message);
  		flat.mentions = Util.flatten(message.mentions); // capture the message mentions

  		const path = `guilds/${message.guildId}/messages`;
  		writeData(flat, path, 'messageDelete');

    })}
    else {
      let flat = Util.flatten(messages);
  		flat.mentions = Util.flatten(messages.mentions); // capture the message mentions

  		const path = `guilds/${messages.guildId}/messages`;
  		writeData(flat, path, 'messageDelete');

    }

	},
};
