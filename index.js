
const fs = require('fs');

// Imports for discord Js
const { Client, Collection, Intents } = require('discord.js');
const token = process.env.DISCORD_TOKEN;

// Set express server
const express = require('express');
const port = process.env.EXPRESS_PORT;
const app = express();
app.get('/', (request, response) => {
	return response.sendFile('index.html', { root: '.' });
});
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));


// Create a new discord client instance
const clientIntents = [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS];
const client = new Client({ intents: clientIntents});
client.commands = new Collection();


// Load command files
// Currently empty but included for future implimentations
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// add key pair for the command to client.commands
	client.commands.set(command.data.name, command);
}

// Load event files
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

// Event Handler
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Interaction Handler
// Current implimentation does not have any interaction events defined, included for future implimentation.
 client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({content: 'There was an error while executing this command! Please check  input and try again.'});
	}
});

// Login to Discord with token
client.login(token);
