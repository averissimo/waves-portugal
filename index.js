const cheerio = require('cheerio');
const request = require('request');
const moment = require('moment');

class IPMA {
  constructor() {
    this.caca = 1;
  }

  static get FORECAST_URL() {
    return 'https://www.ipma.pt/pt/maritima/costeira/index.jsp';
  }

  // See page below for the correct id to use here
  //  https://www.ipma.pt/pt/maritima/costeira/index.jsp?selLocal=42&idLocal=42
  async forecast(id) {
    const promise = await new Promise((resolve, reject) => {
      request
        .get({
          url: IPMA.FORECAST_URL,
          qs: {
            selLocal: id,
            idLocal: id
          }
        }, (error, reponse, body) => {
          if (error) {
            reject(error);
          }

          const $ = cheerio.load(body);

          const waves = [];
          const today = moment().startOf('day');

          $('table').each((i, el) => {
            const newWave = {date: today.valueOf(), data: [], source: 'ipma.pt'};

            let newEl;
            $(el).find('tr').each((j, elJ) => {
              newEl = {};
              $(elJ).find('td').each((k, elK) => {
                elK = $(elK);
                switch (k) {
                  case 0:
                    newEl.time = today.valueOf();
                    break;
                  case 1:
                    newEl.height = parseFloat(elK.text());
                    break;
                  case 2:
                    newEl.waves = parseFloat(elK.text());
                    break;
                  case 10:
                    newEl.power = parseFloat(elK.text());
                    break;
                  default:
                    break;
                }
              });
              if (Object.keys(newEl).length > 0) {
                newWave.data.push(newEl);
                today.add(1, 'hours');
              }
            });
            waves.push(newWave);
          });
          resolve(waves);
        });
    });

    return promise;
  }
}

module.exports = {IPMA};
