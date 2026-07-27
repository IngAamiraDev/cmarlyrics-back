import { Module } from '@nestjs/common';

import { HymnsModule } from '../catalog/hymns/hymns.module';

import { LyricsParser } from './domain/services/lyrics-parser.service';
import { SlidePaginatorService } from './domain/services/slide-paginator.service';
import { PresentationGeneratorService } from './domain/services/presentation-generator.service';

import { GeneratePresentationUseCase } from './application/use-cases/generate-presentation.use-case';

import { PresentationController } from './presentation/controllers/presentation.controller';

@Module({

    imports: [
        HymnsModule,
    ],

    providers: [
        LyricsParser,
        SlidePaginatorService,
        PresentationGeneratorService,
        GeneratePresentationUseCase,
    ],

    controllers: [
        PresentationController,
    ],

    exports: [
        GeneratePresentationUseCase,
    ],

})
export class PresentationModule { }