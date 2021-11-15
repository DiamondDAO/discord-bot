const fs = require('fs');
const { initGuildData } = require('../getInitData.js')


module.exports = {
  name: 'guildCreate',
  once: true,
  async execute(guild) {
    console.log(`The client joined the guild ${guild}`); 
    const guildData = await initGuildData(guild);

    // Write data to file
    try {
      fs.writeFileSync(`./data/${guild.id}.json`, JSON.stringify(guildData));
      console.log(`Initial data from ${guild.name} written to ./data/${guild.id}.json`);
    }
    catch(error) {
      console.error("Failed to write initial data file")
    }



  },
};
