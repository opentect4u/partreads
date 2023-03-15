import { Component, OnInit } from '@angular/core';
import { UserlogoutService } from '../userlogout.service';
import { UsersidebarinfoService } from '../usersidebarinfo.service';
import { GlobalConstants } from '../globalvar/global';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usersidebar',
  templateUrl: './usersidebar.component.html',
  styleUrls: ['./usersidebar.component.css',
  '../../assets/cssfiles/bootstrap.css',
  '../../assets/cssfiles/font-awesome.css',
  '../../assets/chosen/chosen.css',
  '../../assets/cssfiles/apps.css',
  '../../assets/cssfiles/res.css',
  '../../assets/cssfiles/apps_inner.css']
})
export class UsersidebarComponent implements OnInit {
constructor() { }
ngOnInit(): void {}
}
