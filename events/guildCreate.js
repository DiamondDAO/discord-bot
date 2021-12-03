
const { Util, Collection } = require('discord.js')
const { writeData, outputCollectionRecords } = require('../toolbox.js')


module.exports = {
  name: 'guildCreate',
  once: true,
  async execute(guild) {

    console.log(`The client joined the guild ${guild}`);

    // Create Guild Directory

    const guildDir = `guilds/${guild.id}`;


    // Output initial Guild file
    let flatGuildData = Util.flatten(guild);
    const fetchedGuildMembers = await guild.members.fetch();

    flatGuildData['members'] = Array.from(fetchedGuildMembers.keys());
    writeData(flatGuildData, guildDir);


    // Messages and threads are both children of channels, so they need to be fetched within fetchedMembers
    // Function to get historical messages
      async function deepMessageFetch(channel, limit = 10000) {
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

        const getChannelMessages = async channel => {
          if (channel.messages != undefined){ // verify that the channel has messages
            const fetchedMessages = await deepMessageFetch(channel);
            outputCollectionRecords(fetchedMessages, `${guildDir}/messages`);
          }
        };

    //Threads
    const getChannelThreads = async channel => {
      if (channel.threads != undefined){ // verify that the channel has messages
        const fetchedThreads = await channel.threads.fetch();
        if (fetchedThreads.threads != undefined ){
          outputCollectionRecords(fetchedThreads.threads, `${guildDir}/channels`, 'id', getChannelMessages);
          // note that this implimentation sends threads to /channels.
          // This is because threads are treated like channels, and thread messages list thier parent thread under 'channelId'
          // use the getChannelMessages callback to get messages from the thread as well
        }

      }
    };


    // create a callback function to execute both messages and threads when fetching channels
    const combinedCallback = channel => {getChannelMessages(channel); getChannelThreads(channel)}


    // output channels, and for each channel use getChannelMessages as a callback
    const fetchedChannels = await guild.channels.fetch();
    outputCollectionRecords(fetchedChannels, `${guildDir}/channels`, 'id', combinedCallback);


    // members
        const fetchedMembers = await guild.members.fetch();
        outputCollectionRecords(fetchedMembers, `${guildDir}/members`, 'user',
        member => outputCollectionRecords([member.user], 'users')
      );

    // roles
      if (guild.roles != undefined){
        const fetchedRoles = await guild.roles.fetch();
        outputCollectionRecords(fetchedRoles, `${guildDir}/roles`);
      };

    // Future implimentations may include Bans, Roles, Emojis, and ScheduledEvents

  },
};
