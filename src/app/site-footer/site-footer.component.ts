import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';//package for check internet connection
import { UtilityTService } from '../Utility/utility-t.service';
@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.css',
  '../../assets/cssfiles/bootstrap.css',
  '../../assets/cssfiles/font-awesome.css',
  '../../assets/chosen/chosen.css',
  '../../assets/cssfiles/apps.css',
  '../../assets/cssfiles/res.css',
  '../../assets/cssfiles/apps_inner.css']
})
export class SiteFooterComponent implements OnInit {
  isConnected = true;
  connectedmodal:any;
  notconnectedmodal:any
  notconnectedmodal1:any
  noInternetConnection = false;
  constructor(private utiliT:UtilityTService, private connectionService: ConnectionService) {
    this.connectionService.monitor().subscribe(isConnected => { 
      this.isConnected = isConnected;
      if (this.isConnected) { //Whenever netconnection is back,then it will throw a modal 
        this.noInternetConnection = false;
        //alert("You are back online");
        this.notconnectedmodal1=document.getElementById('myModal1')
        this.notconnectedmodal1.style.display='block';
        this.notconnectedmodal=document.getElementById('myModal11')
        this.notconnectedmodal.style.display='none';
      }
      else {//if there is no internet connection then it will open a modal automatically,and display message "No Internet Connection"
        this.noInternetConnection = true;
        //alert("You are offline");
        this.notconnectedmodal1=document.getElementById('myModal1')
        this.notconnectedmodal1.style.display='none';
        this.notconnectedmodal=document.getElementById('myModal11')
        this.notconnectedmodal.style.display='block';
      }
      console.log(this.isConnected);
      this.utiliT.sendIsConnected(this.isConnected);
    })
   }

  ngOnInit(): void {
    // this.notconnectedmodal=document.getElementById('myModal')
    //     this.notconnectedmodal.style.display='block';
  }
  
hide(){this.notconnectedmodal=document.getElementById('myModal11')
this.notconnectedmodal.style.display='none';}
hide1(){this.notconnectedmodal1=document.getElementById('myModal1')
this.notconnectedmodal1.style.display='none';
// if(localStorage.getItem('address')!='/publisher/ebookupload')
// location.reload();
}
}
