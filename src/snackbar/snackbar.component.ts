import {Component, Input} from '@angular/core';

@Component({
  selector: 'ngx-snackbar',
  template: `
      <div class="snack" [ngStyle]="{background: background, color: color}" [ngClass]="customClass">
          <ng-content></ng-content>
      </div>
  `
})
export class SnackbarComponent {
  @Input() background;
  @Input() color;
  @Input() customClass;
}
