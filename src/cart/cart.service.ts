import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/cart/entities/cart-item.entity';
import { Repository } from 'typeorm';
import { CartDto } from './dtos/cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private productsRepository: Repository<CartItem>,
  ) {}

  async find(userId: string): Promise<any> {
    const cart: Cart = await this.getCartByUserId(userId);
    const cartItems: CartItem[] = await this.productsRepository.find({
      cart: cart,
    });
    return { cart, items: cartItems };
  }

  async add(cartDto: CartDto): Promise<void> {
    const { userId, productId } = cartDto;
    const existsUserCart = await this.getCartByUserId(userId);
    if (existsUserCart) {
      await this.productsRepository.save({ productId, cart: existsUserCart });
    } else {
      const cart = await this.cartRepository.save({ userId });
      await this.productsRepository.save({ productId, cart });
    }
  }

  async create(userId: string): Promise<void> {
    const existsUserCart = await this.getCartByUserId(userId);
    if (!existsUserCart) {
      await this.cartRepository.save({ userId });
    }
  }

  async remove(cartDto: CartDto): Promise<void> {
    const { userId, productId } = cartDto;
    const existsUserCart = await this.getCartByUserId(userId);
    const existsItemUserCart = await this.productsRepository.findOne({
      productId,
      cart: existsUserCart,
    });
    if (existsItemUserCart) {
      this.productsRepository.delete(existsItemUserCart);
    }
  }

  private async getCartByUserId(userId: string): Promise<Cart> {
    return await this.cartRepository.findOne({ userId });
  }
}
