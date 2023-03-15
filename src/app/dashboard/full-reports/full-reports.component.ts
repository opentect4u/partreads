import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminReportsService } from '../admin-reports/admin-reports.service';

@Component({
  selector: 'app-full-reports',
  templateUrl: './full-reports.component.html',
  styleUrls: ['./full-reports.component.css',
  '../../../assets/adminassets/css/font-awesome.css',
  '../../../assets/adminassets/css/apps.css',
  '../../../assets/adminassets/css/apps_inner.css',
  '../../../assets/adminassets/css/res.css']
})
export class FullReportsComponent implements OnInit {

  constructor(private activeRouter:ActivatedRoute,private reportserve:AdminReportsService) { }
  load:boolean=false;
  table_id:any;
  type:any;
  reports:any=[];
  img_type:any;
  ngOnInit(): void {
    this.table_id=this.activeRouter.snapshot.params["id"];
    this.type=this.activeRouter.snapshot.params["type"];
    console.log(this.table_id)
    if(this.type=='U'){
      this.reportserve.getReportsById(this.table_id).subscribe(data=>{
        console.log(data);
        this.reports=data;
        this.reports=this.reports.message;
        this.img_type=this.reports[0].file_name.split('.')[1];
        console.log(this.img_type);
         this.load=true;
      })
    }
    else{
      this.reportserve.getpubReportsById(this.table_id).subscribe(data=>{
        console.log(data);
        this.reports=data;
        this.reports=this.reports.message;
        this.img_type=this.reports[0].file_name.split('.')[1];
        console.log(this.img_type);
        this.load=true;
      })
    }  
  }
  downloadFile(v:any){
    console.log(v)
    window.open(v,'_blank');
  }

}
