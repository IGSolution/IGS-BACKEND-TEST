import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import { Connection, createConnection } from 'mongoose';

@Module({
    imports: [ConfigModule.forRoot()],
    providers: [
        {
        provide: 'MONGO_DB',
            useFactory: async (configService: ConfigService) => {
                const uri = configService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/mydatabase';
                const client = new MongoClient(uri);
                await client.connect();
                return client.db();
            },
        inject: [ConfigService],
        },
    ],
    exports: ['MONGO_DB'],
    })
export class MongoDBModule {}