/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }] */
import moment from 'moment';
import {IPMA} from './index.js';

const ipma = new IPMA();

export default ipma.forecast(42).then(response => {
  for (const element of response) {
    console.log('date', moment(element.date).format('YYYY/MM/DD'), element.date);
    for (const element2 of element.data) {
      const {time} = element2;
      delete element2.time;
      console.log('\t', moment(time).format('YYYY/MM/DD hh:mm'), element2);
    }
  }
}).catch(error => console.log(error));

