export interface DatabaseWrapper { 
    find(query: object): Promise<any[]>;
    insertOne(doc: any): Promise<any>; 
    update(doc:any):Promise<any>;
}