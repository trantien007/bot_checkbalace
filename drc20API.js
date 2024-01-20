import axios from "axios";

async function drc20API(chatId, ownerAddresses, bot) {
  try {
    const inscription = ownerAddresses;
    const apiUrl = `https://api.doggy.market/token/${inscription}`;

    const response = await axios.get(apiUrl);
    if (response.status === 200) {
      const responseData = response.data;
      const message =
        `DRC20 - ${responseData.tick}\n\n` +
        `💰 Price: ${responseData.firstPrice} DOGE\n` +
        `🔋 Minted: ${responseData.minted}\n` +
        `👥 Holders: ${responseData.holders}\n\n` +
        `🚀 Change: ${responseData.change}%\n` +
        `📊 Volume 24h: $${responseData.volume24h}\n` +
        `💎 MarketCap: $${responseData.marketcap}\n\n` +
        `Powered by @drc20vn`;

      // Gửi tin nhắn văn bản
      // bot.sendMessage(msg.chat.id, message);

      const imageUrl = "https://doggy.market/drc-20/oink.jpg";
      bot.sendPhoto(msg.chat.id, imageUrl, { caption: message });
    }
  } catch (error) {
    console.error("Error:", error);
  }

  bot.sendMessage(chatId, table, { parse_mode: "Markdown" });
}

export default drc20API;
