import { Hymn } from '../../domain/entities/hymn.entity';
import { HymnResponseDto } from '../dto/responses/hymn-response.dto';

export class HymnResponseMapper {

  static toDto(entity: Hymn): HymnResponseDto {

    return {

      id: entity.id!,
      number: entity.number,
      title: entity.title,
      author: entity.author,
      lyrics: entity.lyrics,
      page: entity.page,
      favorite: entity.favorite,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,

    };

  }

}