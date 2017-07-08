'use strict';

import js2excel from '../src/index.ts';

let btn = document.getElementById('export');

let columns = [
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
        date: '2012/09/08'
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
        js2excel(columns, rows, 'user-info-data');
    } catch (e) {
        console.error('export error', e.stack);
    }
}, false);