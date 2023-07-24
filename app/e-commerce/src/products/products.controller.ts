import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
// import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post('create')
  async addProduct(@Body() data: CreateProductDTO) {
    return this.productService.addProduct(data);
  }

  /* @Post('upload')
  @UseInterceptors(FileInterceptor(''))
  async addProfilePicture(@Body() file: Express.Multer.File) {
    return this.productService.addProfilePicture(file);
  } */

  @Get('one/:id')
  async getProduct(@Param('id') id: string, @Query('name') name: string) {
    return this.productService.getProducts(id, name);
  }

  @Get('all')
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Patch('update/:id')
  async updateProducts(
    @Param('id') id: string,
    @Body() data: UpdateProductDTO,
  ) {
    return this.productService.updateProduct(id, data);
  }

  @Delete('one/:id')
  async deleteProduct(@Param('id') id: string, @Query('name') name: string) {
    return this.productService.deleteProduct(id, name);
  }
}
