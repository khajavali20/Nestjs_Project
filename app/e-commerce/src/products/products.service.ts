import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductModel } from 'databases/products.schema';
import { CreateProductDTO } from './dtos/product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: ProductModel,
  ) {}

  async addProduct(data: CreateProductDTO) {
    await this.productModel.create({ ...data });
    return { status: true };
  }

  async getProducts(id: string, name: string) {
    const product = await this.productModel.findById(
      { _id: id },
      { name: name },
    );

    if (!product) {
      throw new BadRequestException('Invalid product name');
    }
    return product;
  }

  async getAllProducts() {
    const products = await this.productModel.find();
    return products;
  }

  async updateProduct(id: string, data: UpdateProductDTO) {
    const product = await this.productModel.updateOne(
      {
        _id: id,
      },
      { $set: { ...data } },
    );
    if (!product) {
      throw new BadRequestException('Unable to update the product');
    }
    return { status: true };
  }

  async deleteProduct(id: string, name: string) {
    const product = await this.productModel.findOne({ _id: id, name });
    const update = await this.productModel.updateOne(product.deleteOne());
    if (!update) {
      throw new BadRequestException('Unable to delete the product');
    }
    return { status: true };
  }
}
