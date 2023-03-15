import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { AdminReportsService } from '../admin-reports/admin-reports.service';

@Component({
  selector: 'app-pub-reports',
  templateUrl: './pub-reports.component.html',
  styleUrls: ['./pub-reports.component.css',
  '../../../assets/adminassets/css/font-awesome.css',
  '../../../assets/adminassets/css/apps.css',
  '../../../assets/adminassets/css/apps_inner.css',
  '../../../assets/adminassets/css/res.css']
})
export class PubReportsComponent implements OnInit {
  loading:boolean=false;
  displayedColumns: string[] = ['Report Id','user_name','Email','Subject','View'];
  // displayedColumns: string[] = ['#', 'Book Name', 'Author Name', 'ISBN No.','Status'];
  dataSource= new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route:Router,private adminreports:AdminReportsService) { }
  report_type:any;
  reports:any=[];
  ngOnInit(): void {
   this.fetchdata();
  }
  fetchdata(){
    this.loading=true;
     this.adminreports.getPubReports().pipe(pluck('message')).subscribe(data=>{
      this.reports=data;
      this.put_data(this.reports)
     })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  
  }
  public put_data(v:any) {
    this.dataSource = new MatTableDataSource(v);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loading=false;
  }
  go_toview(id:any,type:any){
    this.route.navigate(['admin/fullReports',id,type]);
  }
}
