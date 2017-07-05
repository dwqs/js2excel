/**
 * Created by pomy on 02/07/2017.
 */

interface Sheets {
	fileName: any,
	sheetNames: string[]
}

export default class WorkBook implements Sheets {	
	constructor(public sheetNames: string[], public fileName: any) {
		this.sheetNames = sheetNames;
		this.fileName = fileName;
	}
}
