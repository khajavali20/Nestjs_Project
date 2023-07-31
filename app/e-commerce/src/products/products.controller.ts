import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post('create')
  async addProduct(@Body() data: CreateProductDTO) {
    return this.productService.addProduct(data);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 20 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.productService.uploadFile(file.buffer, file.originalname);
  }

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
