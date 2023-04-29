import { ConfigService } from '@nestjs/config';
import configuration from 'src/config/configuration';

export const configService = new ConfigService(configuration());
