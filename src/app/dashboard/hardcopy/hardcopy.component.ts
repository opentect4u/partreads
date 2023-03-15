import { Component, OnInit,ViewChild } from '@angular/core';
import { HardcopyserveService } from './hardcopyserve.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-hardcopy',
  templateUrl: './hardcopy.component.html',
  styleUrls: ['./hardcopy.component.css',
  '../../../assets/adminassets/css/font-awesome.css',
  '../../../assets/adminassets/css/apps.css',
  '../../../assets/adminassets/css/apps_inner.css',
  '../../../assets/adminassets/css/res.css']
})
export class HardcopyComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Email','Phone','Book','Publisher','Address'];
  // displayedColumns: string[] = ['#', 'Book Name', 'Author Name', 'ISBN No.','Status'];
  dataSource= new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private getData:HardcopyserveService) { }
  gethardcopydata:any;
  loading=true
  ngOnInit(): void {
    this.fetchdata()
  }
 fetchdata(){
    this.getData.getHardCopyData().subscribe(data=>{
      this.gethardcopydata=data;
      console.log(data)
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
public put_data() {
  this.dataSource = new MatTableDataSource(this.gethardcopydata.message);
  // console.log(this.dataSource.data);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

}
