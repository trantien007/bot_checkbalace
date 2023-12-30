import TelegramBot from 'node-telegram-bot-api';
import bellAPI from './bellAPI.js';
import dotenv from 'dotenv';
dotenv.config();

const TOKEN = process.env.ACCESS_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/bell (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const ownerAddresses = match[1].split(' ');

  if (ownerAddresses.length < 1) {
    bot.sendMessage(chatId, 'Please provide at least one owner address after the command.');
    return;
  }

  bot.sendChatAction(chatId, 'typing');
  await bellAPI(chatId, ownerAddresses, bot);
});

bot.onText(/\/xrps (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const ownerAddresses = match[1].split(' ');

  if (ownerAddresses.length < 1) {
    bot.sendMessage(chatId, 'Please provide at least one owner address after the command.');
    return;
  }

  bot.sendChatAction(chatId, 'typing');
  await handleAPI(chatId, ownerAddresses, bot, 'xrps');
});
