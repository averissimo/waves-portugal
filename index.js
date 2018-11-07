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

          const waves = {};

          const today = moment().startOf('day');

          $('table').each((i, el) => {
            const day = today.format('YYYY-MM-DD');
            waves[day] = {time: [], height: [], waves: [], power: []};

            $(el).find('tr').each((j, elJ) => {
              $(elJ).find('td').each((k, elK) => {
                elK = $(elK);
                switch (k) {
                  case 0:
                    waves[day].time.push(today.valueOf());
                    break;
                  case 1:
                    waves[day].height.push(parseFloat(elK.html()));
                    break;
                  case 2:
                    waves[day].waves.push(parseFloat(elK.html()));
                    break;
                  case 10:
                    waves[day].power.push(parseFloat(elK.html()));
                    break;
                  default:
                    break;
                }
              });
              today.add(1, 'hours');
            });
          });
          resolve(waves);
        });
    });

    return promise;
  }
}

module.exports = {IPMA};
