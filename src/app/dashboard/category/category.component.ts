import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth.service';
import { ICat } from '../../cat';
import { CatserveService } from '../../catserve.service';
import { CatShowService } from '../cat-show.service'
import { UpdateCategoryComponent } from '..//update-category/update-category.component';
import { UpdatecatService } from '../../updatecat.service';
import { IupCat } from '../../upcat';
import { SubcreateService } from '../../subcreate.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';
import { IsubCat } from 'src/app/subcats';
// import { interval, Subscription} from 'rxjs';
// import { takeWhile } from 'rxjs/operators';
// import { Observable, timer } from 'rxjs';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css',
    '../../../assets/adminassets/css/font-awesome.css',
    '../../../assets/adminassets/css/apps.css',
    '../../../assets/adminassets/css/apps_inner.css',
    '../../../assets/adminassets/css/res.css']
})
export class CategoryComponent implements OnInit {

  constructor(private cat:SubcreateService, private toastr:ToastrManager,private route: ActivatedRoute, private router: Router, private cookieService: CookieService, private authserv: AuthService, private cats: CatShowService, private update_c: UpdateCategoryComponent, private up_cat: UpdatecatService) { }
  category: any = [];
  nm = new IupCat('');
  nm1=new IsubCat('','');
  userData: any = [];
  userData1: any = [];
  Cat_id: any;
  Cat_name: any;
  errormessage: any;
  substring: any = '';
  loading=true;
  userCount:any;
  call:any;
  count:number=0;
  add_subcat_id:any;
  add_subcat_name:any;
  subcatdata:any=[];
  subtextid:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['No','Name', 'Action'];

  dataSource = new MatTableDataSource([]);


  ngOnInit(): void {


    // this.call = interval(10000)
    // .subscribe((val:any) =>{
    //   console.log("console------");
    // this.fetch_data()});
    this.fetch_data()
    localStorage.setItem('address', '/admin/category');
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  show_index(v1: any, v2: any) {
    console.log(v1 + " " + v2);
    //  console.log(this.nm.id);
    // console.log(this.userData.message[i].name);
    /*this.up_cat.update_cat(this.nm).subscribe(data=>{console.log('Success!',data)
      this.userData1=data;
      console.log("Data="+this.userData1);
     })*/
    // console.log("Data="+this.userData1.message[i]._id);
    // this.update_c.update_cat(v1,v2);
    this.router.navigate(['admin/updatecategory', v1, v2]);
  }
  public fetch_data() {
    
    this.route.params.forEach((params: any) => {
      this.Cat_id = params['id'];
      this.Cat_name = params['id1'];
      // console.log("id="+this.Cat_id);
      // console.log("Name="+this.Cat_name);



    
      this.cats.getData().subscribe((data:any) => {
        console.log('Success!', data);
        this.userData = data;
        // console.log(this.userData.message[0].name);
        console.log(this.userData.message.length);
        this.loading=false;
        for (let i = 0; i < this.userData.message.length; i++) {
          this.category[i] = this.userData.message[i];
          //console.log(this.userData.message[i].name);
          if (this.category[i]._id == this.Cat_id) {
            this.category[i].name = this.Cat_name;
          }
        }
        this.put_data();
      }, (errorMessage:any) => {
      
        console.log("Error Status:" + errorMessage)
        // console.log(Error);
        this.substring = errorMessage.substr(0, 3);
        if (this.substring != 'und') {
          // console.log("After Cutting:" +this.substring)                         
          console.error('error caught in component')
          this.errormessage = errorMessage.substr(11, 132);
          //  console.log("Error:" +  this.errormessage);
        
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
  public put_data() {
    this.dataSource = new MatTableDataSource(this.category);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  go_to_createsubcategory(id:any){
    console.log(id);
    
  }
  store_id(id:any,nm:any){
    this.add_subcat_id=id;
    this.add_subcat_name=nm
    this.cats.getSub(id).subscribe((data)=>{console.log(data)
    this.subcatdata=JSON.parse(data);
    this.subcatdata=this.subcatdata.message;
    this.subcatdata.reverse()
    console.log(this.subcatdata[0].name)
    })

  }
  add(v:any){
    this.nm1.category_id=this.add_subcat_id;
       this.nm1.name=v;   
       this.cat.putdata(this.nm1).subscribe(data=>{console.log('Success!',data);
       this.userData=data;
       console.log(this.userData.message.name);
        this.cats.getSub(this.nm1.category_id).subscribe((data)=>{console.log(data)
    this.subcatdata=JSON.parse(data);
    this.subtextid=document.getElementById('subcatval');
    this.subtextid.value=''
    this.subcatdata=this.subcatdata.message
    this.subcatdata.reverse()
    
  })
      //  this.router.navigate(['/admin/subcategory']);
     })
    // alert(this.add_subcat_id+" "+this.add_subcat_name)
    // this.router.navigate(['/admin/createsubcategory/',this.add_subcat_id])
  }
}
