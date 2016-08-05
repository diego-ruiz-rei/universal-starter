import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  moduleId: __filename,
  selector: 'home',
  styleUrls: [
    'home.style.css'
  ],
  templateUrl: 'home.template.html'
})
export class Home {
	keyword: string = '';
	constructor(private router: Router) { }
	ngOnInit() {

	}

	runSearch(){
		this.router.navigate(['/search']);
	}
}
