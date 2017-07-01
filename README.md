## js2excel
A simple module exports json data to excel, which works in the browser.

## Installation

```
npm install js2excel --save
bower install js2excel
```

## Usage
```
// es6
import js2excel from 'js2excel';

//CommonJS
let Toast = require('js2excel');

/**
 * excel's data
 **/

// excel's header columes
let columns = [
    {
        name: 'User Id',
        prop: 'userId'
    },
    {
        name: 'Phone Number',
        prop: 'userPhoneNumber'
    },
    {
        name: 'User Address',
        prop: 'userAddress'
    }
];

// excel rows' data
// rows' data will be exports, which you probably get it from server.
let rows = [
    {
        "userId": 1,
        "userPhoneNumber": 1888888888,
        "userAddress": 'xxxx'
    },
    {
        "userId": 2,
        "userPhoneNumber": 1888888888,
        "userAddress": 'xxxx'
    },
    {
        "userId": 3,
        "userPhoneNumber": 1888888888,
        "userAddress": 'xxxx'
    }
];

// this will be export a excel and the file's name is user-info-data.xlsx
// the default file's name is excel.xlsx
js2excel(columns, rows, 'user-info-data');
```

## Supported browsers
See this: [FileSaver#supported-browsers](https://github.com/eligrey/FileSaver.js#supported-browsers)

## License
MIT