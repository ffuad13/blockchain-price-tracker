import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendAlertDto {
  @ApiProperty({ example: 'Ethereum', description: 'Blockchain chain (e.g., ethereum or polygon)' })
  @IsString()
  @IsNotEmpty()
  chain: string;

  @ApiProperty({ example: 1000, description: 'Target price to set an alert for', minimum: 0 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 'user@example.com', description: 'Email to send alert to' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
