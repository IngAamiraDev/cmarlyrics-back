import { SlideType } from '../enums/slide-type.enum';

export class Slide {

  constructor(
    public readonly order: number,
    public readonly type: SlideType,
    public readonly title?: string,
    public readonly author?: string,
    public readonly page?: number,
    public readonly content: string[] = [],
    public readonly backgroundId?: string,
  ) {}

}