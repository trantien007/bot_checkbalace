import axios from 'axios';

async function bellAPI(chatId, ownerAddresses, bot) {
  let tickInscriptionCount = {};
  let totalInscriptionCount = 0;

  async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  for (const ownerAddress of ownerAddresses) {
    const apiURL = `https://bellsturbo.ordinalswallet.com/wallet/${ownerAddress}/brc20-balance`;
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
          let inscriptionCount = parseInt(item.available_balance || 0);

          switch (tick) {
            case 'NOOK':
              inscriptionCount = inscriptionCount / 500000000;
              break;
            case 'CRSS':
            case 'BM2K':
            case 'MUSK':
              inscriptionCount = inscriptionCount / 1000;
              break;
          }

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

    // Chờ 1.5 giây trước khi thực hiện yêu cầu tiếp theo
    await delay(1500);
  }

  let tableContent = '';
  for (const tick in tickInscriptionCount) {
    tableContent += `${tick}\t|\t${tickInscriptionCount[tick]}\n`;
  }

  const tableHeader = 'Bell\t|\tTotal Inscription Count\n';
  const table = `\`\`\`\n${tableHeader}${tableContent}\nTotal\t|\t${totalInscriptionCount}\n\`\`\``;

  bot.sendMessage(chatId, table, { parse_mode: 'Markdown' });
}

export default bellAPI;
2