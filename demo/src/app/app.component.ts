import {Component} from '@angular/core';
import {SnackbarService} from 'ngx-snackbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  globalPosition = 'bottom-right';
  globalMax = 3;
  globalTimeout = 5000;
  globalBackground = '#343434';
  globalColor: string;
  globalAccent = '#2196f3';

  localMsg: string;
  localTimeout: number;
  localBackground: string;
  localColor: string;
  localAction: string;
  localAccent: string;

  invalidForm: boolean;

  constructor(private snackbarService: SnackbarService) {
  }

  add() {
    if (!this.localMsg) {
      return this.invalidForm = true;
    }

    this.invalidForm = false;

    this.snackbarService.add({
      msg: this.localMsg,
      timeout: this.localTimeout,
      color: this.localColor,
      background: this.localBackground,
      action: {
        text: this.localAction,
        color: this.localAccent
      }
    });
  }

  clear() {
    this.snackbarService.clear();
  }
}
