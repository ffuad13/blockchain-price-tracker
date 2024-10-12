import { Injectable } from '@nestjs/common';
import { Cron,} from '@nestjs/schedule';
import { PriceService } from 'src/price/price.service';

@Injectable()
export class SchedulerService {
  constructor(private priceService: PriceService) {}

  @Cron('0 */5 * * * *')
  async handlePriceTracking() {
    console.log('Running scheduled price tracking...');

    await this.priceService.trackPrices();
  }
}
