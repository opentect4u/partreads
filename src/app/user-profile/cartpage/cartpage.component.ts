import { Component, ElementRef, OnInit ,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/globalvar/global';
import { ShowcartService } from './showcart.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UtilityTService } from 'src/app/Utility/utility-t.service';
@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css',
  '../../../assets/cssfiles/bootstrap.css',
  '../../../assets/cssfiles/font-awesome.css',
  '../../../assets/chosen/chosen.css',
  '../../../assets/cssfiles/apps.css',
  '../../../assets/cssfiles/res.css',
  '../../../assets/cssfiles/apps_inner.css']
})
export class CartpageComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('Cancel',{static:true}) Cancel!:ElementRef;
  displayedColumns: string[] = ['Thumbnail', 'Book Name', 'ISBN Number', 'Pages','Full Book', 'Price', 'Buy'];
  dataSource = new MatTableDataSource([]);
  constructor(private utilyT:UtilityTService,private show1:ShowcartService,private show:ShowcartService,private router:Router) { }
  userdata1:any=[];
  b_id:any;
  loader = true;
  p_id:any;
  c=0;
  modal_close:any;
  delete_id:any;
  url=GlobalConstants.apiURL;
  _bk_name:any;
  ngOnInit(): void {
    localStorage.setItem('address','/user/cart')
     this.inddatasource();
  }
  public inddatasource(){
    this.show.getcart(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).pipe(map(x => JSON.parse(x))).subscribe(data=>{
      console.log(data)
      this.userdata1 = data.success > 0 ? data.message : [];
     this.fetchdata();
    })
}
 fetchdata(){
  this.dataSource = new MatTableDataSource(this.userdata1);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort; 
  //FOR SEARCH OF NESTED LEVEL IN ARRAY OF OBJECTS
  this.dataSource.filterPredicate = (data, filter: string) => {
    const accumulator = (currentTerm:any, key:any) => {
      return this.nestedFilterCheck(currentTerm, data, key);
    };
    const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
    // Transform the filter by converting it to lowercase and removing whitespace.
    const transformedFilter = filter.trim().toLowerCase();
    return dataStr.indexOf(transformedFilter) !== -1;
  }
  this.loader = false;
 }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  gotobuy(v1:any,v2:any,book_name:any,frm:any,to:any,whole_book:any){
    this.router.navigate(['/user/payment',v1,v2,book_name,frm,to,whole_book]);
  }
  delbook(v1:any,v2:any,v3:any,_bk_name:any){
    this.b_id=v1;
    this.p_id=v2;
    this.delete_id=v3;
    this._bk_name = _bk_name;
  }
  del(){
    this.loader=true;
    this.show.removeCart(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'),this.delete_id).pipe(map(x=>JSON.parse(x)),map(x => x.success)).subscribe(data=>{
      this.Cancel.nativeElement.click();
      if(data > 0){
        var Index = this.userdata1.findIndex((x:any) => x._id == this.delete_id);
        this.userdata1.splice(Index,1);
        this.fetchdata()
        this.getcartvalue()
        this.loader=false;
        this.utilyT.showToastr('Removal of cart Successful!','S');
      }
      else{
          this.loader=false;
          this.utilyT.showToastr('Removal of cart failed!','E');
      }
    },error=>{
      this.loader=false;
      this.utilyT.showToastr('Server did not respond!','E');
    })
  }
  getcartvalue(){
    this.utilyT.getcartvalue().then((res) =>{
      this.c = Number(res);
    })
  }

  nestedFilterCheck(search:any, data:any, key:any) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }
}
