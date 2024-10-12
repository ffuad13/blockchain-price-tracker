import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Price {
	/**
   * Price
   * @example eth
   */
	@PrimaryGeneratedColumn()
	id: number

	@ApiProperty({ example: 'eth', description: 'Ethereum' })
	@Column()
	chain: string

	@Column('decimal', { precision: 30, scale: 2 })
  price: string

	@CreateDateColumn()
	timestamp: Date
}