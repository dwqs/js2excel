/**
 * Created by pomy on 02/07/2017.
 */

// interface IWorkBook {
// 	Sheets: { [sheet: string]: IWorkSheet }; //  A dictionary of the worksheets in the workbook.
// 	SheetNames: string[];   // ordered list of the sheet names in the workbook
// 	Props: IProperties; // an object storing the standard properties. wb.Custprops stores custom properties.
// }

class IWorkBook {	
	public SheetNames: string[];
	public Sheets: any;

	constructor(public sheetNames: string[], public sheets: any) {
		this.SheetNames = sheetNames;
		this.Sheets = sheets;
	}
}

export default IWorkBook;
