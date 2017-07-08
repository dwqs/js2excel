'use strict';

import js2excel from '../src/index.ts';

console.log('3333', js2excel)

let btn = document.getElementById('export');
let upload = document.getElementById('sheetjs-input');

let headers = [
    {
        name: 'User Id',
        prop: 'userId',
    },
    {
        name: 'Phone Number',
        prop: 'userPhoneNumber',
    },
    {
        name: 'User Address',
        prop: 'userAddress',
    },
    {
        name: 'date',
        prop: 'date',
    }
];

// rows' data will be exports, which you probably get it from server.
let rows = [
    {
        userId: 1,
        userPhoneNumber: 1888888888,
        userAddress: 'xxxx',
        date: '2012/09/08'   // string
    },
    {
        userId: 2,
        userPhoneNumber: 1888888888,
        userAddress: 'xxxx',
        date: new Date()
    },
    {
        userId: 3,
        userPhoneNumber: 1888888888,
        userAddress: 'xxxx',
        date: new Date()
    },
];

btn.addEventListener('click', () => {
    try {
        json2excel({
            headers,
            rows,
            name: 'user-info-data',
            formateDate: 'yyyy/mm/dd'
        });
    } catch (e) {
        console.error('export error', e.stack);
    }
}, false);

upload.addEventListener('change', (e) => {
    console.log('ddd', e.target.files);

    try {
        excel2json(e.target.files, (data) => {
            console.log('parse data: ', data);
        }, 'test');
    } catch (e) {
        console.error('parse error', e.stack);
    }
});
