import { Component, OnInit } from '@angular/core';
import {ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { GetAdminsService } from './get-admins.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';



@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css',
  '../../../assets/adminassets/css/font-awesome.css',
  '../../../assets/adminassets/css/apps.css',
  '../../../assets/adminassets/css/apps_inner.css',
  '../../../assets/adminassets/css/res.css']
})
export class AdminsComponent implements OnInit {

  constructor(private showAdmin:GetAdminsService,private router:Router) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  adminData:any=[];

  displayedColumns: string[] = ['Name', 'Email', 'Phone','Permissions','Edit'];
  loading=true;
  dataSource = new MatTableDataSource([]);
  ngOnInit(): void {
    // this.showAdmin.showSubAdmin().subscribe(data=>{console.log(data)})
    this.fetchData()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  fetchData(){
    this.loading=true;
    this.showAdmin.showSubAdmin().subscribe(data=>{console.log(data);
     this.adminData=data
      console.log(this.adminData.message)
      this.put_data(this.adminData.message);
      this.loading=false;
  })
  
}
put_data(v:any){
  
    this.dataSource = new MatTableDataSource(v);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
 
}
addsubadmin(){
  this.router.navigate(['/admins_add','0'])
}
editsubadmin(v:any){
  this.router.navigate(['/admins_add',v])

}
}
