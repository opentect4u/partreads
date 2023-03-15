import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrManager } from 'ng6-toastr-notifications';
import { CatserveService } from 'src/app/catserve.service';
import { CatShowService } from '../cat-show.service';
import { UpdatecatserveService } from './updatecatserve.service';
@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css',
  '../../../assets/adminassets/css/font-awesome.css',
  '../../../assets/adminassets/css/apps.css',
  '../../../assets/adminassets/css/apps_inner.css',
  '../../../assets/adminassets/css/res.css']
})
export class UpdateCategoryComponent implements OnInit {
 title:string='';
 id:string='';
 input:any;
 division:any;
 Cat_id:any;
 Cat_name:any;
 messagealert='*Please provide a category';
 messageshow=false;
 errormessage :any;
 p_tag:boolean=true;
 table:boolean=false;
 check_response:any;
  constructor(private toastr:ToastrManager,private route:Router,private catshow:CatserveService,private router:ActivatedRoute,private update:UpdatecatserveService) { }

  ngOnInit(): void {
    localStorage.setItem('address','/admin/updatecategory');
    this.router.params.forEach((params: any) => {
      this.Cat_id = params['id'];
      this.Cat_name = params['id1'];
      // console.log("id="+this.Cat_id);
      // console.log("Name="+this.Cat_name);

  });
  }
  //   update_cat(v:any,v1:any){
  //    //this.id=v
     
  //    console.log(document.getElementById('update')?.innerHTML);
  //    document.getElementById('catname')?.remove();
  //    this.input=document.createElement("input");
  //    this.input.type="text";
  //    this.input.id="catname";
  //   console.log(document.getElementById('update')?.firstChild);
  //   document.getElementById('catname')?.setAttribute('value',v1);
  //   //console.log(this.input);
  //  //console.log(document.getElementById('catname')?.getAttribute('value'));
    
  //    //document.getElementById('catname_p').innerHTML
  //    //document.write(this.title);
    
  //    //console.log(this.title);
  //    //alert(this.title);
  //   // this.catshow.getData().subscribe(data=>)
  //    }

  update_cat(v1:any){
    if(v1!=''){
      this.messageshow=false;
      // console.log("Name:"+v1)
      // console.log("id:"+this.Cat_id);  
      this.update.Post_data(this.Cat_id,v1).subscribe(data=>{console.log(data)
       this.check_response=JSON.parse(data);
       console.log(this.check_response.success);
       if(this.check_response.success==1){
        this.route.navigate(['/admin/category',this.Cat_id,v1]).then(()=>{
          this.toastr.successToastr('Category Updated Successfully','');
        });
       }
       else if(this.check_response.success==0){
        this.toastr.infoToastr(v1+' already exists','');
       }
      },error=>{
        this.toastr.errorToastr('Something went wrong! please try again later','');
      })
      }
     else
     this.messageshow=true;
  }
}
