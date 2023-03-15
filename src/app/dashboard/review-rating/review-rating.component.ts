import { Component, OnInit,ViewChild } from '@angular/core';
import { RatingManageService } from './rating-manage.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ApproveratingService } from './approverating.service';
import { ToastrManager } from 'ng6-toastr-notifications';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-review-rating',
  templateUrl: './review-rating.component.html',
  styleUrls: ['./review-rating.component.css',
  '../../../assets/adminassets/css/font-awesome.css',
  '../../../assets/adminassets/css/apps.css',
  '../../../assets/adminassets/css/apps_inner.css',
  '../../../assets/adminassets/css/res.css']
})
export class ReviewRatingComponent implements OnInit {
  ratingData:any;
  ratingStatus:any;
  loading=true;
  constructor(private toastr:ToastrManager,private rating:RatingManageService,private approverate:ApproveratingService) { }
  displayedColumns: string[] = ['User_ID', 'Name', 'Book', 'Review', 'Rating','Action'];
  dataSource= new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loading=true;
    this.fetch_data()
  }
  public fetch_data(){
    this.rating.showrating().subscribe(data=>{
    this.ratingData=data;
    this.loading=false;
    this.put_data()
    })
   
   
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  put_data(){
    this.dataSource=new MatTableDataSource(this.ratingData.message);
     this.dataSource.paginator=this.paginator;
    //  this.dataSource.sort=this.sort;

}
approveRating(id:any,show_flag:any,index:any){
  // alert(show_flag)
  this.loading=true;
  this.approverate.approveRating(id,show_flag).subscribe(data=>{console.log(data);
    this.ratingStatus=JSON.parse(data);
    if(this.ratingStatus.success > 0){
      this.fetch_data();
      this.toastr.successToastr('Review & rating status change successful!','')
    }
    else{
       this.loading=false;
      this.toastr.errorToastr('Review & rating status change failed!','');
    }
  },error=>{
    this.loading=false;
    this.toastr.errorToastr('Review & rating status change failed!','');
  })
}
}
