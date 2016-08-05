import { Component, Directive, ElementRef, Renderer } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from '@angular/http';
import { Home } from './home';

// templateUrl example

//
/////////////////////////
// ** Example Directive
// Notice we don't touch the Element directly

@Directive({
  selector: '[x-large]'
})
export class XLarge {
  constructor(element: ElementRef, renderer: Renderer) {
    // ** IMPORTANT **
    // we must interact with the dom through -Renderer-
    // for webworker/server to see the changes
    renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
    // ^^
  }
}


/////////////////////////
// ** MAIN APP COMPONENT **
@Component({
  selector: 'app', // <app></app>
  directives: [
    ROUTER_DIRECTIVES,
    XLarge
  ],
  template: `
  
  <div class="usa-grid">
    <main>
      <router-outlet></router-outlet>
    </main>
  </div>
  `
})
export class App {
  
  server: string;

  constructor(public http: Http) { }

  

}
