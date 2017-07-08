export interface Params {
    data: any[];
    name?: string;
    formateDate?: string;
}
export declare type CallBack = (data: any) => any;
declare const js2excel: {
    excel2json: (files: File[], cb: CallBack, defval?: string) => any;
    json2excel: (opts: Params) => void;
};
export default js2excel;
