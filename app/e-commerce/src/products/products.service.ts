import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductModel } from 'databases/products.schema';
import { CreateProductDTO } from './dtos/product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
//import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
//import { Credentials } from 'aws-sdk';
@Injectable()
export class ProductsService {
  private s3: S3;
  constructor(
    private config: ConfigService,
    @InjectModel('Product') private readonly productModel: ProductModel,
  ) {
    this.s3 = new S3({
      region: 'AWS_REGION',
      accessKeyId: 'AWS_ACCESS_KEY',
      secretAccessKey: 'AWS_SECRET_ACCESS_KEY',
    });
  }

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

  async uploadFile(file: Buffer, filename: string) {
    try {
      const response = await s3.upload({
        Bucket: 'lhetool',
        Key: filename,
        Body: file,
        ContentType: 'image/jpeg',
        ACL: 'public-read'
      });
      console.log('File uploaded successfully:', response);
      return response;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file to S3');
    }
  }
}
