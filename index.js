import TelegramBot from "node-telegram-bot-api";
import bellAPI from "./bellAPI.js";
import dotenv from "dotenv";
import xrpsAPI from "./xrpsAPI.js";
import bellDeployAPI from "./bellDeployAPI.js";
import drc20API from "./drc20API.js";
import coingeckoAPI from "./coingeckoAPI.js";
dotenv.config();

const TOKEN = process.env.ACCESS_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/drc20 (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const ownerAddresses = match[1].split(" ");

  if (ownerAddresses.length < 1) {
    bot.sendMessage(
      chatId,
      "Please provide at least one owner address after the command."
    );
    return;
  }

  bot.sendChatAction(chatId, "typing");
  await drc20API(chatId, ownerAddresses, bot);
});

bot.onText(/\/bell (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const ownerAddresses = match[1].split(" ");

  if (ownerAddresses.length < 1) {
    bot.sendMessage(
      chatId,
      "Please provide at least one owner address after the command."
    );
    return;
  }

  bot.sendChatAction(chatId, "typing");
  await bellAPI(chatId, ownerAddresses, bot);
});

bot.onText(/\/belldeploy (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const tickets = match[1].split(" ");

  if (tickets.length < 1) {
    bot.sendMessage(
      chatId,
      "Please provide at least one owner address after the command."
    );
    return;
  }

  bot.sendChatAction(chatId, "typing");
  await bellDeployAPI(chatId, tickets, bot);
});

bot.onText(/\/xrps (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const ownerAddresses = match[1].split(" ");

  if (ownerAddresses.length < 1) {
    bot.sendMessage(
      chatId,
      "Please provide at least one owner address after the command."
    );
    return;
  }

  bot.sendChatAction(chatId, "typing");
  await xrpsAPI(chatId, ownerAddresses, bot);
});

bot.onText(/\/calc (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const value = match[1];
  bot.sendChatAction(chatId, "typing");

  try {
    if (value.length < 1) {
      bot.sendMessage(chatId, "Vui lòng điền phép tính");
      return;
    }
    const calc = `🖥 ${value} = ✅ ${eval(value).toLocaleString('vi-VN')}`
    bot.sendMessage(chatId, calc, { parse_mode: 'Markdown' });
  } catch (error) {
    bot.sendMessage(chatId, 'Error Calc');
  }
});

bot.onText(/\/cgk (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const ticket = match[1].split(" ");

  if (ticket.length < 1) {
    bot.sendMessage(
      chatId,
      "Please provide at least one owner address after the command."
    );
    return;
  }

  bot.sendChatAction(chatId, "typing");
  await coingeckoAPI(chatId, ticket, bot);
});
