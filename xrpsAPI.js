import axios from 'axios';

async function xrpsAPI(chatId, ownerAddresses, bot, key) {
  let tickInscriptionCount = {};
  let totalInscriptionCount = 0;

  for (const ownerAddress of ownerAddresses) {
    const apiURL = `https://api.xrpscript.com/balance/${ownerAddress}`;
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
        const item = data || [];
        const tick = 'XRPS';
        let inscriptionCount = parseInt(item.result.balance || 0);

        inscriptionCount = inscriptionCount / 1000000;

        tickInscriptionCount[tick] = (tickInscriptionCount[tick] || 0) + inscriptionCount;
        totalInscriptionCount += inscriptionCount;

        if (!item) {
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

  const tableHeader = 'XRPS\t|\tTotal Inscription Count\n';
  const table = `\`\`\`\n${tableHeader}${tableContent}\nTotal\t|\t${totalInscriptionCount}\n\`\`\``;

  bot.sendMessage(chatId, table, { parse_mode: 'Markdown' });
}

export default xrpsAPI;
2