import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;
}

export class UpdateProductDto {
  @IsOptional()
  name: string;

  @IsOptional()
  price: number;
}

export class ProductRo {
  _id: string;
  name: string;
  price: number;
}
