import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { validRols } from 'src/auth/interfaces/valid-rols.enum';
import { User } from 'src/auth/entities/user.entity';
import { Product } from './entities';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @Auth(validRols.user)
  @ApiResponse({ status: 201, description: 'Product was created', type:Product })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorize' })  
  @ApiResponse({ status: 403, description: 'Forbidden Resource' })  
  create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User
  ) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto) {
    console.log(paginationDto);

    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  @Auth()
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term);
  }

  @Patch(':id')
  @Auth(validRols.user)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User,
  ) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @Auth(validRols.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
