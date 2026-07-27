import { Injectable } from '@nestjs/common';

import { Hymn } from '../../../catalog/hymns/domain/entities/hymn.entity';

import { Presentation } from '../entities/presentation.entity';
import { Slide } from '../entities/slide.entity';
import { SlideType } from '../enums/slide-type.enum';

import { LyricsParser } from './lyrics-parser.service';
import { SlidePaginatorService } from './slide-paginator.service';

@Injectable()
export class PresentationGeneratorService {

  constructor(
    private readonly parser: LyricsParser,
    private readonly paginator: SlidePaginatorService,
  ) {}

  generate(hymn: Hymn): Presentation {

    const blocks = this.parser.parse(hymn);

    const slides = this.paginator.paginate(blocks);

    const header = new Slide(
      1,
      SlideType.HEADER,
      hymn.title,
      hymn.author ?? undefined,
      hymn.page ?? undefined,
      [],
    );

    return new Presentation(
      hymn.title,
      [
        header,
        ...slides,
      ],
    );

  }

}