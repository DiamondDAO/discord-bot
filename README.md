# discord-bot
A friendly bot to inject Discord data for community analysis

Run "node index.js" to start the bot
connect the bot to a discord server with the following link:
https://discord.com/oauth2/authorize?client_id=895829003309568041&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A53134&response_type=code&scope=guilds%20guilds.members.read%20bot%20messages.read%20applications.commands

On connecting, the bot will fire the "join guild" event
This will trigger the server to make the JSON file, which is stored in the project directory.
