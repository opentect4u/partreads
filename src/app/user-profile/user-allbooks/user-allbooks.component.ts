import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { isObject } from 'util';
import { BookSearchService } from '../book-search.service';
import { ShowcatsuserService } from '../showcatsuser.service';
import { ShowsubatsuserService } from '../showsubatsuser.service';
import { UserbookdetailspageComponent } from '../userbookdetailspage/userbookdetailspage.component';
import { Router } from '@angular/router';
import { UserbookdetailsService } from '../userbookdetails.service';
import { SearchbycategoryService } from './searchbycategory.service';
import {trigger, style, animate, transition} from '@angular/animations';
@Component({
  selector: 'app-user-allbooks',
  templateUrl: './user-allbooks.component.html',
  styleUrls: ['./user-allbooks.component.css',
    '../../../assets/cssfiles/font-awesome.css',
    '../../../assets/chosen/chosen.css',
    '../../../assets/cssfiles/apps.css',
    '../../../assets/cssfiles/res.css',
    '../../../assets/cssfiles/apps_inner.css'],
   animations: [
    trigger('fade', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate(1000, style({opacity: 1}))
      ]) 
    ])
  ]
})
export class UserAllbooksComponent implements OnInit {

  constructor(private router: Router, private subcatuser: ShowsubatsuserService, private catuser: ShowcatsuserService, private search: BookSearchService, private search1: SearchbycategoryService, private search2: SearchbycategoryService) { }
  bookdata: any = []
  p:number=1;
  catdata: any = [];
  subcatdata: any = [];
  searchitem: string = '';
  sub_value: string = '';
  cat_value: string = '';
  nomatch:string='';
  showmsg:boolean=false;
  loader=true;
  ngOnInit(): void {

    console.log(localStorage.getItem('search-item'))
    this.search.getsearch(localStorage.getItem('search-item'), localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).subscribe(data => {console.log(data);
      
      var obj = JSON.parse(data);
      this.loader=false;
      this.bookdata.length = 0;
      // this.searchitem = obj.search_value;
      this.searchitem != localStorage.getItem('search-item');
      this.loader=false;
      if (obj.message.length==0)
       { this.nomatch="No matches found"; this.showmsg=true;}
      else {
        this.showmsg=false;
        for (let i = 0; i < obj.message.length; i++) {
          this.bookdata[i] = obj.message[i];
        }
      }
      
   })

    this.catuser.get_categories(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).subscribe(data => {//console.log(data);
      var obj1 = JSON.parse(data);
      for (let i = 0; i < obj1.message.length; i++) {
        this.catdata[i] = obj1.message[i];
      }
    })
    this.subcatuser.get_subcategories(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).subscribe(data => {//console.log(data);
      var obj2 = JSON.parse(data);
      for (let i = 0; i < obj2.message.length; i++) {
        this.subcatdata[i] = obj2.message[i];
      }
    })
  }
  show_cat() {
    this.search1.getsearch(this.cat_value, this.sub_value, localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'), localStorage.getItem('search-item')).subscribe(data => {
      this.bookdata.length = 0;
      var obj = JSON.parse(data);
      // console.log(data);
      if (obj.success != 1 || obj.message.length == 0)
      {this.nomatch="No matches found"; this.showmsg=true;}
      else {
        for (let i = 0; i < obj.message.length; i++) {
          this.bookdata[i] = obj.message[i];
        }
      }
    })

  }
  show_subcat() {
    this.search2.getsearch(this.cat_value, this.sub_value, localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'), localStorage.getItem('search-item')).subscribe(data => {

      //console.log(data);
      this.bookdata.length = 0;
      var obj = JSON.parse(data);
      //console.log(data);
      if (obj.success != 1 || obj.message.length == 0)
      {this.nomatch="No matches found"; this.showmsg=true;}
      else {
        for (let i = 0; i < obj.message.length; i++) {
          this.bookdata[i] = obj.message[i];
        }
      }

    })
  }
  showdetails(v: any, v2: any) {
    localStorage.setItem('user_book_id', v);
    localStorage.setItem('user_pub_id', v2);
    this.router.navigate(['/user/bookdetails']);
  }
}
