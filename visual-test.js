/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }] */
const moment = require('moment');
const {IPMA} = require('.');

const ipma = new IPMA();

ipma.forecast(42).then(response => {
  for (const el of response) {
    console.log('date', moment(el.date).format('YYYY/MM/DD'), el.date);
    for (const el2 of el.data) {
      const {time} = el2;
      delete el2.time;
      console.log('\t', moment(time).format('YYYY/MM/DD hh:mm'), el2);
    }
  }
}).catch(error => console.log(error));
