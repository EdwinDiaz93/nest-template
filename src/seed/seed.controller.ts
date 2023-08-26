import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Auth } from 'src/auth/decorators';
import { validRols } from 'src/auth/interfaces/valid-rols.enum';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Get()
  runSeed() {    
    return this.seedService.runSeed()
  }
 

}
