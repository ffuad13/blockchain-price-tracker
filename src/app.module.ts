import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PriceModule } from './price/price.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import {databaseConfig} from 'config/database.config';
import { AlertModule } from './alert/alert.module';
import { SchedulerService } from './scheduler/scheduler.service';
import { MoralisModule } from './moralis/moralis.module';
import { MailService } from './mail/mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: '.env'}),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => databaseConfig(configService)
    }),
    PriceModule,
    AlertModule,
    MoralisModule,
  ],
  controllers: [AppController],
  providers: [AppService, SchedulerService, MailService],
})
export class AppModule {}
