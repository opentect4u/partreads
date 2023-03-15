import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css',
              '../../assets/Forpage404/css/font-awesome.css',
              '../../assets/Forpage404/css/apps.css',
              '../../assets/Forpage404/css/apps_inner.css',
              '../../assets/Forpage404/css/res.css']
})
export class NotfoundComponent implements OnInit {
  Code:any;
  // Error_name:any=' ';
  constructor(private router:ActivatedRoute,private route:Router) { }
  
  ngOnInit(): void {
    this.router.params.forEach((params: any) => {
      // this.Error_name = params['id'];
      // console.log("code:" +params['id'])
      this.Code= params['id'];
      console.log("Code=" +this.Code);
      // console.log("Name=" +this.Error_name);
    });
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
