import { Slide } from './slide.entity';

export class Presentation {

  constructor(
    public readonly title: string,
    public readonly slides: Slide[],
  ) {}

}