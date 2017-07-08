## js2excel
A simple module for excel and json converts each other.

## Installation

It is recommended to run webpack on node 6.x or higher.

Install the pkg with npm:

```
npm install js2excel --save
```

or yarn

```
yarn add js2excel
```

or bower

```
bower install js2excel
```

## Usage

### Convert json to excel
```
// es6
import {json2excel, excel2json} from 'js2excel';

//CommonJS
let { json2excel, excel2json } = require('js2excel');

/**
 * excel's data
 **/

// excel's columns's header 
let headers = [
    {
        // the name will be as the excel column name
        name: 'User Id', 
        // the prop will be as the excel row data, which is the rows' item's property.
        prop: 'userId'     
    },
    {
        name: 'Phone Number',
        prop: 'userPhoneNumber'
    },
    {
        name: 'User Address',
        prop: 'userAddress'
    },
    {
        name: 'Date',
        prop: 'date'
    }
];

// excel rows' data
// rows' data will be exports, which you probably get it from server.
let rows = [
    {
        "userId": 1,
        "userPhoneNumber": 1888888888,
        "userAddress": 'xxxx',
        "date": '2013/09/10 09:10'  // string
    },
    {
        "userId": 2,
        "userPhoneNumber": 1888888888,
        "userAddress": 'xxxx',
        "date": new Date()
    },
    {
        "userId": 3,
        "userPhoneNumber": 1888888888,
        "userAddress": 'xxxx',
        "date": new Date()
    }
];

// this will be export a excel and the file's name is user-info-data.xlsx
// the default file's name is excel.xlsx
try {
    json2excel({
        headers, rows, 
        name: 'user-info-data',
        formateDate: 'yyyy/mm/dd'
    });
} catch (e) {
    console.error('export error');
}

// for webpack 3: dynamic import
import(/* webpackChunkName: "js2excel" */ 'js2excel').then(({json2excel}) => {
    json2excel({
        headers, rows, 
        name: 'user-info-data',
        formateDate: 'dd/mm/yyyy'
    });
}).catch((e) => {

});
```
Exports result as the image shows:

![user-data](https://sfault-image.b0.upaiyun.com/187/610/1876104695-5960eaee85790_articlex)

### Convert excel to json
```
import { excel2json } from 'js2excel';

// html
<input type="file" multiple="false" id="sheets" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="onchange" />

// methods
onchange(e){
    excel2json(e.target.files, (data) => {
        console.log('json', data)
    }, 'excel2json')
}

// for webpack 3: dynamic import
onchange(e) {
    import(/* webpackChunkName: "js2excel" */ 'js2excel').then(({excel2json}) => {
        excel2json(e.target.files, (data) => {
            console.log('json', data)
        }, 'excel2json')
    }).catch((e) => {

    });
}
```
Example, if you hava a excel as following:

![excel](https://sfault-image.b0.upaiyun.com/251/190/2511902148-5960f847bcf7b_articlex)

The data maybe as following:

![data](https://sfault-image.b0.upaiyun.com/329/416/3294164883-5960f90944d21_articlex)

## API

### json2excel(opts)
Convert json to excel(.xlsx).

**opts**
Type: `Object`

`opts.headers`
Type: `Array`
Default: []

Excel's column's headers.

`opts.rows`
Type: `Array`,
Default: []

Excel's rows's data.

`opts.name`
Type: `String`,
Default: 'excel'

Excel's name, whose suffix is `.xlsx`.

`opts.formateDate`
Type: `String`,
Default: 'dd/mm/yyyy'

The date formate in rows' data. Examples:

```
'dd/mm/yyyy' => 08/07/2017
'd/m/yy' => 8/7/17
'd/m/yy hh:ss' => 8/7/17 18:29
'yyyy/mm/dd hh:ss' => 2017/07/17 18:29
```

### excel2json(files, cb, [defval])
Convert excel(.xlsx/.xls) to json.

**files**
Type: `Array`

[FileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList) from `<input type='file' multiple="false" >`.

**cb**
Type: `Function`

Callback function called on finish.

**defval**
Type: `String`

The default value when the row data corresponding to the column is blank.

## Supported browsers
[FileSaver#supported-browsers](https://github.com/eligrey/FileSaver.js#supported-browsers)
[FileReader](https://caniuse.com/#search=FileReader)

## License
MIT
