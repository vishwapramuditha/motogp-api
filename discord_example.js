/**
 * MotoGP Discord Bot Example
 * 
 * This script demonstrates how a Discord bot can fetch data from your new API.
 * 
 * Pre-requisites:
 * 1. npm install discord.js axios
 * 2. Get your Bot Token from Discord Developer Portal
 */

// const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
// const axios = require('axios');

// const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });
// const API_URL = 'https://your-site-url.com/api'; // URL to your deployed site

// client.on('messageCreate', async message => {
//     if (message.content === '!nextrace') {
//         try {
//             // Fetch data from YOUR STATIC API (no key needed)
//             const response = await axios.get(`${API_URL}/schedule.json`);
//             const races = response.data;

//             // Find next race
//             const nextRace = races.find(r => new Date(r.date) > new Date()) || races[0];

//             // Create Embed
//             const embed = new EmbedBuilder()
//                 .setTitle(`🏁 Next Race: ${nextRace.grand_prix}`)
//                 .setDescription(`Get ready for the action at ${nextRace.circuit}!`)
//                 .addFields(
//                     { name: 'Date', value: nextRace.date },
//                     { name: 'Round', value: nextRace.round.toString() }
//                 )
//                 .setColor('#FF0000');

//             message.reply({ embeds: [embed] });

//         } catch (error) {
//             console.error(error);
//             message.reply('Could not fetch race data. API might be down.');
//         }
//     }
// });

// client.login('YOUR_DISCORD_BOT_TOKEN');

console.log("This is an example script. Uncomment the code to run it with a real bot token.");
