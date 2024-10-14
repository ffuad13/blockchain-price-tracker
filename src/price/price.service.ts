import { Injectable } from '@nestjs/common';
import { Price } from 'src/entities/price.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoralisService } from 'src/moralis/moralis.service';
import { Alert } from 'src/entities/alert.entity';
import { MailService } from 'src/mail/mail.service';
import {ethToBtcRates} from 'src/utilities/conversion';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price) private priceRepository: Repository<Price>,
    private moralisService: MoralisService,
    @InjectRepository(Alert)
    private alertRepository: Repository<Alert>,
    private mailService: MailService,
  ) {}

  async getPrice(chain: string) {
    const price = this.moralisService.getChain(chain);
    return (await price).nativePrice?.value;
  }

  async savePrice(chain: string): Promise<void> {
    const price = await this.getPrice(chain);
    const priceEntity = this.priceRepository.create({ chain, price });
    await this.priceRepository.save(priceEntity);
  }

  async swapEthToBtc(
    ethAmount: number,
  ): Promise<{ btcAmount: number; totalFeeEth: number; totalFeeUsd: number }> {
    // const ethToBtcRate: number = 0.065;
    const getEthToBtcRate = await ethToBtcRates(`${ethAmount}`)
    const ethToBtcRate: number = parseInt(getEthToBtcRate.result.estimate)


    // const ethToUsdRate: number = 2000;
    const getEthToUsdRate = await this.moralisService.getChain('Ethereum');
    const ethToUsdRate = getEthToUsdRate.usdPrice;
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
    await this.savePrice('Ethereum');
    await this.savePrice('Polygon');
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
      groupedPrices[hour].push({
        chain: price.chain,
        price: price.price,
        time: price.timestamp,
      });
    });

    return groupedPrices;
  }

  // Price Alerts
  async checkPriceAlerts() {
    const etherPrice = parseInt(await this.getPrice('Ethereum'));
    const polyPrice = parseInt(await this.getPrice('Polygon'));

    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    const previousPrices = await this.priceRepository
      .createQueryBuilder('price')
      .where('price.createdAt >= :oneHourAgo', { oneHourAgo })
      .orderBy('price.createdAt', 'DESC')
      .getMany();

    if (previousPrices.length === 0) {
      return;
    }

    // Get the last price of each chain
    const lastEthereumPrice = previousPrices.find(p => p.chain === 'Ethereum')?.price;
    const lastPolygonPrice = previousPrices.find(p => p.chain === 'Polygon')?.price;

    if (typeof lastEthereumPrice === 'number' && typeof etherPrice === 'number') {
      // Check if Ethereum has increased by more than 3%
      if (etherPrice > lastEthereumPrice * 0.03) {
        await this.sendAlerts('Ethereum', etherPrice);
      }
    }

    if (typeof lastPolygonPrice === 'number' && typeof polyPrice === 'number') {
      // Check if Polygon has increased by more than 3%
      if (polyPrice > lastPolygonPrice * 0.03) {
        await this.sendAlerts('Polygon', polyPrice);
      }
    }
  }

  // Send alerts for a specific chain and price
  async sendAlerts(chain: string, price: number) {
    const activeAlerts = await this.alertRepository.find({
      where: { chain, isActive: true },
    });

    for (const alert of activeAlerts) {
      if (price >= alert.targetPrice) {
        await this.mailService.sendAlertEmail(alert.email, chain, price);
        console.log('Sending price alert...');
      }
    }
  }
}
