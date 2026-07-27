export class PaginatedResult<T> {

  constructor(
    public readonly data: T[],
    public readonly page: number,
    public readonly limit: number,
    public readonly total: number,
  ) {}

  get pages(): number {
    return Math.ceil(this.total / this.limit);
  }

}