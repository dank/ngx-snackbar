import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class SnackbarService {
  private snackService = new Subject<any>();

  get() {
    return this.snackService.asObservable();
  }

  add(data: {
    msg: string, timeout?: number, background?: string, color?: string, customClass?: any,
    action?: { text: string, onClick?: Function, color?: string }, onAdd?: Function, onRemove?: Function
  }) {
    this.snackService.next({
      action: 'add',
      data: data
    });
  }

  remove(id: string) {
    this.snackService.next({action: 'remove', id: id});
  }

  clear() {
    this.snackService.next({action: 'clear'});
  }
}
