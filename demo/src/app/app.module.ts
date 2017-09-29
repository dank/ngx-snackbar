import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {SnackbarModule} from 'ngx-snackbar';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SnackbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
