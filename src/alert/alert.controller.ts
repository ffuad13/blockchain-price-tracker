import { Controller, Post, Body } from '@nestjs/common';
import { AlertService } from './alert.service';
import { CreateAlertDto } from 'src/dto/create-alert.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Alert } from 'src/entities/alert.entity';

@ApiTags('alerts')
@Controller('alerts')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new price alert' })
  @ApiResponse({ status: 201, description: 'The alert has been successfully created.', type: Alert })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createAlert(@Body() createAlertDto: CreateAlertDto) {
    const newAlert = await this.alertService.createAlert(createAlertDto);
    return {
      message: 'Alert created successfully',
      alert: newAlert,
    };
  }
}
