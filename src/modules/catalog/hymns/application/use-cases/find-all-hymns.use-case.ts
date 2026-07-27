import { Inject, Injectable } from '@nestjs/common';

import { HymnFilter } from '../../domain/value-objects/hymn-filter.vo';
import { HymnRepository } from '../../domain/repositories/hymn.repository';
import { HYMN_REPOSITORY } from '../../di/tokens/hymn.tokens';

@Injectable()
export class FindAllHymnsUseCase {

    constructor(
      @Inject(HYMN_REPOSITORY)
      private readonly repository: HymnRepository,
    ) {}

  execute(filter: HymnFilter) {
    return this.repository.findAll(filter);
  }

}