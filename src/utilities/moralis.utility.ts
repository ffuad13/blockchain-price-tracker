// import Moralis from 'moralis';
// import {EvmChain} from '@moralisweb3/common-evm-utils';
// import * as dotenv from 'dotenv';

// dotenv.config()

// const MORALIS_API_KEY = process.env.MORALIS_API_KEY
// const MORALIS_ADDRESS = process.env.MORALIS_ADDRESS

// const getChain = async (chain: string) => {
// 	const chains = chain === 'eth' ? EvmChain.ETHEREUM : EvmChain.POLYGON
// 	const response = await Moralis.EvmApi.token.getTokenPrice({
// 		chain: chains,
// 		address: MORALIS_ADDRESS
// 	})

// 	return response.toJSON()
// }

// const start = async () => {
// 	await Moralis.start({
// 		apiKey: MORALIS_API_KEY
// 	})
// }
// start()

// export {getChain}