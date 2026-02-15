import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderRequestDto, CreateOrderResponseDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body() body: CreateOrderRequestDto,
  ): Promise<CreateOrderResponseDto> {
    return this.orderService.createOrder(body);
  }
}
