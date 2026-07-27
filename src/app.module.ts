import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { PrismaModule } from './shared/infrastructure/prisma/prisma.module';
import { PresentationModule } from './modules/presentation/presentation.module';
import { HymnsModule } from './modules/catalog/hymns/hymns.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),

        LoggerModule.forRoot({
            pinoHttp: {
                transport:
                    process.env.NODE_ENV !== 'production'
                        ? { target: 'pino-pretty' }
                        : undefined,
            },
        }),

        PrismaModule,
        PresentationModule,
        HymnsModule,
    ],
})
export class AppModule { }