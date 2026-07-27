import { SlideType } from '../enums/slide-type.enum';

export class LyricsBlock {

    constructor(
        public readonly order: number,
        public readonly type: SlideType,
        public readonly lines: string[],
        public readonly label?: string,
    ) {}

}