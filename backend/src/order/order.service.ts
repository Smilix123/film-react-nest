import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FilmsRepository } from '../repository/films.repository';
import {
  CreateOrderRequestDto,
  CreateOrderResponseDto,
  OrderDto,
} from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(
    req: CreateOrderRequestDto,
  ): Promise<CreateOrderResponseDto> {
    if (!Array.isArray(req.tickets) || req.tickets.length === 0) {
      throw new BadRequestException('Нет билетов в заказе');
    }

    const items: OrderDto[] = [];

    for (const ticket of req.tickets) {
      const film = await this.filmsRepository.findById(ticket.film);
      if (!film) {
        throw new BadRequestException(`Фильм ${ticket.film} не найден`);
      }

      const session = film.schedule.find((s) => s.id === ticket.session);
      if (!session) {
        throw new BadRequestException(`Сеанс ${ticket.session} не найден`);
      }

      const key = `${ticket.row}:${ticket.seat}`;
      if (
        ticket.row < 1 ||
        ticket.row > session.rows ||
        ticket.seat < 1 ||
        ticket.seat > session.seats
      ) {
        throw new BadRequestException('Неверный номер места');
      }
      if (session.taken.includes(key)) {
        throw new BadRequestException('Место уже занято');
      }

      await this.filmsRepository.addTakenSeat(ticket.film, ticket.session, key);

      items.push({
        ...ticket,
        id: randomUUID(),
      });
    }

    return {
      total: items.length,
      items,
    };
  }
}
