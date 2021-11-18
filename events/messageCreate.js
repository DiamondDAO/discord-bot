// Get message and flatten to play nice with JSON.stringify
// Find the server and read in server file as object
// find the channel
// append message
// stringify the file back

const fs = require('fs');

module.exports = {
	name: 'messageCreate',
	async execute(message) {


		// Function to simplify objects for JSON strigification
		const flattenToJSON = (obj) => JSON.parse(JSON.stringify(obj, function replacer(key,value)
		{
			if (value==undefined) return undefined;
    	//else if (key=="privateProperty2") return undefined;
    	else return value;
		}));

		// Read guildData from file
		let guildData = JSON.parse(fs.readFileSync(`./data/${message.guildId}.json`));

		// Get Message Information
		//guildData.messages.push(message);
		/*guildData.channels[message.channelId][message.id] = flattenToJSON(message);


/*		// Get Messsage Sender
		//console.log(message.author)
		//console.log(JSON.stringify(message.author), (key, value) => {if (key = banner){return undefined}});

		//guildData.channels[message.channelId][message.id].author = flattenToJSON(message.author);
		console.log( guildData.channels[message.channelId][message.id].author);
*/


		// Get Message Mentions
		//guildData.channels[message.channelId][message.id].mentions = flattenToJSON(message.mentions);



		// No need to get message reactions, since this is a new message.


		fs.writeFileSync(`./data/${message.guildId}.json`, JSON.stringify(guildData, function replacer(key, value) { return value}));






	},
};
