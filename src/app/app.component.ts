import { Component, Directive, ElementRef, Renderer } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from '@angular/http';
import {DataTableDirectives} from 'angular2-datatable/datatable';
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
    ...ROUTER_DIRECTIVES,
    DataTableDirectives,
    XLarge
  ],
  template: `
  
  <div class="usa-grid">
    <div class="usa-width-one-whole">
      <h1>Test Search Results</h1>
    </div>
    <div class="usa-width-one-whole">
      <div>
        <span x-large>Search keywords: {{ keyword }}</span>
      </div>
      <form>
        <input type="text" [value]="keyword" (input)="keyword = $event.target.value" autofocus>
        <button type="submit" class="usa-button-primary" type="submit" (click)="runSearch()">Search</button>
      </form>
      <br><br>

      <strong></strong>
      
      <table class="table table-striped" [mfData]="data.results" #mf="mfDataTable" [mfRowsOnPage]="5">
          <thead>
          <tr>
              <th style="width: 20%">
                  <mfDefaultSorter by="programNumber">Program #</mfDefaultSorter>
              </th>
              <th style="width: 50%">
                  <mfDefaultSorter by="organizationId">Organization</mfDefaultSorter>
              </th>
              <th style="width: 10%">
                  <mfDefaultSorter by="title">Title</mfDefaultSorter>
              </th>
              <th style="width: 20%">
                  <mfDefaultSorter by="assistanceTypes">AssistanceType</mfDefaultSorter>
              </th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let item of mf.data">
              <td>{{item.programNumber}}</td>
              <td>{{item.organizationId}}</td>
              <td class="text-right">{{item.title}}</td>
              <td>{{item.assistanceTypes | uppercase}}</td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
              <td colspan="4">
                  <mfBootstrapPaginator [rowsOnPageSet]="[5,10,25]"></mfBootstrapPaginator>
              </td>
          </tr>
          </tfoot>
      </table>
      
      <pre>{{ data | json }}</pre>
      <home></home>
    </div>
  </div>
  `
})
export class App {
  keyword: string = '';
  data = {};
  server: string;

  constructor(public http: Http) { }

  ngOnInit() {

    // use services for http calls 

    this.http.get('http://gsaiae-cfda-modern-search-dev02.reisys.com/v1/search')
      .subscribe(res => {
        this.data = res.json();
      });
  }

  runSearch(){
    var url = `http://gsaiae-cfda-modern-search-dev02.reisys.com/v1/search?keyword=${this.keyword}`;
    console.log(url);
    this.http.get(url)
      .subscribe(res => {
        this.data = res.json();
      });
  }

}
