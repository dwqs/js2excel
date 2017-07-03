/**
 * Created by pomy on 02/07/2017.
 */

'use strict';

import js2excel from '../src/js2excel';

let btn = document.getElementById('export');

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

btn.addEventListener('click', () => {
    try{
        js2excel(columns, rows, 'user-info-data');
    } catch (e) {
        console.error('export error', e.message);
    }
}, false);