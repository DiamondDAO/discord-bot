# discord-bot
A friendly bot to inject Discord data for community analysis.


Collects realtime data on a guild and its channels, roles, members, messages, and reactions.

Run "node index.js" to start the bot
connect the bot to a discord server with the following link:
https://discord.com/oauth2/authorize?client_id=895829003309568041&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A53134&response_type=code&scope=guilds%20guilds.members.read%20bot%20messages.read%20applications.commands

A notable limitation of the discord API is that this bot will only receive events for entities created after the bot joined the server. 

Note that this code assumes the following .env variables:
DISCORD_TOKEN // discord API token
AWS_BUCKET // destination bucket
EXPRESS_PORT // see index.js
