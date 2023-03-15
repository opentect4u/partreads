import { Component, OnInit } from '@angular/core';
import {trigger, style, animate, transition} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { PubverService } from './pubver.service';
@Component({
  selector: 'app-acc-verification-pub',
  templateUrl: './acc-verification-pub.component.html',
  styleUrls: ['./acc-verification-pub.component.css'],
  animations: [
    trigger('fade', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate(1000, style({opacity: 1}))
      ]) 
    ])
  ]
})
export class AccVerificationPubComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private ver:PubverService) { }
  id:any;
  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.ver.verfiy_email(this.id).subscribe(data=>{console.log(data)})
  }

}
