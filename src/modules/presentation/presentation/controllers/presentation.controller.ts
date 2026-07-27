import { Controller, Get, Param } from '@nestjs/common';

import { GeneratePresentationUseCase } from '../../application/use-cases/generate-presentation.use-case';

@Controller('presentations')
export class PresentationController {

    constructor(
        private readonly generatePresentation: GeneratePresentationUseCase,
    ) {}

    @Get('hymns/:id')
    generate(

        @Param('id') id: string,

    ) {

        return this.generatePresentation.execute(id);

    }

}