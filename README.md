# Weather forecast in Portugal

> Calls multiple sources for weather forecast in Portugal

[![npm version](https://badge.fury.io/js/waves-portugal.svg)](https://www.npmjs.com/package/waves-portugal) [![Build Status](https://travis-ci.org/averissimo/waves-portugal.svg?branch=master)](https://travis-ci.org/averissimo/waves-portugal) [![codecov](https://codecov.io/gh/averissimo/waves-portugal/branch/master/graph/badge.svg)](https://codecov.io/gh/averissimo/waves-portugal)  

### Install

```
$ npm install waves-portugal
```

### Usage

```javascript
const {IPMA} = require('waves-portugal');

const ipma = new IPMA();

ipma.forecast(42) // for Cabo Espichel, Portugal
  .then(response => console.log(response))
  .catch(error => console.log(error));
```

### Test

```
npm test
```
