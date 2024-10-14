import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Price } from 'src/entities/price.entity';
import { MoralisService } from 'src/moralis/moralis.service';
import { AlertModule } from 'src/alert/alert.module';
import { AlertService } from 'src/alert/alert.service';
import {Alert} from 'src/entities/alert.entity';
import { MailService } from 'src/mail/mail.service';


@Module({
  imports: [TypeOrmModule.forFeature([Price]), TypeOrmModule.forFeature([Alert]), AlertModule],
  providers: [PriceService, MoralisService, AlertService, MailService],
  controllers: [PriceController],
  exports: [PriceService]
})
export class PriceModule {}
