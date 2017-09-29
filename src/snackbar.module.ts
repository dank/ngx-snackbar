import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

export * from './service/snackbar.service';

import {SnackbarService} from './service/snackbar.service';
import {SnackComponent} from './snack/snack.component';
import {SnackbarComponent} from './snackbar/snackbar.component';
import {SafeHtmlPipe} from './pipe/safe-html.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SnackbarComponent, SnackComponent, SafeHtmlPipe],
  exports: [SnackbarComponent, SnackComponent],
  providers: [SnackbarService]
})
export class SnackbarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SnackbarModule,
      providers: [SnackbarService]
    };
  }
}