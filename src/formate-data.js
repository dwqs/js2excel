/**
 * Created by pomy on 02/07/2017.
 */

import assert from './assert';

// 将数据转成成数组的形式用于导出Excel
// converted data into an array to export Excel
export default function formatDataToExcel (columns, rows) {
    let tHeader = [];
    let indexs = [];
    let data = [];

    assert(Array.isArray(columns),
        `The first param is excel columns header, and it should be an array. The type you passed is ${typeof columns}.`);

    assert(Array.isArray(rows),
        `The second param is excel data, and it should be an array. The type you passed is ${typeof rows}.`);

    if (columns.length) {
        columns.forEach(item => {
            if (typeof item === 'object' && item.hasOwnProperty('name') && item.hasOwnProperty('prop')) {
                // excel columns header
                tHeader.push(item.name);
                indexs.push(item.prop);
            } else {
                assert(false, `The params you passed is illegal.`);
            }
        });
    }

    // excel data
    if (rows.length) {
        data = rows.map(item => indexs.map(index => item[index]));
    }

    data.unshift(tHeader);

    return data;
}
