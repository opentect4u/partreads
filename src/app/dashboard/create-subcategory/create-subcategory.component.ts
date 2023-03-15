import { Component, OnInit } from '@angular/core';
import { IsubCat } from '..//../subcats'
import { CatShowService } from '../cat-show.service';
import { SubcreateService } from '../../subcreate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-create-subcategory',
  templateUrl: './create-subcategory.component.html',
  styleUrls: ['./create-subcategory.component.css',
  '../../../assets/adminassets/css/font-awesome.css',
  '../../../assets/adminassets/css/apps.css',
  '../../../assets/adminassets/css/apps_inner.css',
  '../../../assets/adminassets/css/res.css']
})
export class CreateSubcategoryComponent implements OnInit {
 

  category:any=[];
  sub_cat:any=[];
  nm=new IsubCat('','');
  userData:any=[];
  chooseoption=true;
  messagealert='*Please provide a category';
  messagealert1='*Please provide a sub-category';
  messageshow=false;
  flag=0;
  id:any;
  get_cat:any=[];
  constructor(private toastr:ToastrManager,private cate: CatShowService,private route:ActivatedRoute,private subcats:CatShowService,private router:Router, private cats:SubcreateService,private cookieService:CookieService,private authserv:AuthService) { }
  
  ngOnInit(): void {
    this.route.params.forEach((params: any) => {
      this.id = params['id'];
   });

    localStorage.setItem('address','/admin/createsubcategory/'+this.id);
    this.subcats.getData().subscribe(data=>{console.log('Success!',data);
    // this.get_cat.length=0;
     this.userData=data;
    this.userData=this.userData.message
    //  for(let i=0;i<this.userData.message.length;i++)
    //  {
    //    this.get_cat.push({id:this.userData.message[i]._id,name:this.userData.message[i].name});
    //    this.category[i]=this.userData.message[i].name;
    //    this.sub_cat[i]=this.userData.message[i]._id;
      
       //console.log(this.userData.message[i].name);
    //  }
   })
  }
  dispcat(v:Event){
    if((v.target as HTMLSelectElement).value=='')
    this.flag=0;
    else
    this.flag=1;
  }
  create_subcat(v:any,v1:any){
   
  if(v=='')
     this.messageshow=true;
  else if(this.flag==0)
     this.chooseoption=false;
   else{
     this.flag=1;
     this.messageshow=false;
     this.chooseoption=true;
      this.nm.category_id=v1;
       this.nm.name=v;   
    console.log(this.nm.name+" "+this.nm.category_id);
    this.cats.putdata(this.nm).subscribe(data=>{console.log('Success!',data);
    this.userData=data;
    if( this.userData.success > 0){
      this.router.navigate(['/admin/subcategory']).then(()=>{
        this.toastr.successToastr(v+' added successfully under '+$('#Category_id :selected').text(),'')
      });
    }
    else{
      this.toastr.infoToastr(v+' already exists under '+$('#Category_id :selected').text(),'');
    }
    // console.log(this.userData.message.name);
  },error=>{
    this.toastr.errorToastr('Something went wrong! please try again later','');
  })
   
  }}
  // logout(){ this.authserv.logout();
  //   this.cookieService.delete('cookie-name');
  //   this.router.navigate(['/admin/login']);}
}
