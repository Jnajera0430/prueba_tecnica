import { PageMetaDto } from "../../../domain/dto/page/PageMeta.dto";
import { PageOptionsDto } from "../../../domain/dto/page/pageOptions.dto";
export interface FindInterface {
    rows: any[],
    pageMeta: PageMetaDto
}
export interface DatabaseWrapper {
    find(query?: object | PageOptionsDto): Promise<FindInterface>;
    insertOne(doc: any): Promise<any>;
    update(doc: any): Promise<any>;
}