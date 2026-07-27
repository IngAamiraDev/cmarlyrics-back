import { Hymn as PrismaHymn } from '@prisma/client';

import { Hymn } from '../../domain/entities/hymn.entity';

export class HymnMapper {

    static toDomain(prisma: PrismaHymn): Hymn {

        return new Hymn(
            prisma.id,
            prisma.number ?? 0,
            prisma.title,
            prisma.author,
            prisma.lyrics,
            prisma.page,
            prisma.favorite,
            prisma.createdAt,
            prisma.updatedAt,
        );

    }

    static toPersistence(entity: Hymn) {

        return {
            number: entity.number,
            title: entity.title,
            author: entity.author,
            lyrics: entity.lyrics,
            page: entity.page,
            favorite: entity.favorite,
        };

    }

}