import { IsNotEmpty } from 'class-validator';

export class CartDto {
  @IsNotEmpty()
  readonly userId: string;
  @IsNotEmpty()
  readonly productId: string;
}
