import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css',
              '../../assets/Forpage404/css/font-awesome.css',
              '../../assets/Forpage404/css/apps.css',
              '../../assets/Forpage404/css/apps_inner.css',
             '../../assets/Forpage404/css/res.css']
})
export class ErrorPageComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  goback() {
    if (localStorage.getItem('u-id') != null || localStorage.getItem('pub-id') != null || localStorage.getItem('token')) {
      this.route.navigate([localStorage.getItem('address')]);
    }
    else {
      this.route.navigate(['']);

    }
  }



}
