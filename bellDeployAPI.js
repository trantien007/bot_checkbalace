import axios from 'axios';

async function bellDeployAPI(chatId, ownerAddresses, bot) {
  let tickInscriptionCount = {};
  let totalInscriptionCount = 0;
  
  for (const ticker of ownerAddresses) {
    const apiURL = `https://bellsturbo.ordinalswallet.com/brc20/deploys`;
    const params = {
      // start: 1,
      // limit: 100,
      // chainId: 321,
      // owner: ownerAddress
    };

    try {
      const response = await axios.get(apiURL, { params });

      if (response.status === 200) {
        const data = response.data;

        const arrayData = data || [];
        const filteredTickets = arrayData.filter(ticket => ticket.ticker == ticker.toUpperCase());

        for (const item of filteredTickets) {
          const tick = item.ticker;

          tickInscriptionCount[tick] = {
            'max_supply': item?.max_supply,
            'mint_limit': item?.mint_limit,
            'mint_percent': item?.mint_percent,
          };
        }

        if (arrayData.length === 0) {
          bot.sendMessage(chatId, `No data found for ticker ${ownerAddress}`);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  let tableContent = '';
  for (const tick in tickInscriptionCount) {
    tableContent += `${tick}\t\n`;
    tableContent += `max_supply: \t|\t${tickInscriptionCount[tick]['max_supply']}\n`;
    tableContent += `mint_limit: \t|\t${tickInscriptionCount[tick]['mint_limit']}\n`;
    tableContent += `mint_percent: \t|\t${tickInscriptionCount[tick]['mint_percent']}%\n\n`;
  }

  const tableHeader = 'Bell\t|\Deploy info Bell\n';
  const table = `\`\`\`\n${tableHeader}${tableContent}\nTotal\t|\t\n\`\`\``;

  bot.sendMessage(chatId, table, { parse_mode: 'Markdown' });
}

export default bellDeployAPI;
2