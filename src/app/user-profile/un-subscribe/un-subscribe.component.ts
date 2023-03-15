import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-un-subscribe',
  templateUrl: './un-subscribe.component.html',
  styleUrls: ['./un-subscribe.component.css',
  '../../../assets/cssfiles/font-awesome.css',
  '../../../assets/chosen/chosen.css',
  '../../../assets/cssfiles/apps.css',
  '../../../assets/cssfiles/res.css',
  '../../../assets/cssfiles/apps_inner.css']
})
export class UnSubscribeComponent implements OnInit {

  constructor(private activatedroute:ActivatedRoute) { }
  email_phone:any;
  ngOnInit(): void {
    this.email_phone=this.activatedroute.snapshot.params['email'];
  }
  submit(form:Form){
    console.log(form)
  }

}
