import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop({ type: 'ObjectId' })
  userId: ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
