import { Injectable } from '@nestjs/common';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import * as dotenv from 'dotenv';

dotenv.config()

@Injectable()
export class MoralisService {
  private readonly MORALIS_ADDRESS: string;

  constructor() {
    this.MORALIS_ADDRESS = process.env.MORALIS_ADDRESS;
  }

  async getChain(chain: string) {
    const chains = chain == 'Ethereum' ? EvmChain.ETHEREUM : EvmChain.POLYGON;
    const response = await Moralis.EvmApi.token.getTokenPrice({
      chain: chains,
      address: this.MORALIS_ADDRESS,
    });

    return response.toJSON();
  }
}