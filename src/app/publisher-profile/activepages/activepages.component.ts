import { Component, OnInit,ViewChild } from '@angular/core';
import { ActiveserviceService } from './activeservice.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/globalvar/global';
import { Router } from '@angular/router';
@Component({
  selector: 'app-activepages',
  templateUrl: './activepages.component.html',
  styleUrls: ['./activepages.component.css',
  '../../../assets/cssfiles/bootstrap.css',
  '../../../assets/cssfiles/font-awesome.css',
  '../../../assets/chosen/chosen.css',
  '../../../assets/cssfiles/apps.css',
  '../../../assets/cssfiles/res.css',
  '../../../assets/cssfiles/apps_inner.css']
})
export class ActivepagesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private a:ActiveserviceService,private router:Router) { }
  userdata:any=[];
  userdata1:any=[];
  url=GlobalConstants.apiURL;
  c=0;
  displayedColumns: string[] = ['Thumbnail', 'Book Name', 'ISBN Number', 'Pages'];
  dataSource = new MatTableDataSource([]);

   public inddatasource(){
     console.log(this.userdata1);
    this.dataSource = new MatTableDataSource(this.userdata1);
   
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
 }
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();


  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

  ngOnInit(): void {
    localStorage.setItem('address','/publisher/activepages')
    this.a.get_pages().subscribe(data=>{
      // console.log(data)
    this.userdata=JSON.parse(data);
    //  console.log(this.userdata);
     for(let i=0;i<this.userdata.message.length;i++)
     {
      if(this.userdata.message[i].active_pages.active_book=='I'){this.userdata1[this.c++]=this.userdata.message[i];}
      // console.log(this.userdata.message[i].active_pages.active_book)
       
     }
     console.log(this.userdata1);
     this.inddatasource();
    })
  }
  edit_bk(i:any,v1:any,flag:any){

    console.log(i+" "+v1);
    this.router.navigate(['publisher/viewDetails',i,v1,flag])
  }

}
