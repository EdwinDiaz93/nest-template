import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
import { SeedService } from './seed.service';

@Controller('seed')
@ApiTags('Seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Get()
  runSeed() {
    return this.seedService.runSeed()
  }


}
