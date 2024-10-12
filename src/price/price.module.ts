import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Price } from 'src/entities/price.entity';
import { MoralisService } from 'src/moralis/moralis.service';


@Module({
  imports: [TypeOrmModule.forFeature([Price]),],
  providers: [PriceService, MoralisService],
  controllers: [PriceController],
  exports: [PriceService]
})
export class PriceModule {}
