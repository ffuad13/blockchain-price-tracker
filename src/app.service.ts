import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'An API for setting alerts and tracking blockchain prices using Moralis SDK';
  }
}
