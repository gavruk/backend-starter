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
  async create(@Request() req, @Body() data: interfaces.ProductDto) {
    return this.productsService.create(data, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Request() req,
    @Body() data: interfaces.ProductDto,
    @Param('id') id: string,
  ) {
    await this.productsService.update(id, data, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string) {
    await this.productsService.remove({ _id: id, userId: req.user.userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@Request() req) {
    return this.productsService.list({ userId: req.user.userId });
  }
}
