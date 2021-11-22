const fs = require('fs');
const { initGuildData } = require('../getInitData.js');
const { Util, BitField } = require('discord.js')


module.exports = {
  name: 'guildCreate',
  once: true,
  async execute(guild) {

    console.log(`The client joined the guild ${guild}`);

    //// TODO: Only a single member remains after Util.flatten()
    //const fetchedGuildMembers = await guild.members.fetch();
    //flatGuildData.members = Util.flatten(fetchedGuildMembers);

    const mkdirs = (entities, path = '.') => {
      entities.forEach(
        entity => {
        if (!fs.existsSync(path + `/${entity}`)){
          fs.mkdirSync(path + `/${entity}`)
        }
        if (!fs.existsSync(path + `/${entity}/events`)){
          fs.mkdirSync(path + `/${entity}/events`)
        }});
    };

    // Function to write data to file named after a given attribute
    const writeData = async (data, path, uidAttribute = 'id') => {
        await fs.writeFile(
          `${path}/${data[uidAttribute]}.json`,
          JSON.stringify(data, (key, value) => typeof value === 'bigint' ? value.toString() : value),
          err => err != null ? console.log(err) : err // => null
        );
        console.log(`Data written to ${path}/${data[uidAttribute]}.json`);
      };

    // function to take data from a collection
    const outputCollectionRecords = (collection, directory, uidAttribute, callback) => {
      // For each object in the collection, flatten and write it to a JSON in <directory>
      collection.forEach( item => writeData(Util.flatten(item), directory, uidAttribute));
      // callback for retrieving data nested within this object
      if(callback != undefined){
          collection.forEach(item => callback(item));
      }
    };


    const guildDir = `./data/guilds/${guild.id}`;
    if (!fs.existsSync(guildDir)){
      fs.mkdirSync(guildDir);
    }



    const entities = ['channels', 'members', 'messages', 'threads', 'bans', 'roles', 'emojis'];
    mkdirs(entities, guildDir);
    let flatGuildData = Util.flatten(guild);
    writeData(flatGuildData, guildDir);



    // Messages and threads are both children of channels,
    // Create a function for each that will be used as a callback when gathering channels



    // Messages
    // Function to output all messages from a channel to /messages
    // TODO: impliment deepFetchMessages()
    const getChannelMessages = async channel => {
      if (channel.messages != undefined){ // verify that the channel has messages
        const fetchedMessages = await channel.messages.fetch();
        outputCollectionRecords(fetchedMessages, `${guildDir}/messages`);
      }
    };

    //Threads
    const getChannelThreads = async channel => {
      if (channel.threads != undefined){ // verify that the channel has messages
        console.log(channel.threads)
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
        member => outputCollectionRecords([member.user], './data/users')
      );

    // roles
      if (guild.roles != undefined){
        const fetchedRoles = await guild.roles.fetch();
        outputCollectionRecords(fetchedRoles, `${guildDir}/roles`);
      };

    // bans
      if (guild.emojis != undefined){
        const fetchedBans = await guild.bans.fetch();
        outputCollectionRecords(fetchedBans, `${guildDir}/bans`);
      };


    // emojis
      if (guild.emojis != undefined){
        const fetchedEmojis = await guild.emojis.fetch();
        outputCollectionRecords(fetchedEmojis, `${guildDir}/emojis`);
      };

    // stickers

      if (guild.stickers != undefined){
        const fetchedStickers = await guild.stickers.fetch();
        outputCollectionRecords(fetchedStickers, `${guildDir}/stickers`);
      };

    // stages
    /*
    Note: this code won't work, because the stageInstanceManager.fetch() function requries a passed ID of a stage channel.
    To impliment, this should run if a channel is found to be a stage channel when extracting channels.
    (could easily go with the thread extractor function)
      if (guild.stageInstances != undefined){
        const fetchedStageInstances = await guild.stageInstances.fetch();
        outputCollectionRecords(fetchedStageInstances, `${guildDir}/stageInstances`)
      };

      */

  },
};
