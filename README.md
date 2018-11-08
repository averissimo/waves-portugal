# Weather forecast in Portugal

> Calls multiple sources for weather forecast in Portugal

[![Build Status](https://travis-ci.org/averissimo/waves-portugal.svg?branch=master)](https://travis-ci.org/averissimo/waves-portugal) [![Greenkeeper badge](https://badges.greenkeeper.io/averissimo/waves-portugal.svg)](https://greenkeeper.io/) [![codecov](https://codecov.io/gh/averissimo/waves-portugal/branch/master/graph/badge.svg)](https://codecov.io/gh/averissimo/waves-portugal)

### Install

```
$ npm install waves-portugal
```

### Usage

You neet get a darksky API key from [darksky.net](https://darksky.net/dev/account) for this data source

```
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
