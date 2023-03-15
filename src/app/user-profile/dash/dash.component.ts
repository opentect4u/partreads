
import { Component, OnInit } from '@angular/core';
import { map, pluck } from 'rxjs/operators';
import { pub } from 'src/app/pub';
import { UtilityTService } from 'src/app/Utility/utility-t.service';
import { UserbookshowService } from '../userbookshow.service';
import { DashboardserviceService } from './dashboardservice.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  constructor(private utilty:UtilityTService,private userbook:UserbookshowService,private dash_data:DashboardserviceService) { }
  load:boolean=false;
  recent_share:any;//Usage: use for store latest 5 shared books by user
  show_notif=true;//Usage:  use for  showing loader and books in this page
  check_response:any;//Usage: use for get response after a coupon has been applied 
  // bookdata:any;
  min:any=0;
  max:any=4;//Usage:use to set response limit.
  books:any=[];//Usage:use to store  all recently uploaded book
  errormessage:any;//Usage: use to store error message
  ngOnInit(): void {
    localStorage.setItem('address','/publisher/publisher-dashboard');
    //-----api used to get books and book details (Api: /api/user/dsahboarddata)------//
    this.dash_data.get_dashboard_data(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).pipe(map(x => JSON.parse(x))).subscribe(data => {
      this.recent_share = data;   
    //-----api used to get recently uploaded books (Api: /api/user/allbooks)------//
      this.userbook.getbooks(localStorage.getItem('u-id'),localStorage.getItem('user-type_user'),localStorage.getItem('remember_token'),this.min,this.max,'','','','').pipe(map(x => JSON.parse(x), pluck("message"))).subscribe(data=>{
      this.books = data.message;
      },(errorMessage) => {  //Error Handling Part 
        var substring = errorMessage.substr(0, 3);
        if (substring != 'und') {                      
          this.errormessage = errorMessage.substr(11, 132);  
        }
        else {
          substring = errorMessage.substr(18, 27);
        }
        this.utilty.showToastr('Server did not respond,Please try again later','E');
       })
      this.show_notif=false;//hide the loader
    })
  }
  //----------Click event of recently viewed book and recently shared book (user navigate to the partcular book details page on which the user clicked)(Route: http://localhost:4200/#/user/bookdetails)----------------//
  go_to_book(id:any,pub:any){
    console.log('sayantika');
    console.log(id,pub);
    this.utilty.go_to_user_bookDeatils_page(id,pub);
    
  }
  //-----------End---------------------------------//
  //----------Click event of recently Uplodaed book and uploaded book (user navigate to the particular book details page on which the user clicked)(Route: http://localhost:4200/#/user/bookdetails)----------------//
  gotobookdetailspage(book_id:any,pub_id:any){
    // console.log(book_id,pub_id)
    this.utilty.go_to_user_bookDeatils_page(book_id,pub_id);
  }
  //----------End-----------------//
}
