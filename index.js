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

          $('table').each((i, element) => {
            const newWave = {date: today.valueOf(), data: [], source: 'ipma.pt'};

            let newElement;
            $(element).find('tr').each((j, elmentJ) => {
              newElement = {};
              $(elmentJ).find('td').each((k, elementK) => {
                elementK = $(elementK);
                switch (k) {
                  case 0:
                    newElement.time = today.valueOf();
                    break;
                  case 1:
                    newElement.height = Number.parseFloat(elementK.text());
                    break;
                  case 2:
                    newElement.waves = Number.parseFloat(elementK.text());
                    break;
                  case 10:
                    newElement.power = Number.parseFloat(elementK.text());
                    break;
                  default:
                    break;
                }
              });
              if (Object.keys(newElement).length > 0) {
                newWave.data.push(newElement);
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
