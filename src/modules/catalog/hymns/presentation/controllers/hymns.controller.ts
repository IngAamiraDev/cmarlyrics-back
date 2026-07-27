import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CreateHymnDto } from '../../application/dto/request/create-hymn.dto';
import { CreateHymnUseCase } from '../../application/use-cases/create-hymn.use-case';
import { HymnResponseMapper } from '../../application/mappers/hymn-response.mapper';
import { FindAllHymnsDto } from '../../application/dto/request/find-all-hymns.dto';
import { HymnFilter } from '../../domain/value-objects/hymn-filter.vo';
import { FindAllHymnsUseCase } from '../../application/use-cases/find-all-hymns.use-case';

@Controller('catalog/hymns')
export class HymnsController {

  constructor(
    private readonly createHymnUseCase: CreateHymnUseCase,
    private readonly findAllHymnsUseCase: FindAllHymnsUseCase,
  ) { }

  @Post()
  async create(
    @Body() dto: CreateHymnDto,
  ) {

    const hymn = await this.createHymnUseCase.execute(dto);
    return HymnResponseMapper.toDto(hymn);

  }

  @Get()
  findAll(
    @Query() query: FindAllHymnsDto,
  ) {

    const filter = new HymnFilter(
      query.page,
      query.limit,
      query.search,
      query.favorite,
      query.author,
      query.category,
    );

    return this.findAllHymnsUseCase.execute(filter);

  }

}