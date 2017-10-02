import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

export * from './service/snackbar.service';

import {SnackbarService} from './service/snackbar.service';
import {SnackbarComponent} from './snackbar/snackbar.component';
import {SnackbarsComponent} from './snackbars/snackbars.component';
import {SafeHtmlPipe} from './pipe/safe-html.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SnackbarComponent, SnackbarsComponent, SafeHtmlPipe],
  exports: [SnackbarComponent, SnackbarsComponent],
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