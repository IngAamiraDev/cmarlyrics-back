import { Inject, Injectable } from '@nestjs/common';

import { Hymn } from '../../domain/entities/hymn.entity';
import { HymnRepository } from '../../domain/repositories/hymn.repository';
import { CreateHymnDto } from '../dto/request/create-hymn.dto';
import { HYMN_REPOSITORY } from '../../di/tokens/hymn.tokens';

@Injectable()
export class CreateHymnUseCase {

  constructor(
    @Inject(HYMN_REPOSITORY)
    private readonly repository: HymnRepository,
  ) {}

  async execute(dto: CreateHymnDto): Promise<Hymn> {

    const hymn = new Hymn(
      null,
      dto.number,
      dto.title,
      dto.author ?? null,
      dto.lyrics,
      dto.page ?? null,
      dto.favorite ?? false,
      new Date(),
      new Date(),
    );

    return this.repository.create(hymn);

  }

}