import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from 'src/entities/alert.entity';
import { PriceService } from 'src/price/price.service';
import {Price} from 'src/entities/price.entity';
import { MoralisService } from 'src/moralis/moralis.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Alert]),TypeOrmModule.forFeature([Price])],
  providers: [AlertService, PriceService, MoralisService, MailService],
  controllers: [AlertController],
  exports: [AlertService]
})
export class AlertModule {}
