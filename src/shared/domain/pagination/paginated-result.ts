export class PaginatedResult<T> {

    constructor(

        public readonly data: T[],
        public readonly total: number,
        public readonly page: number,
        public readonly limit: number,

    ) {}

    get pages(): number {

        return Math.ceil(this.total / this.limit);

    }

}