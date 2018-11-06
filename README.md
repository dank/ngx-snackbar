# ngx-snackbar
> Angular 7 component for Snackbar (AKA Toast) notifications. 

[Demo](http://kyung.ca/ngx-snackbar/)

## Installation
    npm install --save ngx-snackbar

## Usage

### Import default styles

Import styles.css into your app. This step is optional, feel free to theme the snackbars to your liking.

`index.html`
```html
<link rel="stylesheet" href="node_modules/ngx-snackbar/bundles/style.css">
```

**Angular CLI**

`.angular-cli.json`
```json
...
  "styles": [
   "styles.css",
   "../node_modules/ngx-snackbar/bundles/style.css"
  ],
...
```

### Import `SnackbarModule`

```javascript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SnackbarModule} from 'ngx-snackbar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SnackbarModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

**SystemJS**
```javascript
System.config({
  map: {
    'ngx-snackbar': 'node_modules/ngx-snackbar/bundles/ngx-snackbar.umd.js'
  }
});
```

### Place the `ngx-snackbar` tag on your template

```html
<ngx-snackbar></ngx-snackbar>
```

**Options**

Use these properties to customize the snackbar component.

| Name | Description | Type | Default | Optional |
| --- | --- | --- | --- | --- |
| position | The position where the snackbar appears | `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right` | `bottom-right` | true |
| max | The maximum number of snackbars allowed on screen | number | (Infinite) | true |
| timeout  | Number of milliseconds before the snackbar closes | number | (Infinite) | true |
| color | Text color in hex | string | `auto` | true |
| background | Background color in hex | string | `#343434` | true |
| customClass | Custom class to append to the snackbar | string | | true |
| accent | Action button color. Requires `action.text` | string | `#2196f3` | true |

**Events**

| Name | Description | Return |
| --- | --- | --- |
| onAdd | Callback gets triggered on snackbar add | Object | 
| onRemove | Callback gets triggered on snackbar remove | Object |
| onClear | Callback gets triggered on snackbar clear | boolean |

###### *Object: `add` method options plus `id` string.*



### Use the `SnackbarService` to control snackbars

Import `SnakckbarService` from `ngx-snackbar`:

```typescript
import {Component} from '@angular/core';
import {SnackbarService} from 'ngx-snackbar';

@Component({
  selector: 'app-root',
  template: `
    <ngx-snackbar></ngx-snackbar>
  `
})
export class AppComponent {
  constructor(private snackbarService: SnackbarService) {}
}
```

**Methods**

- `add(options: Object)`

All options will override global values set on `ngx-snackbar`.

| Name | Description | Type | Default | Optional |
| --- | --- | --- | --- | --- |
| msg  | Message to display in the snackbar (HTML accepted) | string | | false |
| timeout  | Number of milliseconds before the snackbar closes | number | (Infinite) | true |
| color | Text color in hex | string | `auto` | true |
| background | Background color in hex | string | `#343434` | true |
| customClass | Custom class to append to the snackbar | string | | true |
| action.text | Action button text. *Snackbar will automatically dismiss on click* | string | | true |
| action.color | Action button color. Requires `action.text` | string | `#2196f3` | true |
| action.onClick | Action button callback. Requires `action.text` | Function | | true |
| onAdd | Callback gets triggered on snackbar add | Function | | true | 
| onRemove | Callback gets triggered on snackbar remove | Function | | true |

- `remove(id: string)`

Remove snackbar on screen by ID.

- `clear()`

Clears all snackbars on screen.

## Example
```typescript
import {Component} from '@angular/core';
import {SnackbarService} from 'ngx-snackbar';

@Component({
  selector: 'app-root',
  template: `
      <button (click)="add()">Add Snackbar</button>
      <br>
      <button (click)="clear()">Clear</button>
      
      <ngx-snackbar [position]="'bottom-center'" [max]="3"></ngx-snackbar>
  `
})
export class AppComponent {
  constructor(private snackbarService: SnackbarService) {
  }

  add() {
    const _this = this;
    this.snackbarService.add({
      msg: '<strong>Message sent.</strong>',
      timeout: 5000,
      action: {
        text: 'Undo',
        onClick: (snack) => {
          console.log('dismissed: ' + snack.id);
          
          _this.undo();
        },
      },
      onAdd: (snack) => {
        console.log('added: ' + snack.id);
      },
      onRemove: (snack) => {
        console.log('removed: ' + snack.id);
      }
    });
  }

  clear() {
    this.snackbarService.clear();
  }
  
  undo() {
    ...
  }
}
```

## Credits
Thanks [angular-library-starter](https://github.com/robisim74/angular-library-starter) for the compilation scripts.

## License 
[MIT](/LICENSE)
