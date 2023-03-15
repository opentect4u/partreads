import { Component, OnInit } from '@angular/core';
import { ViewDetailsService } from './view-details.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pub-details',
  templateUrl: './pub-details.component.html',
  styleUrls: ['./pub-details.component.css',
  '../../../../assets/adminassets/css/font-awesome.css',
  '../../../../assets/adminassets/css/apps.css',
  '../../../../assets/adminassets/css/apps_inner.css',
  '../../../../assets/adminassets/css/res.css']
})
export class PubDetailsComponent implements OnInit {

  constructor(private view:ViewDetailsService,private activatedRoute:ActivatedRoute) { }
  load:boolean=false;
  id:any;
  details:any;
  p_name:any;
  p_email:any;
  p_phone:any;
  p_street:any;
  p_city:any;
  p_state:any;
  p_country:any;
  p_pin:any;
  profile:any;
  p_add:any;
  p_pincode:any;
  b_name:any;
  acc_no:any;
  ifsc_code:any;
  gst_no:any;
  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id']
    this.view.getDetails(this.id).subscribe(data=>{console.log(data)
    this.details=JSON.parse(data);
    console.log(this.details.message[0]?.hasOwnProperty('pincode'));
    
    this.p_name = this.details.message[0]?.name;
    this.p_email = this.details.message[0]?.email;
    this.p_phone = this.details.message[0]?.phone==undefined?'':this.details.message[0]?.phone;
    this.p_street = this.details.message[0]?.street==undefined?'':this.details.message[0]?.street;
    this.p_city = this.details.message[0]?.city==undefined?'':this.details.message[0]?.city;
    this.p_state = this.details.message[0]?.state==undefined?'':this.details.message[0]?.state;
    this.p_country = this.details.message[0]?.country==undefined?'':this.details.message[0]?.country;
    this.p_pin = this.details.message[0]?.hasOwnProperty('pincode')  ? this.details.message[0]?.pincode : 'N/A';
    this.profile = this.details.message[0]?.hasOwnProperty('image_url') ? this.details.message[0]?.image_url :'' ;
    this.p_add= this.details.message[0]?.hasOwnProperty('street') ? this.details.message[0]?.street : ''+' '+this.details.message[0]?.hasOwnProperty('city') ? this.details.message[0]?.city : ''+' '+this.details.message[0]?.hasOwnProperty('state') ? this.details.message[0]?.state : ''+' '+this.details.message[0]?.hasWonProperty('country') ? this.details.message[0]?.country:'';
    this.p_pincode=this.details.message[0]?.pincode=='' || this.details.message[0]?.pincode==undefined || this.details.message[0]?.pincode==null? '' : this.details.message[0]?.pincode;
    this.b_name=this.details.message[0]?.bank_name==null || this.details.message[0]?.bank_name==undefined || this.details.message[0]?.bank_name==''? 'N/A' : this.details.message[0]?.bank_name;
    this.ifsc_code=this.details.message[0]?.ifsc_code==null || this.details.message[0]?.ifsc_code==undefined || this.details.message[0]?.ifsc_code=='' ? 'N/A' : this.details.message[0]?.ifsc_code;
    this.acc_no=this.details.message[0]?.acc_no==null || this.details.message[0]?.acc_no==undefined || this.details.message[0]?.acc_no=='' ? 'N/A' : this.details.message[0]?.acc_no;
    this.gst_no=this.details.message[0]?.gst_no==null || this.details.message[0]?.gst_no==undefined || this.details.message[0]?.gst_no=='' ? 'N/A' : this.details.message[0]?.gst_no;
    this.load=true; 
  })
  }

}
