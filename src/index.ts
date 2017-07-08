import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import formatDataToExcel from './formate-data';
import IWorkBook from './work-book';

export interface Params {
    headers: any[],
    rows: any[],
    name?: string,
    // dateFormat: /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
    formateDate?: string 
}

export type CallBack = (data: any) => any;

function s2ab(s: string) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);

    for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }

    return buf;
}

// 直接传递对象数据有可能导致浏览器卡死, 建议传二维数组或多维数据
// passing object directly will lead browser dead,
// so just pass dimensional array or multiple dimensional array.
function json2excel(opts: Params) {
    let { headers = [], rows = [], name = 'excel', formateDate = 'dd/mm/yyyy'} = opts;
    const data = formatDataToExcel(headers, rows);

	let fileNames: string[] = [];
	let sheets = {};

    const ws = XLSX.utils.json_to_sheet(data, { dateNF: formateDate});

	// add worksheet to workbook
	fileNames.push(name);
	sheets[name] = ws;

    const wb = new IWorkBook(fileNames, sheets);
    
    const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

    // https://github.com/eligrey/FileSaver.js
    // An HTML5 Blob implementation: https://github.com/eligrey/Blob.js
    FileSaver.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), name + '.xlsx');
}

function excel2json(files: File[], cb: CallBack, defval = ''): any {
    // https://caniuse.com/#search=FileReader
    let reader = new FileReader();

    if (!files || files.length === 0) {
        return;
    }
    let file = files[0];

    reader.onload = (e: any) => {
        // pre-process data
        let binary = '';
        let bytes = new Uint8Array(e.target.result);
        let length = bytes.byteLength;

        for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        // read workbook
        let wb = XLSX.read(binary, {type: 'binary'});

        let res = {};

        for (let name of wb.SheetNames) {
            let ws = wb.Sheets[name];
            res[name] = XLSX.utils.sheet_to_json(ws, {defval});
        }
        
        cb(res);
    };

    reader.readAsArrayBuffer(file);
}

const js2excel = {
    excel2json,
    json2excel, 
};

export default js2excel;