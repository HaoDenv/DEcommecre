import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../model/order';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return OrderStatus.toString(value);
  }

}
