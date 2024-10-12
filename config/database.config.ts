import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {ConfigService} from '@nestjs/config';

export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
	type: 'mysql',
	host: configService.get<string>("DATABASE_HOST"),
	port: parseInt(configService.get<string>("DATABASE_PORT")),
	username: configService.get<string>("DATABASE_USER"),
	password: configService.get<string>("DATABASE_PASSWORD"),
	database: configService.get<string>("DATABASE_NAME"),
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
	synchronize: !!configService.get<string>("DATABASE_SYNC")
})