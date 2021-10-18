const { mkdir } = require('fs')
module.exports = {
  name: 'guildCreate',
  once: true,
  execute(guild) {
    console.log(`The client joined the guild ${guild}`);
    mkdir(`./guilds/${guild.id}`, { recursive: true }, (err) => {
      if (err) throw err;
      });
  },
};
