import { Inject, Injectable } from '@nestjs/common';

import { HymnRepository } from '../../../catalog/hymns/domain/repositories/hymn.repository';

import { PresentationGeneratorService } from '../../domain/services/presentation-generator.service';
import { HYMN_REPOSITORY } from 'src/modules/catalog/hymns/di/tokens/hymn.tokens';

@Injectable()
export class GeneratePresentationUseCase {

    constructor(
        @Inject(HYMN_REPOSITORY)
        private readonly repository: HymnRepository,
        private readonly generator: PresentationGeneratorService,
    ) { }

    async execute(id: string) {

        const hymn = await this.repository.findById(id);

        if (!hymn) {
            throw new Error('Hymn not found');
        }

        return this.generator.generate(hymn);

    }

}