import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findOne(query: object): Promise<ProductDocument | undefined> {
    return this.productModel.findOne(query);
  }

  async list(query: object): Promise<ProductDocument[]> {
    return this.productModel.find(query);
  }

  async remove({
    _id,
    userId,
  }: {
    _id: string;
    userId: string;
  }): Promise<void> {
    await this.productModel.remove({ _id, userId });
  }

  async create(
    data: Partial<Product>,
    userId: string,
  ): Promise<ProductDocument | undefined> {
    return this.productModel.create({
      name: data.name,
      price: data.price,
      userId,
    });
  }

  async update(
    id: string,
    data: Partial<Product>,
    userId: string,
  ): Promise<void> {
    await this.productModel.update(
      {
        _id: id,
        userId,
      },
      {
        $set: data,
      },
    );
  }
}
