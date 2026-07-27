import { Injectable } from '@nestjs/common';
import { Hymn } from '../../domain/entities/hymn.entity';
import { HymnRepository } from '../../domain/repositories/hymn.repository';
import { PrismaService } from '../../../../../shared/infrastructure/prisma/prisma.service';
import { HymnMapper } from '../../application/mappers/hymn.mapper';
import { PaginatedResult } from '../../domain/pagination/paginated-result';
import { HymnFilter } from '../../domain/value-objects/hymn-filter.vo';
import { Prisma } from '@prisma/client';


@Injectable()
export class PrismaHymnRepository implements HymnRepository {

    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(hymn: Hymn): Promise<Hymn> {

        const created = await this.prisma.hymn.create({

            data: HymnMapper.toPersistence(hymn)

        });

        return HymnMapper.toDomain(created);

    }

    async update(hymn: Hymn): Promise<Hymn> {
        throw new Error('Method not implemented.');
    }

    async delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async findById(id: string): Promise<Hymn | null> {

        const hymn = await this.prisma.hymn.findUnique({

            where: {
                id,
            },

        });

        if (!hymn) {
            return null;
        }

        return HymnMapper.toDomain(hymn);

    }

    async findAll(
        filter: HymnFilter,
    ): Promise<PaginatedResult<Hymn>> {

        const where = {

            ...(filter.search && {
                OR: [
                    {
                        title: {
                            contains: filter.search,
                            mode: Prisma.QueryMode.insensitive,
                        },
                    },
                    {
                        author: {
                            contains: filter.search,
                            mode: Prisma.QueryMode.insensitive,
                        },
                    },
                ],
            }),

            ...(filter.favorite !== undefined && {
                favorite: filter.favorite,
            }),

            ...(filter.author && {
                author: filter.author,
            }),

            ...(filter.category && {
                category: filter.category,
            }),

        };

        const skip = (filter.page - 1) * filter.limit;

        const [rows, total] = await Promise.all([

            this.prisma.hymn.findMany({
                where,
                skip,
                take: filter.limit,
                orderBy: {
                    number: 'asc',
                },
            }),

            this.prisma.hymn.count({
                where,
            }),

        ]);

        return new PaginatedResult(
            rows.map(HymnMapper.toDomain),
            filter.page,
            filter.limit,
            total,
        );

    }

}