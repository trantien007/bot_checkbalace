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
        `💰 Price: ${(responseData.lastPrice / 100000000).toFixed(2).toLocaleString()} DOGE\n` +
        `🔋 Minted: ${((responseData.mintedAmt / responseData.max)*100).toFixed(2).toLocaleString()} %\n` +
        `👥 Holders: ${responseData.holders.toLocaleString()}\n\n` +
        `🚀 Change: ${responseData.change.toLocaleString()}%\n` +
        `📊 Volume 24h: Đ${(responseData.volume24h / 100000000).toLocaleString()}\n` +
        `💎 MarketCap: Đ${(responseData.marketcap / 100000000).toLocaleString()}\n\n` +
        `Powered by @drc20vn`;

      // Gửi tin nhắn văn bản
      // bot.sendMessage(msg.chat.id, message);

      const imageUrl = responseData?.pic ?? null;
      bot.sendPhoto(chatId, imageUrl, { caption: message });
    }
  } catch (error) {
    console.error("Error:", error);
  }

  // bot.sendMessage(chatId, table, { parse_mode: "Markdown" });
}

export default drc20API;
