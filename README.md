![download](https://img.shields.io/npm/dt/js2excel.svg) ![npm-version](https://img.shields.io/npm/v/js2excel.svg) ![license](https://img.shields.io/npm/l/js2excel.svg) ![bower-license](https://img.shields.io/bower/l/js2excel.svg)

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

// excel's data will be exports, which you probably get it from server.
let data = [
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
        data,
        name: 'user-info-data',
        formateDate: 'yyyy/mm/dd'
    });
} catch (e) {
    console.error('export error');
}

// for webpack 3: dynamic import
import(/* webpackChunkName: "js2excel" */ 'js2excel').then(({json2excel}) => {
    json2excel({
        data,
        name: 'test',
        formateDate: 'dd/mm/yyyy'
    });
}).catch((e) => {

});
```
Exports result as the image shows:

![test-data](https://sfault-image.b0.upaiyun.com/148/574/1485742647-5961130140811_articlex)

### Convert excel(.numbers/.xlsx/.xls) to json
```
import { excel2json } from 'js2excel';

// html
<input type="file" multiple="false" id="sheets" accept="application/x-iwork-keynote-sffnumbers,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="onchange" />

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

![excel](https://sfault-image.b0.upaiyun.com/411/420/4114209136-5960fa90e8e6d_articlex)

The data maybe as following:

![data](https://sfault-image.b0.upaiyun.com/314/083/3140838997-5960fabf7c7b0_articlex)

## API

### json2excel(opts)
Convert json to excel(.xlsx).

**opts**
Type: `Object`

`opts.data`

Type: `Array`<br/>
Default: `[]`

Excel's  data.

`opts.name`

Type: `String`<br/>
Default: `excel`

Excel's name, whose suffix is `.xlsx`.

`opts.formateDate`

Type: `String` <br/>
Default: `dd/mm/yyyy`

The date formate in rows' data. Examples:

```
'dd/mm/yyyy' => 08/07/2017
'd/m/yy' => 8/7/17
'd/m/yy hh:ss' => 8/7/17 18:29
'yyyy/mm/dd hh:ss' => 2017/07/17 18:29
```

### excel2json(files, cb(data), [defval])
Convert excel(.numbers/.xlsx/.xls) to json.

**files**

Type: `Array`

[FileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList) from `<input type='file' multiple="false" >`.

**cb(data)**

Type: `Function`

Callback function called on finish. The `data` maybe as following:

```
{   
    `${sheetName}`: `[${excelRowsData}]`
    'sheet1': [/** excel rows' data **/],
    'sheet2': [/** excel rows' data **/],
    'sheet3': [/** excel rows' data **/]
    ...
}
```

**defval**

Type: `String`<br/>
Default: `''`

The default value when the row data corresponding to the column is blank.

### csv2json(files, cb(data), [encode])
Convert CSV file to json.

**files**

Type: `Array`

[FileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList) from `<input type='file' multiple="false" >`.

**cb(data)**

Type: `Function`

Callback function called on finish.

**encode**

Type: `String`<br/>
Default: `UTF-8`

The default encode when reading file.

## Supported browsers
* [FileSaver#supported-browsers](https://github.com/eligrey/FileSaver.js#supported-browsers)
* [FileReader](https://caniuse.com/#search=FileReader)

## License
MIT
