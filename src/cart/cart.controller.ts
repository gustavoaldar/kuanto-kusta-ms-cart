import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dtos/cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() cartDto: CartDto) {
    return await this.cartService.create(cartDto);
  }
  @Put()
  @UsePipes(ValidationPipe)
  async remove(@Body() cartDto: CartDto) {
    return await this.cartService.remove(cartDto);
  }
  @Get(':userId')
  async get(@Param('userId') userId: string) {
    return await this.cartService.find(userId);
  }
}
