require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Parse the list of channel IDs from .env
const TARGET_CHANNEL_IDS = process.env.CHANNEL_IDS
  ? process.env.CHANNEL_IDS.split(',').map(id => id.trim())
  : [];

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log(`Watching channels: ${TARGET_CHANNEL_IDS.join(', ')}`);
});

client.on('messageCreate', async (message) => {
  // Ignore bot's own messages
  if (message.author.bot) return;

  if (TARGET_CHANNEL_IDS.includes(message.channel.id)) {
    try {
      await message.react('✅');
      await message.react('❌');
    } catch (err) {
      console.error('Error reacting to message:', err);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
