import axios from 'axios';

async function handleAPI(chatId, ownerAddresses, bot, key) {
  let tickInscriptionCount = {};
  let totalInscriptionCount = 0;

  for (const ownerAddress of ownerAddresses) {
    let apiURL = `https://bellsturbo.ordinalswallet.com/wallet/${ownerAddress}/brc20-balance`;
    
    switch (key) {
      case 'bell':
        apiURL = `https://bellsturbo.ordinalswallet.com/wallet/${ownerAddress}/brc20-balance`;
        break;
      case 'xrps':
        apiURL = `https://bellsturbo.ordinalswallet.com/wallet/${ownerAddress}/brc20-balance`;
        break;
    }

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
        for (const item of arrayData) {
          const tick = item.ticker;
          const inscriptionCount = parseInt(item.available_balance || 0);

          tickInscriptionCount[tick] = (tickInscriptionCount[tick] || 0) + inscriptionCount;
          totalInscriptionCount += inscriptionCount;
        }

        if (arrayData.length === 0) {
          bot.sendMessage(chatId, `No data found for address ${ownerAddress}`);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  let tableContent = '';
  for (const tick in tickInscriptionCount) {
    tableContent += `${tick}\t|\t${tickInscriptionCount[tick]}\n`;
  }

  const tableHeader = 'Bell\t|\tTotal Inscription Count\n';
  const table = `\`\`\`\n${tableHeader}${tableContent}\nTotal\t|\t${totalInscriptionCount}\n\`\`\``;

  bot.sendMessage(chatId, table, { parse_mode: 'Markdown' });
}

export default handleAPI;
2