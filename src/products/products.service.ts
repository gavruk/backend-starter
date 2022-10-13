import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as interfaces from './products.interfaces';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findOne(query: object): Promise<ProductDocument | undefined> {
    return this.productModel.findOne(query);
  }

  async listProducts(query: object): Promise<interfaces.ProductRo[]> {
    const docs = await this.productModel.find(query);
    return docs.map((d) => ({
      _id: d._id.toString(),
      name: d.name,
      price: d.price,
    }));
  }

  async removeProduct({
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
