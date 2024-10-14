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
    const addresses = chain === 'Ethereum' ? this.MORALIS_ADDRESS : '0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7'
    const chains = chain === 'Ethereum' ? EvmChain.ETHEREUM : EvmChain.POLYGON;
    const response = await Moralis.EvmApi.token.getTokenPrice({
      chain: chains,
      address: addresses,
      exchange: "uniswapv3"
    });

    return response.toJSON();
  }
}