import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from 'src/entities/alert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alert])],
  providers: [AlertService],
  controllers: [AlertController],
  exports: [AlertService]
})
export class AlertModule {}
