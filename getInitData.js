const fs = require('fs');
const { Collection } = require('discord.js'); // needed for deepFetchMessages
const cycle = require('./cycle.js'); // needed for JSON.decycle() (removes circular links for stringify)

// This function should run once whenever the bot joins a new server, to scrape all available data from that server.
const initGuildData = async (guild) => {

  //Discord JS returns Collection objects with circular referances.
  //Need to convert these into a single JSON to be returned
  //Cycle.js provides JSON.decycle, which allows for This

  // Currently doesn't return stickers or attachments


  // From basic Guild data, Create the data object which will eventually be exported as JSON.
  // To fill data, need to call discordjs methods for each type of thing.
  let data = JSON.decycle(guild);




  // Function to get historical messages
  // Note default limit of 10000
  async function deepFetchMessages(channel, limit = 10000) {
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


// ———— Fetch and Fill Channels ————
  const fetchedChannels = await guild.channels.fetch();
  // Decycle the fetchedChannels map object and
  let channels = [];
  fetchedChannels.forEach(channel => channels.push(JSON.decycle(channel)));
  data.channels = channels;





//  ———— Fetch and Fill Members ————
  // This also fills userdata, thanks to JSON.decycle()
  const fetchedMembers = await guild.members.fetch();
  let members = Array.from(fetchedMembers, member => JSON.decycle(member));
  data.members = members;




  // ———— Fetch and Fill Messages ————
    // Fills mentions, thanks again to JSON.decycle()
  messages = []; // Array to hold message data
  for (i in data.channels) {
    if (data.channels[i].messages != undefined){
      const fetchedChannel = await guild.channels.fetch(data.channels[i].id);
      //const fetchedMessages = await fetchedChannel.messages.fetch();
      // Testing the deep fetch:
      const fetchedMessages = await deepFetchMessages(fetchedChannel);


      fetchedMessages.forEach(fetchedMessage => {
        // Save decycled message so that it's attributes can be modified
        let message = JSON.decycle(fetchedMessage);
        message.reactions = []; // replace the reactions attribute with an empty array to add to

        // Fetch reactions and add each to message.reactions
        const fetchedReactions = fetchedMessage.reactions.cache;
        fetchedReactions.forEach(fetchedReaction => message.reactions.push(JSON.decycle(fetchedReaction)));

        // Finally, push this message to the message array
        messages.push(JSON.decycle(message));
      });
    };
  };
  // add the message attribute to "data" and assign it the array of message data
  data.messages = messages;


  return data; // TODO: Test if this can go without
}



module.exports = { initGuildData };
