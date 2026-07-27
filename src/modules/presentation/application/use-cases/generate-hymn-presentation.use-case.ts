import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { HymnRepository } from '../../../catalog/hymns/domain/repositories/hymn.repository';
import { HYMN_REPOSITORY } from '../../../catalog/hymns/di/tokens/hymn.tokens';
import { PresentationGeneratorService } from '../../domain/services/presentation-generator.service';


@Injectable()
export class GenerateHymnPresentationUseCase {

  constructor(
    @Inject(HYMN_REPOSITORY)
    private readonly repository: HymnRepository,
    private readonly generator: PresentationGeneratorService,
  ) { }

  async execute(id: string) {

    const hymn = await this.repository.findById(id);

    if (!hymn) {
      throw new NotFoundException('Hymn not found');
    }

    return this.generator.generate(hymn);

  }

}