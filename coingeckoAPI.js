import axios from "axios";

async function coingeckoAPI(chatId, ticket, bot) {
  try {
    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${ticket}&vs_currencies=USD,VND`;

    const response = await axios.get(apiUrl);
    if (response.status === 200) {
      const responseData = response.data;

      // Gửi tin nhắn văn bản
      bot.sendMessage(chatId, JSON.stringify(responseData), { parse_mode: "Markdown" });
    }
  } catch (error) {
    console.error("Error:", error);
  }

}

export default coingeckoAPI;
