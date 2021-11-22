const fs = require('fs')

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {

    console.log(`Ready! Logged in as ${client.user.tag}`);

    // Initialize direcories
    const topLevelDirectories = ['bot', 'users', 'guilds']
    topLevelDirectories.forEach( directoryName => {
      if (!fs.existsSync(`./data/${directoryName}`)) {
        fs.mkdirSync(`./data/${directoryName}`);
        console.log(`Initialized ${directoryName} directory at ./data/${directoryName}`);

      };
    });
  },
};
