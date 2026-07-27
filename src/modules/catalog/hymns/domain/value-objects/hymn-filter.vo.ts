export class HymnFilter {

    constructor(

        public readonly page = 1,
        public readonly limit = 20,
        public readonly search?: string,
        public readonly favorite?: boolean,
        public readonly author?: string,
        public readonly category?: string,

    ) {}

}