import { Controller, Get, Query } from '@nestjs/common';
import { PriceService } from 'src/price/price.service';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('price')
@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  @ApiOperation({ summary: 'Get Price of Ethereum or Polygon' })
  async price(@Query('chain') chain: string): Promise<any> {
    const res = await this.priceService.getPrice(chain);
    return {
      message: `Price of ${chain} retrieved`,
      price: res,
    };
  }

  @Get('swap-rate')
  @ApiOperation({ summary: 'Swap Rate Ethereum to Bitcoin' })
  async swap(@Query('ethAmount') ethAmount: string): Promise<any> {
    const {
      btcAmount,
      totalFeeEth,
      totalFeeUsd,
    }: { btcAmount: number; totalFeeEth: number; totalFeeUsd: number } =
      await this.priceService.swapEthToBtc(parseInt(ethAmount));
    return {
      message: 'Swap rate retrieved',
      BTC: btcAmount,
      fee: {
        ETH: totalFeeEth,
        USD: totalFeeUsd,
      },
    };
  }

  @Get('hourly')
  @ApiOperation({
    summary: 'Get the prices for each hour within the last 24 hours',
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns hourly prices of Ethereum and Polygon for the last 24 hours.',
  })
  async getHourlyPrices() {
    const prices = await this.priceService.getPricesForLast24Hours();
    return prices;
  }
}
