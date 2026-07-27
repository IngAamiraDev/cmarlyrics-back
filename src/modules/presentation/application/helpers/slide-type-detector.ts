import { SlideType } from '../../domain/enums/slide-type.enum';

export class SlideTypeDetector {

  static detect(firstLine: string): SlideType {

    const value = firstLine
      .trim()
      .toLowerCase();

    if (
      value === 'coro' ||
      value === 'coro:' ||
      value === 'estribillo'
    ) {
      return SlideType.CHORUS;
    }

    return SlideType.VERSE;

  }

}