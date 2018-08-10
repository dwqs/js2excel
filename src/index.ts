import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import IWorkBook from './work-book';

export interface Params {
    data: any[],
    name?: string,
    // dateFormat: /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
    formateDate?: string 
}

export interface SheetParams {
    data: {},
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

function convert(csv: any, separator: string): any {
    const lines = csv.split('\n');
    const result: any[] = [];
    const headers = lines[0].split(separator);
    lines.splice(0, 1);

    lines.forEach((line: any) => {
        const obj = {};
        const currentline = line.split(separator);
        headers.forEach((header: any, i: any) => {
            obj[header] = currentline[i];
        });
        result.push(obj);
    });

    return result;
}

function jsonSheets2excel(opts: SheetParams) {
    let { data = {}, name = 'excel', formateDate = 'dd/mm/yyyy'} = opts;

    let fileNames: string[] = [];
    let sheets = {};

    Object.keys( data ).map( (d) => {
        let sheet = data[d];
        let sheetName = d;
        const ws = XLSX.utils.json_to_sheet(sheet, { dateNF: formateDate});

        // add worksheet to workbook
        fileNames.push(sheetName);
        sheets[sheetName] = ws;
    });

    

    const wb = new IWorkBook(fileNames, sheets);
    
    const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

    // https://github.com/eligrey/FileSaver.js
    // An HTML5 Blob implementation: https://github.com/eligrey/Blob.js
    FileSaver.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), name + '.xlsx');
}

// 直接传递对象数据有可能导致浏览器卡死, 建议传二维数组或多维数据
// passing object directly will lead browser dead,
// so just pass dimensional array or multiple dimensional array.
function json2excel(opts: Params) {
    let { data = [], name = 'excel', formateDate = 'dd/mm/yyyy'} = opts;

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

    reader.onerror = (err: any) => {
        console.error('File read error: ', err);
    };

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
        
        if (typeof cb === 'function') {
            cb(res);
        }
    };

    reader.readAsArrayBuffer(file);
}

function csv2json(files: File[], cb: CallBack, encode = 'UTF-8', separator: string = ','): any {
    let reader = new FileReader();

    if (!files || files.length === 0) {
        return;
    }
    let file = files[0];

    reader.onerror = (err: any) => {
        console.error('File read error: ', err);
    };

    reader.onload = (e: any) => {
        const text = e.target.result;
        if (typeof cb === 'function') {
            cb(convert(text, separator));
        }
    };

    reader.readAsText(file, encode);
}

const js2excel = {
    excel2json,
    json2excel, 
    jsonSheets2excel,
    csv2json,
};

export default js2excel;