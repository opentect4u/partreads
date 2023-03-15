/*
*This is the Ts part of header component of the website.
*This header is used in the pages without login
*/

import { Component, OnInit } from '@angular/core';
import { AllbooksComponent } from '../allbooks/allbooks.component';
import { AutosearchService } from '../allbooks/autosearch.service';
import { Router } from '@angular/router';
import { UtilityTService } from '../Utility/utility-t.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-index-nav-header',
  templateUrl: './index-nav-header.component.html',
  styleUrls: ['./index-nav-header.component.css',
  '../../assets/cssfiles/bootstrap.css',
  '../../assets/cssfiles/font-awesome.css',
  '../../assets/chosen/chosen.css',
  '../../assets/cssfiles/apps.css',
  '../../assets/cssfiles/res.css',
  '../../assets/cssfiles/apps_inner.css']
})
export class IndexNavHeaderComponent implements OnInit {
  constructor(private utilyT:UtilityTService,private router:Router,private bk:AutosearchService,private allbooksrc:AllbooksComponent) {
    this.utilyT.sendShowHideContactButton(false);
  }
  keyword='book_name'; // Usage: This variable is used in Autocomplete Search, value define in this variable will be the search key for Autocomplete Search.
  bookname:any;// Usage : This variable is used in Autocomplete Search, values define in this variable will come in autocomplete search dropdown.
  bookname1:any;// Usage : This variable is used for filtering data in autocomplete after search , this filtered value will then assign in the variable name "bookname" (show in autocomplete search dropdown).
  obj:any; // Usage : After converting the data (come from backend) from string to Javascript object,assign into this variable name "obj".
  search_value:any;//Usage : It contains the book name, search from the autocomplete   
  ngOnInit(): void {
    /* Call APi: For getting all activated book list published by the publisher and show this list of books in Autocomplete search dropdown */
    this.bk.getbook().subscribe(data=>{
      // Parsing data come from backend //
      this.obj=JSON.parse(data);
      // End //

      // Getting all books list and showing it in the autocomplete search dropdown //
      this.bookname=this.obj.message;
      this.bookname1=this.obj.message;
      // End //
    })
    /* End */
  }
  selectEvent(event:any){ // Select Event From Autocomplete Search: This event is fired when someone select book from autocomplete search dropdown
    this.search_value=event.book_name; // It contains the book name (select from the autocomplete search dropdown)
    this.router.navigate(['/allbooks',this.search_value]);// After select the particular book from Autocomplete Search dropdown, navigate to Allbooks page against the selected book(URL:'/allbooks/book_name')
    this.allbooksrc.change_address(this.search_value)// For getting the book details against the selected book
  }
  onChangeSearch(event:any){//Change Event from Autocomplete Search: This event emitted when an input is changed.
    this.search_value=event; //It Contains the search value from the Autocomplete Search
    function checkKey(val:any) {//Function for get filtered books in autocomplete dropdown search(returns searched books)
     return (val.book_name.toUpperCase()).includes(event.toUpperCase())||(val.isbn_no.toUpperCase()).includes(event.toUpperCase())||(val.author_name.toUpperCase()).includes(event.toUpperCase())||(val.publisher_name.toUpperCase()).includes(event.toUpperCase());
    }
    this.bookname=this.bookname1.filter(checkKey);//Assign filtered books in the variable name "bookname"
  }
  onFocused(event:any){}
  show_result(){  //Click Event : After click on search button  
    this.router.navigate(['/allbooks',this.search_value]);// After select the particular book from Autocomplete Search dropdown, navigate to Allbooks page against the selected book(URL:'/allbooks/book_name')
    this.allbooksrc.change_address(this.search_value)// For getting the book details against the selected book
    
}
contact_us(){//Click Event : After click on Contact Us button, Automatically Scroll to the bottom of the page and reach to the Enquiry form
  if(localStorage.getItem('ad1')=='')
 {
   window.scrollTo(0, document.body.scrollHeight);
  history.scrollRestoration = "manual";
}
  else
  {
    this.router.navigate(['/'])
    window.scrollTo(0, document.body.scrollHeight);
  history.scrollRestoration = "manual";
  }
}
}
