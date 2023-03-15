import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {map, pluck} from 'rxjs/operators';
import { DataService } from 'src/app/data.service';
import { user } from 'src/app/Utility/user';
import { userEmail } from 'src/app/Utility/userEmail';
import { UtilityTService } from 'src/app/Utility/utility-t.service';
import { Publishers } from 'src/app/Utility/__publisher';
@Component({
  selector: 'app-table',
  templateUrl: './adminemail.component.html',
  styleUrls: ['./adminemail.component.css',
  "../../../assets/adminassets/css/font-awesome.css",
  "../../../assets/adminassets/css/apps.css",
  "../../../assets/adminassets/css/apps_inner.css",
  "../../../assets/adminassets/css/res.css"]
})
export class adminemailComponent implements OnInit {
  @ViewChild('select') select!: MatSelect;
  @ViewChild('select_pub') select_pub!: MatSelect;
  @ViewChild('search_users') search_users!: MatSelect;
  @ViewChild('form') form!:NgForm;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      [ 'insertImage',
      'insertVideo',]
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  loading:boolean=false;
  _userType:any=[];
  _sentEmail!:FormGroup;
  publishers:Publishers[]=[];
  _publisher_backup:Publishers[] =[]
  _users:user[]=[];
  _search_user_backup:user[]=[];
  _userBackup:user[] = [];
  _submitEmail = new userEmail(localStorage.getItem('token'),'U');
  constructor(private fb:FormBuilder,private utilyT:UtilityTService,private user:DataService) { 
    this._sentEmail = this.fb.group({
      _bodyText:['',Validators.required],
      _user:[''],
      _user_type:['',Validators.required],
      _flag:['U',Validators.required],
      _publishers:['',Validators.required],
      _headers:['',Validators.required],
      _searchusers:[''],
      searchPub:['']
    }) 
  }
  get f(){return this._sentEmail.controls;}
  
  ngOnInit(): void {
    console.log(this._submitEmail);
    
    this.getPublishers();
    this.getUserType();
    this.getUsers();
    this.f._user.disable();
    
  }

  SendEmail(){
    this.loading= true;
    const formdata = new FormData();
    formdata.append('admin_id',this._submitEmail.admin_id); 
    formdata.append('flag',this._submitEmail.flag); 
    formdata.append('email_body',this._submitEmail.email_body);
    formdata.append('header',this._submitEmail.header);
    switch(this.f._flag.value){
      
      case "P":           
              this._submitEmail.user = [];
              this._submitEmail.user_type = ''; 
              formdata.append('publisher',(JSON.stringify(this._submitEmail.publisher)))
               break;
               case "U":               
                this._submitEmail.user= this._submitEmail.user == undefined ? [] :  this._submitEmail.user; 
                this._submitEmail.publisher= []; 
                formdata.append('user_type',this.f._user_type.value);           
                formdata.append('user', 
               ( JSON.stringify(this._submitEmail.user))
                );
                 break;

    }
    this.utilyT.submitEmail('/api/admin/marketingmail',formdata).pipe(map(x=> JSON.parse(x)),pluck("success")).subscribe(res => {
      this.loading= false;
      if(res > 0){
        let _flag = this.f._flag.value;
        this.form.resetForm();
        this.f._flag.patchValue(_flag);
        this.utilyT.showToastr('Mail sent successfully','S');
       this.f._user.disable();

      }
    },
    error=>{
      this.utilyT.showToastr('Server does not respond','E');
      this.loading = false;
    })
  }
  selAll(_event:any){
     switch(this.f._flag.value){
       case 'U':  if(_event.checked){
                  this._sentEmail.patchValue({_user : _event.checked ? this._users :[]})    
                  this._submitEmail.user = this._users
                  this.select.options.forEach((item: MatOption) => item.select());
                  }
                  else{
                  this._submitEmail.user = []
                  this._sentEmail.patchValue({_user : ''})
                  this.select.options.forEach((item: MatOption) => item.deselect());
                  }
                  break;
       case 'P':  
                  if(_event.checked){
                    this._submitEmail.publisher = this.publishers;
                    this._sentEmail.patchValue({_publishers : _event.checked ? this.publishers :[]})    
                    this.select_pub.options.forEach((item: MatOption) => item.select());
                    }
                    else{
                    this._submitEmail.publisher = []
                    this._sentEmail.patchValue({_publishers : ''})
                    this.select_pub.options.forEach((item: MatOption) => item.deselect());
                    }
                     break;
        default: break;
     }

    
  }
  getPublishers(){
     this.utilyT.getPublishers().then(publisher => {
        this.publishers = publisher.filter((x:Publishers) => x.user_status == 'A');   
        this._publisher_backup = this.publishers; 
    })
  }
  getUserType(){
    this.utilyT.getuserType().then(res => {
      this._userType = res;
   });
  }
  getUsers(){
  this.user.get_api().pipe(map(x=>JSON.parse(x)),pluck('message')).subscribe((res:user[])=>{
    this._users =  res.filter(x => x.user_status =='A');
    this._userBackup = this._users;
  })
  }
  onusertypeChange(event:any){
    this._users = event.value == '' ? this._userBackup : this._userBackup.filter(x => x.user_details.type == event.value);
    this._search_user_backup = this._users;
    if(event.value == ''){
      this.f._user.disable();
    }
    else{
      this.f._user.enable();
    }
  }
  
  //Event Fired When someone write something inside the Seearch Input box
  onInputChange(event: any) {
    event.stopPropagation();
    const searchInput = event.target.value.toLowerCase();
    switch(this.f._flag.value){
      case "P":  
                  this.publishers = this._publisher_backup.filter(({ user_name }) => {
                    const  u_name = user_name.toLowerCase();
                    return u_name.includes(searchInput);
                  });
                  console.log(this._submitEmail.publisher);
                  
                  this.f._publishers.patchValue(this._submitEmail.publisher);
                  break;
      case "U":  this._users = this._search_user_backup.filter(({ user_name }) => {
                        const  u_name = user_name.toLowerCase();
                        console.log(u_name);
                        return u_name.includes(searchInput);
                       })
                 break;
      default:break;
    }

   
  }
 //Event Fired When cross icon inside the material search input box will click
  clearSearch(event:any) {
    switch(this.f._flag.value){
      case "P": this.f.searchPub.patchValue('');this.publishers =  this._publisher_backup;break;
      case "U": this.f._searchusers.patchValue('');this._users =  this._search_user_backup;break;
      default:break;
    }
  }
 //Event Fired When Material option list is going to be closed
  onCloseMethod(select:MatSelect){
     this.clearSearch(select);
  }


}
