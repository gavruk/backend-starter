import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProductDTO {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;
}

export class ProductRO {
  _id: string;
  name: string;
  price: number;
}
