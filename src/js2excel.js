/**
 * Created by pomy on 01/07/2017.
 */

import XLSX from 'xlsx';
import FileSaver from 'file-saver';

import WorkBook from './work-book';
import formatDataToExcel from './formate-data';

function s2ab (s) {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);

    for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }

    return buf;
}

function dateNum (v, date1904) {
    if (date1904) {
        v += 1462;
    }

    let epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheetFromArrayOfArrays (data, opts) {
    let ws = {};
    let range = {
        s: {
            c: 10000000,
            r: 10000000
        },
        e: {
            c: 0,
            r: 0
        }
    };

    for (let R = 0; R !== data.length; ++R) {
        for (let C = 0; C !== data[R].length; ++C) {
            if (range.s.r > R) {
                range.s.r = R;
            }

            if (range.s.c > C) {
                range.s.c = C;
            }

            if (range.e.r < R) {
                range.e.r = R;
            }

            if (range.e.c < C) {
                range.e.c = C;
            }

            let cell = {
                v: data[R][C]
            };

            if (cell.v === null) {
                continue;
            }

            let cellRef = XLSX.utils.encode_cell({ c: C, r: R });

            if (typeof cell.v === 'number') {
                cell.t = 'n';
            } else if (typeof cell.v === 'boolean') {
                cell.t = 'b';
            } else if (cell.v instanceof Date) {
                cell.t = 'n';
                cell.z = XLSX.SSF._table[14];
                cell.v = dateNum(cell.v);
            } else {
                cell.t = 's';
            }

            ws[cellRef] = cell;
        }
    }

    if (range.s.c < 10000000) {
        ws['!ref'] = XLSX.utils.encode_range(range);
    }

    return ws;
}

// 直接传递对象数据有可能导致浏览器卡死, 建议传二维数组或多维数据
// passing object directly will lead browser dead,
// so just pass dimensional array or multiple dimensional array.
export default function js2excel (tHeaderColumns, tableData, fileName = 'excel') {
    const data = formatDataToExcel(tHeaderColumns, tableData);

    let wb = new WorkBook();
    let ws = sheetFromArrayOfArrays(Array.isArray(data) ? data : []);

    // add worksheet to workbook
    wb.SheetNames.push(fileName);
    wb.Sheets[fileName] = ws;

    let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

    // https://github.com/eligrey/FileSaver.js
    // An HTML5 Blob implementation: https://github.com/eligrey/Blob.js
    FileSaver.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), fileName + '.xlsx');
}
