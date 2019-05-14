import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SnackbarService} from '../service/snackbar.service';

@Component({
  selector: 'ngx-snackbar',
  template: `
      <div class="snackbars" [ngClass]="position || 'bottom-right'">
          <ngx-snack *ngFor="let snackbar of snacks" [background]="snackbar.background || background"
                        [customClass]="snackbar.customClass || customClass"
                        [color]="snackbar.color || color || calcTextColor(snackbar.background || background)">
              <div class="snack-text" [innerHtml]="snackbar.msg | safeHtml">

              </div>
              <div *ngIf="snackbar.action.text" class="snack-action" (click)="snackbar.action.onClick()"
                   [ngStyle]="{color: snackbar.action.color || accent}">
                  {{snackbar.action.text}}
              </div>
          </ngx-snack>
      </div>
  `
})
export class SnackbarComponent {
  @Input() position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  @Input() max: number;
  @Input() background: string;
  @Input() accent: string;
  @Input() color: string;
  @Input() customClass: any;
  @Input() timeout: number;

  @Output() public onAdd: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onRemove: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onClear: EventEmitter<boolean> = new EventEmitter<boolean>();

  snacks: Array<{
    id: string, msg: string, timeout?: number, color?: string, background?: string, customClass?: any, action?: {
      text: string, onClick?: Function, color?: string
    }, onAdd?: Function, onRemove?: Function, timeoutObj?: any
  }> = [];

  constructor(private snackbarService: SnackbarService) {
    this.snackbarService.get()
      .subscribe(snack => {
        if (snack.action === 'add') {
          this.add(snack.data);
        } else if (snack.action === 'remove') {
          this.remove(snack.id);
        } else if (snack.action === 'clear') {
          this.clear();
        }
      });
  }

  add(snack) {
    let timeout;
    const id = this.uuid();

    if (this.max && this.max > 0 && this.snacks.length === this.max) {
      this.remove(this.snacks[0].id);
    }

    if (snack.timeout || this.timeout) {
      timeout = setTimeout(() => {
        this.remove(id);
      }, snack.timeout || this.timeout)
    }

    const data = Object.assign({id: id, timeoutObj: timeout}, snack);

    if (snack.action) {
      const that = this;
      const fcn = snack.action.onClick;
      snack.action.onClick = () => {
        fcn && typeof fcn === 'function' && fcn(data);
        that.remove(id);
      };
    }

    if (snack.onAdd) {
      snack.onAdd(data);
    }

    if (this.onAdd) {
      this.onAdd.emit(data);
    }

    this.snacks.push(data);
  }

  remove(id) {
    const snack = this.snacks.find(obj => obj.id === id);

    if (snack) {
      if (snack.onRemove) {
        snack.onRemove(snack);
      }

      if (this.onRemove) {
        this.onRemove.emit(snack);
      }

      if (snack.timeoutObj) {
        clearTimeout(snack.timeoutObj);
      }
    }

    this.snacks = this.snacks.filter(obj => obj.id !== id);
  }

  clear() {
    // this.snacks.forEach(snack => {
    //   this.remove(snack.id);
    // });

    this.snacks = [];

    if (this.onClear) {
      this.onClear.emit(true);
    }
  }

  uuid() {
    // tslint:disable:no-bitwise
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    // tslint:enable:no-bitwise
  }

  calcTextColor(background) {
    if (!background) {
      return null;
    }

    function hexToRgb(hex) {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
      });

      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    const rgb = hexToRgb(background);
    if (!rgb) {
      return null;
    }

    const color = [rgb.r / 255, rgb.g / 255, rgb.b / 255];

    for (let i = 0; i < color.length; ++i) {
      if (color[i] <= 0.03928) {
        color[i] = color[i] / 12.92;
      } else {
        color[i] = Math.pow((color[i] + 0.055) / 1.055, 2.4);
      }
    }

    const l = 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2];

    if (l > 0.179) {
      return '#000';
    } else {
      return '#fff';
    }
  }
}
