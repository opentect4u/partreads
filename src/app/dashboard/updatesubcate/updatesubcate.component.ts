import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { pluck } from 'rxjs/operators';
// import { ConsoleReporter } from 'jasmine';
import { CatShowService } from '../cat-show.service';
import { UpdatesubService } from './updatesub.service';

@Component({
  selector: 'app-updatesubcate',
  templateUrl: './updatesubcate.component.html',
  styleUrls: ['./updatesubcate.component.css',
  '../../../assets/adminassets/css/font-awesome.css',
  '../../../assets/adminassets/css/apps.css',
  '../../../assets/adminassets/css/apps_inner.css',
  '../../../assets/adminassets/css/res.css']
})
export class UpdatesubcateComponent implements OnInit {
  SubCat_name:any;
  SubCat_id:any;
  Cat_id:any;
  category:any=[];
  userData:any=[];
  chooseoption=true;
  messagealert='*Please provide a sub-category';
  messagealert1='*Please provide a category';
  messageshow=false;
  flag=0;
  check_response:any;
  colorControl = new FormControl('');
  constructor(private toastr:ToastrManager,private route:Router,private router:ActivatedRoute,private cats:CatShowService,private updatesubcate:UpdatesubService) { 
    this.cats.getData().pipe(pluck('message')).subscribe(data=>{
      console.log(data)
    this.userData=data;
  });
  }

  ngOnInit(): void {
    localStorage.setItem('address','/admin/updatesubcategory');
   
    this.router.params.forEach((params: any) => {
      this.SubCat_name= params['id'];
      this.SubCat_id  = params['id1'];
      this.Cat_id = params['id2'].toString();
      console.log(this.Cat_id);
      this.flag=this.Cat_id!='' ? 1 : 0;
     
  });
  }
  dispcat(v:Event){
    console.log((v.target as HTMLSelectElement).value)
    if((v.target as HTMLSelectElement).value=='')
    this.flag=0;
    else
    this.flag=1;
  }
  update_Subcat(v1:any,cat_id:any){
    console.log(v1) 
    if(v1=='')
     this.messageshow=true;
  else if(this.flag==0)
     this.chooseoption=false;
   else{
     this.flag=1;
     this.messageshow=false;
     this.chooseoption=true;
    console.log(this.SubCat_id);
    console.log(cat_id);
    console.log(v1);
    this.updatesubcate.update_subcat(this.SubCat_id,cat_id,v1).subscribe(data=>{console.log(data)
      this.check_response=JSON.parse(data);
      // console.log(this.check_response.success)
      if(this.check_response.success == 1){
        this.route.navigate(['admin/subcategory']).then(()=>{
                 this.toastr.successToastr('Sub-category updated successfully','');
        });
      }
      else if(this.check_response.success == 0){
      this.toastr.infoToastr(v1+' already exists under '+$('#exampleFormControlSelect1 :selected').text(),'');
      }
      else{

      }
    },error=>{
      this.toastr.errorToastr('Something went wrong! please try again later','');
    });
  }
  }
}
