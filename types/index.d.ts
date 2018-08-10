export interface Params {
    data: any[];
    name?: string;
    formateDate?: string;
}
export interface SheetParams {
    data: {};
    name?: string;
    formateDate?: string;
}
export declare type CallBack = (data: any) => any;
declare function jsonSheets2excel(opts: SheetParams): void;
declare function json2excel(opts: Params): void;
declare function excel2json(files: File[], cb: CallBack, defval?: string): any;
declare function csv2json(files: File[], cb: CallBack, encode?: string, separator?: string): any;
declare const js2excel: {
    excel2json: typeof excel2json;
    json2excel: typeof json2excel;
    jsonSheets2excel: typeof jsonSheets2excel;
    csv2json: typeof csv2json;
};
export default js2excel;
