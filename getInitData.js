const fs = require('fs');
const { token } = require('./config.json')
const util = require('util')
const { Collection } = require('discord.js');

// This function should run once whenever the bot joins a new server, to scrape all available data from that server.
const initGuildData = async (guild) => {

  //Discord JS returns Collection objects with circular referances.
  //Need to convert these into a single JSON to be returned

  // function to simplify objects for JSON strigification
  const flattenToJSON = (obj) => JSON.parse(JSON.stringify(obj));

  // From basic Guild data, Create the data object which will eventually be exported as JSON.
  // To fill data, need to call discordjs methods for each type of thing.
  let data = flattenToJSON(guild)

  // Function to get historical messages
  async function fetchMessages(channel, limit = 10000) {
  if (!channel) {
    throw new Error(`Expected channel, got ${typeof channel}.`);
  }
  if (limit <= 100) {
    return channel.messages.fetch({ limit });
  }

  let collection = new Collection();
  let lastId = null;
  let options = {};
  let remaining = limit;

  while (remaining > 0) {
    options.limit = remaining > 100 ? 100 : remaining;
    remaining = remaining > 100 ? remaining - 100 : 0;

    if (lastId) {
      options.before = lastId;
    }

    let messages = await channel.messages.fetch(options);

    if (!messages.last()) {
      break;
    }

    collection = collection.concat(messages);
    lastId = messages.last().id;
  }

  return collection;
};



  // Get info on each channel and nest it into the guild data

  // data.channels is a list of ID's of channels.
  // For each, fetch the actual data on the channel and add it to the channelsHolder object
  let channelsHolder = {};


  for (channelId in data.channels){
    const fetchedChannel = await guild.client.channels.fetch(data.channels[channelId]);
    channelsHolder[data.channels[channelId]] = flattenToJSON(fetchedChannel);

    // While each channel is under scrutiny, fetch, flatten, and insert the messages from that channel
    let flatMessages = {};

    if (fetchedChannel.messages != undefined ){
       const fetchedMessages = await fetchMessages(fetchedChannel);
       fetchedMessages.forEach(message => flatMessages[message.id] = flattenToJSON(message));
    };
    // update the messages property of each channel in the constructed channelsHolder object
    channelsHolder[data.channels[channelId]].messages = flatMessages;
  };

    // update the channels property of the constructed data object to include full data on each channel
    data.channels = channelsHolder;



  // Get info on each member and nest it into the guild data

  let fetchedMembers = await guild.members.fetch();
  data.members = flattenToJSON(Object.fromEntries(fetchedMembers));

  for (member in data.members) {
    data.members[member].user = flattenToJSON(await guild.client.users.fetch(member));
  }


  return data;


  // Write data to file
  //fs.writeFileSync(`./${guild.id}.json`, JSON.stringify(data))


}


module.exports = { initGuildData };
