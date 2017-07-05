/**
 * Created by pomy on 02/07/2017.
 */

class WorkBook {	
	public SheetNames: string[];
	public Sheets: any;

	constructor(public sheetNames: string[], public sheets: any) {
		this.SheetNames = sheetNames;
		this.Sheets = sheets;
	}
}

export default WorkBook;
