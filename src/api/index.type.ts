export interface IResponse {
    data: any;
    code: string;
    msg: string
}

export interface IQueryList {
    [key: string]: string | number | undefined | null;
}

export interface IDictionary {
    dictId: number
    dictKey: string
    dictType: string
    dictValue: string
}

export interface IUploadFile {
    fileData:IFileData,
    name:string
}

export interface IFileData{
    fileId:string
    filePath:string  
}