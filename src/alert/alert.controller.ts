import { Controller, Post, Body } from '@nestjs/common';
import { AlertService } from './alert.service';
import { CreateAlertDto } from 'src/dto/create-alert.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { Alert } from 'src/entities/alert.entity';
import { SendAlertDto } from 'src/dto/send-alert.dto';
import { PriceService } from 'src/price/price.service';

@ApiTags('alerts')
@Controller('alerts')
export class AlertController {
  constructor(
    private readonly alertService: AlertService,
    private readonly priceService: PriceService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new price alert' })
  @ApiResponse({
    status: 201,
    description: 'The alert has been successfully created.',
    type: Alert,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createAlert(@Body() createAlertDto: CreateAlertDto) {
    const newAlert = await this.alertService.createAlert(createAlertDto);
    return {
      message: 'Alert created successfully',
      alert: newAlert,
    };
  }

  @Post('send')
  @ApiOperation({ summary: 'Immediately send alert to email' })
  @ApiResponse({
    status: 201,
    description: 'The alert has been successfully Send.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiProperty({})
  async sendAlert(@Body() sendAlertDto: SendAlertDto) {
    const { chain, email, price }: SendAlertDto = sendAlertDto;
    await this.priceService.sendAlerts(chain, price, email);
    return {
      message: 'Email alert sended',
    };
  }
}
