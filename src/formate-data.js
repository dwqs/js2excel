/**
 * Created by pomy on 02/07/2017.
 */

// 将数据转成成数组的形式用于导出Excel
// converted data into an array to export Excel
export default function formatDataToExcel (columns, rows) {
    let tHeader = [];
    let indexs = [];

    columns.forEach(item => {
        if (item) {
            tHeader.push(item.name);
            indexs.push(item.prop);
        }
    });

    let data = rows.map(item => indexs.map(index => item[index]));
    data.unshift(tHeader);

    return data;
}
