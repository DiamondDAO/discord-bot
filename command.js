const { prefix } = require('./config.json');

module.exports = (client, aliases, callback) => {

  // Convert any string passed as alias into an array
  if (typeof aliases === 'string') {
    aliases = [aliases];
  }

  // Set handlers
  client.on('message', message => {
    console.log("Got message")
    const { content } = message;

    aliases.forEach(alias => {
      console.log('in aliases')
      const command = `${prefix}${alias}`; // set each commmand string

      if (content.startsWith(`${command} `) || content === command) {
        console.log(`Running the command ${command}`);
        callback(message); // passes the callback the message object
      };
    });

  });

};
