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
  async add(@Body() cartDto: CartDto) {
    return await this.cartService.add(cartDto);
  }
  @Post(':userId')
  async create(@Param('userId') userId: string) {
    return await this.cartService.create(userId);
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
