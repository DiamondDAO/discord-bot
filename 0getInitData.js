const fs = require('fs');
const { Collection } = require('discord.js');
const circularKeys = ['guild', 'channels', 'channel', 'messages', 'message', 'mentions', 'reactions', 'ReactionManager'];
const cycle = require('./cycle.js');

// This function should run once whenever the bot joins a new server, to scrape all available data from that server.
const initGuildData = async (guild) => {



  //Discord JS returns Collection objects with circular referances.
  //Need to convert these into a single JSON to be returned

  // Function to fix circular objects


  // function to simplify objects for JSON strigification
  const flattenToJSON = (obj) => JSON.parse(JSON.stringify(JSON.decycle(obj)));
  console.log(JSON.stringify(JSON.decycle(guild)));


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
  let channelsHolder = [];
  let flatMessages = [];


  for (channelId in data.channels){
    const fetchedChannel = await guild.client.channels.fetch(data.channels[channelId]);
    channelsHolder.push(fetchedChannel);
    //channelsHolder[data.channels[channelId]] = flattenToJSON(fetchedChannel);

    // While each channel is under scrutiny, fetch, flatten, and insert the messages from that channel


    if (fetchedChannel.messages != undefined ){
       const fetchedMessages = await fetchMessages(fetchedChannel);
       fetchedMessages.forEach(message => {

         let messageFilled = message;

      /*   messageFilled.mentions = JSON.stringify(message.mentions, function replacer(key, value) {
           return (key == 'mentions' || key == 'message') ? undefined : value;
         }); */
         messageFilled.mentions = flattenToJSON(message.mentions);
         messageFilled.mentions = message.mentions;



         messageFilled = flattenToJSON(messageFilled);

                  //messageFilled.reactions = await message.reactions.cache;




         flatMessages.push(messageFilled);
         //flatMessages[message.id].mentions = flattenToJSON(message.mentions);

         //flatMessages[message.id].reactions = {};



         /*message.reactions.cache.forEach(async (reaction) => {


           //flatMessages[message.id].reactions[reaction.id] = flattenToJSON(reaction);

           // Fetch the list of users who reacted
           const fetchedReactionUsers = await reaction.users.fetch();


           // Load the users and emoji type into the message data
           if (fetchedReactionUsers != undefined){
             fetchedReactionUsers.forEach(user => flatMessages[message.id].reactions[reaction.id].users[user] = user)


           }
           flatMessages[message.id].reactions[reaction.id].emoji = flattenToJSON(reaction._emoji);

           // For testing

         }); */


         // This will load the message authordata:
         // flatMessages[message.id].author = flattenToJSON(message.author);

         // TODO:
         // Load Stickers
         // Load Attachments
         // Load Reactions

       });
    };
    // update the messages property of each channel in the constructed channelsHolder object
    //channelsHolder[data.channels[channelId]].messages = flatMessages;
  };

    // update the channels property of the constructed data object to include full data on each channel
    data.channels = channelsHolder;
    data.messages = flatMessages;



  // Get info on each member and nest it into the guild data

  let fetchedMembers = await guild.members.fetch();
  data.members = flattenToJSON(Object.fromEntries(fetchedMembers));

  for (member in data.members) {
    //data.members[member].user = flattenToJSON(await guild.client.users.fetch(member));
  }


  return data;


  // Write data to file
  //fs.writeFileSync(`./${guild.id}.json`, JSON.stringify(data))


}


module.exports = { initGuildData };
