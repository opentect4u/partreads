import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from 'src/app/globalvar/global';
import { PublishercategoryshowService } from 'src/app/publishercategoryshow.service';
import { PublishersubcategoryshowService } from 'src/app/publishersubcategoryshow.service';
import { EditbookconService } from '../editbooks/editbookcon.service';
import { EditbookshowService } from '../editbooks/editbookshow.service';

@Component({
  selector: 'app-view-bookdetails',
  templateUrl: './view-bookdetails.component.html',
  styleUrls: ['./view-bookdetails.component.css',
  '../../../assets/cssfiles/bootstrap.css',
  '../../../assets/cssfiles/font-awesome.css',
  '../../../assets/chosen/chosen.css',
  '../../../assets/cssfiles/apps.css',
  '../../../assets/cssfiles/res.css',
  '../../../assets/cssfiles/apps_inner.css']
})
export class ViewBookdetailsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Page No', 'user count'];
  dataSource=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private ebcon:EditbookconService, private router:ActivatedRoute, private e:EditbookshowService, private activatedroute:ActivatedRoute,private showsubcat:PublishersubcategoryshowService,private showcat:PublishercategoryshowService) { }
  id:any;
  id1:any;
  book_details:any=[];
  pdf_url:any;
  img_url:any;
  str_len:any;
  buy_pages:any=[];
  load:boolean=false;
  flag:any='V';
  active_inactive:any;
  ngOnInit(): void {
    this.router.params.forEach((params: any) => {
      this.id= params['id'];
      this.id1 = params['id1'];
      this.active_inactive= params['flag'];
      console.log(this.id+" "+this.id1);
  });
  this.e.edit_show(localStorage.getItem('pub-id'),this.id1,this.flag).subscribe(data=>{
    console.log(data);
    this.book_details=JSON.parse(data);
    this.buy_pages=this.book_details.buy_pages;
    this.book_details=this.book_details.message[0];
     this.str_len=this.book_details.about_book.length;
     this.pdf_url=GlobalConstants.apiURL+'/public/main-pdf/'+this.book_details.full_book_name;
     this.img_url=GlobalConstants.apiURL+'/public/book-images/'+this.book_details.book_image;
    //  console.log(this.book_details.buy_pages.sort());
     this.dataSource=new MatTableDataSource(this.buy_pages.sort(function(a:any,b:any){return b.count_user - a.count_user}));
      // console.log();
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
      this.load=true;
    //  console.log(this.book_details.about_book.length);
  })

  }

  showFull(){}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
