import { Module } from '@nestjs/common';

import { PrismaHymnRepository } from './infrastructure/repositories/prisma-hymn.repository';

import { CreateHymnUseCase } from './application/use-cases/create-hymn.use-case';
import { HymnsController } from './presentation/controllers/hymns.controller';
import { HYMN_REPOSITORY } from './di/tokens/hymn.tokens';
import { FindAllHymnsUseCase } from './application/use-cases/find-all-hymns.use-case';

@Module({
  providers: [

  {
    provide: HYMN_REPOSITORY,
    useClass: PrismaHymnRepository,
  },

    CreateHymnUseCase,
    FindAllHymnsUseCase,

  ],

  exports: [
    HYMN_REPOSITORY,
    CreateHymnUseCase,
  ],

  controllers: [
    HymnsController,
  ],
  
})
export class HymnsModule { }