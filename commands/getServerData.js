const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const fs = require('fs');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('getdata')
    .setDescription('Returns JSON of Data'),
  async execute(interaction) {
    await interaction.reply('ok!');



  },
};
