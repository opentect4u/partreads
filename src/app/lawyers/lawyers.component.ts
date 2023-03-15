import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lawyers',
  templateUrl: './lawyers.component.html',
  styleUrls: ['./lawyers.component.css',
  '../../assets/cssfiles/bootstrap.css',
  '../../assets/cssfiles/font-awesome.css',
  '../../assets/chosen/chosen.css',
  '../../assets/cssfiles/apps.css',
  '../../assets/cssfiles/res.css',
  '../../assets/cssfiles/apps_inner.css' ]
})
export class LawyersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('ad1','/lawyers');

  }

}
