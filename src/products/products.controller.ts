import {
  Controller,
  UseGuards,
  Get,
  Post,
  Put,
  Delete,
  Request,
  Body,
  Param,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductsService } from './products.service';
import * as interfaces from './products.interfaces';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() data: interfaces.CreateProductDto) {
    const product = await this.productsService.create(data, req.user.userId);
    return {
      success: true,
      _id: product._id,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Request() req,
    @Body() data: interfaces.UpdateProductDto,
    @Param('id') id: string,
  ) {
    await this.productsService.update(id, data, req.user.userId);
    return {
      success: true,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string) {
    await this.productsService.removeProduct({
      _id: id,
      userId: req.user.userId,
    });
    return {
      success: true,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@Request() req) {
    return this.productsService.listProducts({
      userId: req.user.userId,
    });
  }
}
