import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import formatDataToExcel from './formate-data';
import IWorkBook from './work-book';

function s2ab(s: string) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);

    for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }

    return buf;
}

function dateNum(v: any, date1904?: any) {
    if (date1904) {
        v += 1462;
    }

    const epoch = Date.parse(v as string);
	const d: any = new Date(Date.UTC(1899, 11, 30));

    return (epoch - d) / (24 * 60 * 60 * 1000);
}

interface Cell {
	v: any,
	t?: string,
	z?: any
}

function sheetFromArrayOfArrays(data: any[], opts?: any) {
    const ws = {};
    const range = {
		e: {
            c: 0,
            r: 0,
        },
        s: {
            c: 10000000,
            r: 10000000,
        },
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

            const cell: Cell = {
				// The raw value of the cell
				// 单元格的值
                v: data[R][C],
            };

            if (cell.v === null) {
                continue;
            }

            const cellRef = XLSX.utils.encode_cell({ c: C, r: R });

			// The Excel Data Type of the cell
			// b Boolean, n Number, e error, s String, d Date
            if (typeof cell.v === 'number') {
                cell.t = 'n';
            } else if (typeof cell.v === 'boolean') {
                cell.t = 'b';
            } else if (cell.v instanceof Date) {
                cell.t = 'n';
				// xlsx dosen't declare SSF type in index.d.ts.
                // cell.z =  XLSX.SSF._table[14];
				cell.z = 'm/d/yy';
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
export default function js2excel(tHeaderColumns: any[], tableData: any[], fileName = 'excel') {
    const data = formatDataToExcel(tHeaderColumns, tableData);

	let fileNames: string[] = [];
	let sheets = {};

	const ws = sheetFromArrayOfArrays(Array.isArray(data) ? data : []);

	// add worksheet to workbook
	fileNames.push(fileName);
	sheets[fileName] = ws;

    const wb = new IWorkBook(fileNames, sheets);
    
    const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

    // https://github.com/eligrey/FileSaver.js
    // An HTML5 Blob implementation: https://github.com/eligrey/Blob.js
    FileSaver.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), fileName + '.xlsx');
}