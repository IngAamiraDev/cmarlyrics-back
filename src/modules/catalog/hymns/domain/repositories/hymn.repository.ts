import { Hymn } from "../entities/hymn.entity";
import { PaginatedResult } from "../pagination/paginated-result";
import { HymnFilter } from "../value-objects/hymn-filter.vo";

export abstract class HymnRepository {

    abstract create(
        hymn: Hymn,
    ): Promise<Hymn>;

    abstract update(
        hymn: Hymn,
    ): Promise<Hymn>;

    abstract delete(
        id: string,
    ): Promise<void>;

    abstract findById(
        id: string,
    ): Promise<Hymn | null>;

    abstract findAll(
        filter: HymnFilter,
    ): Promise<PaginatedResult<Hymn>>;

}