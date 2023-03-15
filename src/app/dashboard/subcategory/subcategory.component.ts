import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SubcatshowService } from 'src/app/subcatshow.service';
import { AuthService } from '../../auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css',
  '../../../assets/adminassets/css/font-awesome.css',
  '../../../assets/adminassets/css/apps.css',
  '../../../assets/adminassets/css/apps_inner.css',
  '../../../assets/adminassets/css/res.css'
   ]
})
export class SubcategoryComponent implements OnInit {
  SubCat_name:any;
  SubCat_id:any;
  Cat_id:any;
  constructor(private toastr:ToastrManager,private route:ActivatedRoute,private router:Router,private cookieService:CookieService, private authserv:AuthService,private subshow:SubcatshowService) { }
  userData:any;
  category:any=[];
  errormessage:any;
  // p_tag:boolean=true;
  // table:boolean=false;
  substring:any;
  loading:boolean=true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['No','Name','Category','Action'];
  dataSource = new MatTableDataSource([]);
  ngOnInit(): void {
  this.fetch_data();
  localStorage.setItem('address','/admin/subcategory');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // logout()
  // {
  //   this.authserv.logout();
  //   this.cookieService.delete('cookie-name');
  //   this.router.navigate(['/admin/login']);
  // }
  update_subcate(v1:any,v2:any,v3:any){
    console.log(v1+ "" +v2+ "" +v3);
    this.router.navigate(['admin/updatesubcategory',v1,v2,v3]);
  }
  public fetch_data() {
    this.route.params.forEach((params: any) => {
      this. SubCat_id= params['id'];
      this.Cat_id = params['id1'];
      this.SubCat_name = params['id2'];
      console.log("Name="+this.SubCat_name);
      console.log("SubcatId="+this.SubCat_id);
      console.log("CategoryId="+this.Cat_id );
      this.subshow.show_sub().subscribe(data=>{console.log('Success!',data);
      this.userData=data;
      this.loading=false;
      // for(let i=0;i<this.userData.message.length;i++)
      // {
      //    this.category[i]=this.userData.message[i];
      //    console.log(this.userData.message[i].name);
      //    if(  this.category[i]._id== this. SubCat_id)
      //    {  
      //     this.category[i].name=  this.SubCat_name;
      //    }
      // }
      this.put_data(this.userData.message);
    },(errorMessage) => {  
    // this.table=true;                          
     console.error('error caught in component')
     this.errormessage = errorMessage;
      // this.p_tag=false;
      console.log("Error Status:" + errorMessage)
      this.substring = errorMessage.substr(0, 3);

      if (this.substring != 'und') {
        // console.log("After Cutting:" +this.substring)                         
        // console.error('error caught in component')
        this.errormessage = errorMessage.substr(11, 132);
        //  console.log("Error:" +  this.errormessage);
        // this.p_tag = false;
        console.log("this.substring:" + this.substring);
        // this.router.navigate(['404pagenotfound', this.substring]);
        this.toastr.warningToastr("Something went wrong , please try again later",'',{position:'top-center',animate:'slideFromTop',toastTimeout:50000,maxShown:'1'})
      }
      else {
        this.substring = errorMessage.substr(18, 27);
        console.log(this.substring);
        // this.router.navigate(['404pagenotfound', this.substring]);
        this.toastr.warningToastr("Something went wrong , please try again later",'',{position:'top-center',animate:'slideFromTop',toastTimeout:50000,maxShown:'1'})
      }
     })
  });
  


  }



  public put_data(v:any) {
    this.dataSource = new MatTableDataSource(v);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



}
