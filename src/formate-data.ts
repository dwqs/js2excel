import assert from './assert';

export default function formatDataToExcel<T>(columns: T[], rows: T[]): T[] {
    const tHeader: any[] = [];
    const indexs: any[] = [];
    let data: any[] = [];

    if (columns.length) {
        columns.forEach((item: any) => {
            if (typeof item === 'object' && item.hasOwnProperty('name') && item.hasOwnProperty('prop')) {
                // excel columns header
                tHeader.push(item.name);
                indexs.push(item.prop);
            } else {
                assert(false, `The params you passed is illegal.`);
            }
        });
    }

    if (rows.length) {
        data = rows.map((item) => indexs.map((index) => item[index]));
    }

    data.unshift(tHeader);

    return data;
}