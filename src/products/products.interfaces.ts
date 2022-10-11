import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;
}

export class ProductRo {
  _id: string;
  name: string;
  price: number;
}
