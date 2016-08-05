import { Component } from '@angular/core';
import { Http,RequestOptions, URLSearchParams } from '@angular/http';
import {DataTableDirectives} from 'angular2-datatable/datatable';

@Component({
  moduleId: __filename,
  selector: 'search',
  styleUrls: [
    'search.style.css'
  ],
  directives: [
    DataTableDirectives
  ],
  templateUrl: 'search.template.html'
})
export class Search {
	data = {};
	keyword: string = '';
	constructor(public http: Http) { }
	ngOnInit() {
		this.runSearch();
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
