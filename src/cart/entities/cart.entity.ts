import { CartItem } from 'src/cart/entities/cart-item.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  shoppingCartId: number;

  @Column()
  userId: string;

  @OneToMany(() => CartItem, (product) => product.cart, {
    cascade: true,
  })
  products: CartItem[];
}
