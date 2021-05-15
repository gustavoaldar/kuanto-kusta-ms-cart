import { Cart } from 'src/cart/entities/cart.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: string;

  @ManyToOne(() => Cart, (cart) => cart.products, {
    onDelete: 'CASCADE',
  })
  cart: Cart;
}
