import {Component, Input} from '@angular/core';

@Component({
  selector: 'ngx-snack',
  template: `
      <div class="snack" [ngStyle]="{background: background, color: color}" [ngClass]="customClass">
          <ng-content></ng-content>
      </div>
  `
})
export class SnackComponent {
  @Input() background;
  @Input() color;
  @Input() customClass;
}
