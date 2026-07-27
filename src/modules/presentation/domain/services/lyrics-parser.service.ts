import { Injectable } from '@nestjs/common';

import { Hymn } from '../../../catalog/hymns/domain/entities/hymn.entity';

import { LyricsBlock } from '../value-objects/lyrics-block.vo';
import { SlideType } from '../enums/slide-type.enum';

@Injectable()
export class LyricsParser {

    parse(hymn: Hymn): LyricsBlock[] {

        const normalized = hymn.lyrics
            .replace(/\r\n/g, '\n')
            .replace(/\r/g, '\n')
            .trim();

        const rawBlocks = normalized.split(/\n\s*\n/);

        let order = 1;

        return rawBlocks.map(raw => {

            const lines = raw
                .split('\n')
                .map(l => l.trim())
                .filter(Boolean);

            let type = SlideType.VERSE;
            let label: string | undefined;

            if (lines.length > 0) {

                const first = lines[0].toLowerCase();

                if (
                    first === 'coro' ||
                    first === 'coro:' ||
                    first === 'estribillo'
                ) {

                    type = SlideType.CHORUS;
                    label = lines.shift();

                }

            }

            return new LyricsBlock(
                order++,
                type,
                lines,
                label,
            );

        });

    }

}