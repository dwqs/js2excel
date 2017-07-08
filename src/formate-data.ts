import assert from './assert';

// 将数据转成成数组的形式用于导出Excel
// converted data into an array to export Excel
export default function formatDataToExcel<T>(headers: T[], rows: T[]): T[] {
    const tHeader: any[] = [];
    const indexs: any[] = [];
    let data: any[] = [];

    if (headers.length) {
        headers.forEach((item: any) => {
            if (item.hasOwnProperty && item.hasOwnProperty('name') && item.hasOwnProperty('prop')) {
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
        data = rows.map((item) => indexs.map((index) => item[index]));
    }

    data.unshift(tHeader);

    return data;
}