import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './cart/entities/cart-item.entity';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/entities/cart.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [CartItem, Cart],
      synchronize: true,
    }),
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
