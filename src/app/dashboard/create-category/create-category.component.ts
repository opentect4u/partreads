import { Component, OnInit } from '@angular/core';
import {CatserveService} from '../../catserve.service'
import { ICat } from '../../cat';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css',
  '../../../assets/adminassets/css/font-awesome.css',
  '../../../assets/adminassets/css/apps.css',
  '../../../assets/adminassets/css/apps_inner.css',
  '../../../assets/adminassets/css/res.css']
})
export class CreateCategoryComponent implements OnInit {
  check_response:any;
  constructor(private toastr:ToastrManager,private cats:CatserveService,private router:Router,private authserv:AuthService, private cookieService:CookieService) { }
  nm=new ICat('');
  userData:any;
  messagealert='*Please provide a category';
  messageshow=false;
  ngOnInit(): void {
    localStorage.setItem('address','/admin/createcategory');
  }
  create_cat(v:string){
  if(v!=''){
    this.messageshow=false;
    this.nm.name=v;
   this.cats.getData(this.nm).subscribe(data=>{console.log('Success!',data);
    this.userData=data;
    if(this.userData.success > 0){
      this.router.navigate(['/admin/category']).then(()=>{
        this.toastr.successToastr(v+' added successfully as category','')
      });
    }
    else{
      this.toastr.infoToastr(v+' already exists','')
    }
  },error=>{
    this.toastr.errorToastr('Someething went wrong! please try again later','')
  })
  //this.category.push(v);
  }
  else
  this.messageshow=true;
}

 
}
