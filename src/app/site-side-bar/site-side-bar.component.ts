import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../globalvar/global';
import { PubsiderbarinfoService } from '../pubsiderbarinfo.service';

@Component({
  selector: 'app-site-side-bar',
  templateUrl: './site-side-bar.component.html',
  styleUrls: ['./site-side-bar.component.css',
    '../../assets/cssfiles/bootstrap.css',
    '../../assets/cssfiles/font-awesome.css',
    '../../assets/chosen/chosen.css',
    '../../assets/cssfiles/apps.css',
    '../../assets/cssfiles/res.css',
    '../../assets/cssfiles/apps_inner.css']
})
export class SiteSideBarComponent implements OnInit {
  apg: any;

  constructor(private pubinfo: PubsiderbarinfoService) { }
  upload_show: any;
  dashboard_show = "active";
  list_show: any;
  hist_show:any;
  dashboard: string = '';
  list: string = '';
  upload: string = '';
  userdata: any;
  name: string = '';
  email: string = '';
  p_phone:string='';
  p_street:string='';
  p_city:string='';
  p_pin:string='';
  p_state:string='';
  p_country:string='';
  file!:any;
  hist:any;
  profile:any;
  active_pg:any;
  notif:any;
  notif_show:any;
  ngOnInit(): void {
      this.dashboard = GlobalConstants.routerURL + '/publisher/publisher-dashboard';
    this.upload = GlobalConstants.routerURL + '/publisher/ebookupload';
    this.list = GlobalConstants.routerURL + '/publisher/book-list';
    this.notif=GlobalConstants.routerURL+'/publisher/notification';
    this.hist=GlobalConstants.routerURL+'/publisher/paymenthistory';
    this.apg=GlobalConstants.routerURL+'/publisher/activepages'
    if (window.location.href == this.dashboard)
      this.dashboard_show = "active";
    else if (window.location.href == this.upload) { this.upload_show = "active"; this.dashboard_show = ""; }
    else if (window.location.href == this.list) { this.list_show = "active"; this.dashboard_show = ""; }
    else if (window.location.href == this.notif) { this.notif_show = "active"; this.dashboard_show = ""; }
    else if(window.location.href==this.hist){this.hist_show="active";this.dashboard_show=""}
    else if(window.location.href==this.apg){this.active_pg="active";this.dashboard_show=""}
    else{}
    this.pubinfo.get_pub_info(localStorage.getItem('pub-id')).subscribe(data => {
      // console.log(data)
      this.userdata = data;

      var obj = JSON.parse(this.userdata);
      this.name = obj.message[0].name;
      this.email = obj.message[0].email;
      this.p_phone=obj.message[0].phone;
      this.p_street=obj.message[0].street;
      this.p_city=obj.message[0].city;
      this.p_state=obj.message[0].state;
      this.p_country=obj.message[0].country;
      this.p_pin=obj.message[0].pincode;
      this.profile=obj.message[0].image_url;
    })

  }
  // make_active_up() {
  //   this.upload_show = "active";
  //   this.dashboard_show = "";
  // }
  // make_active_db() { this.dashboard_show = "active" }
  // make_active_list() { this.list_show = "active"; this.dashboard_show = ""; }
  // make_active_notif(){this.notif_show="active";this.dashboard_show="";}
  // make_active_hist(){this.hist_show="active";this.dashboard_show=""}
  // make_pg_active(){this.active_pg="active"; this.dashboard_show=""}
}
