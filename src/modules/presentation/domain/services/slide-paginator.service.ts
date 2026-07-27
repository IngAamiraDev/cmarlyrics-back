import { Injectable } from '@nestjs/common';

import { Slide } from '../entities/slide.entity';
import { LyricsBlock } from '../value-objects/lyrics-block.vo';
import { SlidePaginatorOptions } from '../interfaces/slide-paginator-options.interface';
import { DEFAULT_SLIDE_OPTIONS } from '../interfaces/default-slide-options';

@Injectable()
export class SlidePaginatorService {

  paginate(
    blocks: LyricsBlock[],
    options: SlidePaginatorOptions = DEFAULT_SLIDE_OPTIONS,
  ): Slide[] {

    const slides: Slide[] = [];

    let order = 2;

    for (const block of blocks) {

      if (
        block.lines.length <= options.maxLinesPerSlide ||
        !options.splitLongVerses
      ) {

        slides.push(
          new Slide(
            order++,
            block.type,
            undefined,
            undefined,
            undefined,
            block.lines,
          ),
        );

        continue;

      }

      // Dividir bloques largos
      for (
        let i = 0;
        i < block.lines.length;
        i += options.maxLinesPerSlide
      ) {

        slides.push(
          new Slide(
            order++,
            block.type,
            undefined,
            undefined,
            undefined,
            block.lines.slice(i, i + options.maxLinesPerSlide),
          ),
        );

      }

    }

    return slides;

  }

}