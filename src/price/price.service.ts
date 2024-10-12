import { Injectable } from '@nestjs/common';
import { Price } from 'src/entities/price.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {MoralisService} from 'src/moralis/moralis.service';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price) private priceRepository: Repository<Price>, private moralisService: MoralisService,
  ) {}

  async getPrice(chain: string) {
    const price = this.moralisService.getChain(chain)
    return (await price).nativePrice?.value
  }

  async savePrice(chain: string): Promise<void> {
    const price = await this.getPrice(chain);
    const priceEntity = this.priceRepository.create({chain, price})
    await this.priceRepository.save(priceEntity);
  }

  async swapEthToBtc(
    ethAmount: number,
  ): Promise<{ btcAmount: number; totalFeeEth: number; totalFeeUsd: number }> {
    const ethToBtcRate: number = 0.065;
    const ethToUsdRate: number = 2000;
    const feePercentage = 0.0003; // 0.03%

    const totalFeeEth = ethAmount * feePercentage;

    const netEthAmount = ethAmount - totalFeeEth;

    const btcAmount = netEthAmount * ethToBtcRate;

    const totalFeeUsd = totalFeeEth * ethToUsdRate;

    return {
      btcAmount,
      totalFeeEth,
      totalFeeUsd,
    };
  }

  async trackPrices(): Promise<void> {
    await this.savePrice('Ethereum')
		await this.savePrice('Polygon')
  }

  async getPricesForLast24Hours(): Promise<any> {
    const now = new Date();
    const oneDayAgo = new Date();
    oneDayAgo.setHours(now.getHours() - 24);

    const prices = await this.priceRepository
      .createQueryBuilder('price')
      .where('price.timestamp BETWEEN :oneDayAgo AND :now', { oneDayAgo, now })
      .orderBy('price.timestamp', 'ASC')
      .getMany();

    return this.groupPricesByHour(prices);
  }

  private groupPricesByHour(prices: Price[]) {
    const groupedPrices = {};

    prices.forEach((price) => {
      const hour = price.timestamp.getHours();
      if (!groupedPrices[hour]) {
        groupedPrices[hour] = [];
      }
      groupedPrices[hour].push({ chain: price.chain, price: price.price, time: price.timestamp });
    });

    return groupedPrices;
  }
}
