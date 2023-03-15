import { Component, OnInit } from '@angular/core';
import { EditProfileService } from './edit-profile.service';
import { EditpubService } from './editpub.service';
import { Router } from '@angular/router';

import { trigger, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-edit-pub',
  templateUrl: './edit-pub.component.html',
  styleUrls: ['./edit-pub.component.css',
    '../../../assets/cssfiles/bootstrap.css',
    '../../../assets/cssfiles/font-awesome.css',
    '../../../assets/chosen/chosen.css',
    '../../../assets/cssfiles/apps.css',
    '../../../assets/cssfiles/res.css',
    '../../../assets/cssfiles/apps_inner.css'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0, transform: 'translateY(20px)' })),
      ]),
    ]),
  ]
})
export class EditPubComponent implements OnInit {

  constructor(private epub: EditpubService, private edit: EditProfileService, private router: Router) { }
  Bank_Name:string=' ';
  IFSC_Code:string=' ';
  gst_no:string=' ';
  bank_acc:string=' ';
  conf_bank_acc:string=' ';

  userdata: any=[];
  p_name: string=' ';
  p_email: string=' ';
  p_phone: string=' ';
  p_street: string=' ';
  p_city: string=' ';
  p_pin: string=' ';
  p_state: string=' ';
  btndis: boolean = false;
  p_country: string=' ';
  file!: any;
  profile: any;
  fval: string = '';
  contmod: any;
  spin_show: boolean = false;
  modal_show: boolean = true;
  modal_msg = '';
  m: any;
  modaldisp = 0;
  message = "";
  update: boolean = false;
  show_form=true;

  // loader=true;
  ngOnInit(): void {
    this.m = document.getElementById("myModal");
    this.m.style.display = 'none';
    this.epub.edit_profile(localStorage.getItem('pub-id')).subscribe(data => {
      //console.log(data);
      // this.loader=false;
      // this.userdata = JSON.parse(data);
      var obj= JSON.parse(data);
      this.userdata=obj.message;
      this.p_name = this.userdata[0].name;
      this.p_email = this.userdata[0].email;
      this.p_phone = this.userdata[0].phone==undefined?'':this.userdata[0].phone;
      this.p_street = this.userdata[0].street==undefined?'':this.userdata[0].street;
      this.p_city = this.userdata[0].city==undefined?'':this.userdata[0].city;
      this.p_state = this.userdata[0].state==undefined?'':this.userdata[0].state;
      this.p_country = this.userdata[0].country==undefined?'':this.userdata[0].country;
      this.p_pin = this.userdata[0].pincode==undefined?'':this.userdata[0].pincode;
      this.profile = this.userdata[0].image_url;
      this.Bank_Name= this.userdata[0].bank_name=="undefined" || this.userdata[0].bank_name==null?'':this.userdata[0].bank_name;
      this.IFSC_Code=this.userdata[0].ifsc_code=="undefined" || this.userdata[0].ifsc_code==null ? '':this.userdata[0].ifsc_code;
      this.gst_no=this.userdata[0].gst_no=="undefined" || this.userdata[0].gst_no==null?'':this.userdata[0].gst_no;
      this.bank_acc=this.userdata[0].acc_no=="undefined" || this.userdata[0].acc_no==null?'':this.userdata[0].acc_no;
      this.conf_bank_acc=this.userdata[0].acc_no=="undefined" || this.userdata[0].acc_no==null?'':this.userdata[0].acc_no;
      console.log(this.Bank_Name)
    })
    localStorage.setItem('address','/publisher/edit');
  }
  onChange(event: any) {
    this.file = event.target.files[0];
    var ext = event.target.files[0].name.split('.').pop();
    console.log(ext);
    if (ext == "jpeg" || ext == "jpg" || ext == 'png') {
      this.fval = event.target.files[0].name;
      const reader = new FileReader();
      reader.onload = () => {
        this.profile= reader.result as string;
        // this.img_src=reader.result as string;
      }
      reader.readAsDataURL(this.file);
    }
    else {
      this.m.style.display = 'block';
      this.modal_msg = 'Wrong format!!'
    }
  }
  modal_close_fun() {

    this.m.style.display = 'none';
    // this.router.navigate(['publisher/publisher-dashboard']);
  }
  modal_close_funtry() {

    this.m.style.display = 'none';

  }

  send_data(v1: any, v2: any, v3: any, v4: any, v5: any, v6: any, v7: any, v8: any) {
    this.update = true;
    this.modaldisp = 0;
    this.m.style.display = 'none';
    if (v1 != '' && v2 != '' && v3 != '' && v4 != '' && v5 != '' && v6 != '' && v7 != '' && v8 != '') { //console.log(v1+" "+v2+" "+v3+" "+v4+" "+v5+" "+v6+" "+v7+" "+v8+" "+this.file.name);
      this.spin_show = true;
      if(this.Bank_Name==''){
        this.edit.editprofile(localStorage.getItem('pub-id'), v1, v2, v3, v4, v5, v6, v7, v8,this.Bank_Name,this.IFSC_Code,this.gst_no,this.bank_acc,this.file).subscribe(data => {
          //console.log(data);
          var obj = JSON.parse(data);
          if (obj.success == 1) {
            this.m.style.display = 'block';
            this.spin_show = false;
            this.modal_msg = "Your profile has been successfully updated!!"
            this.epub.edit_profile(localStorage.getItem('pub-id')).subscribe(data => {
  
              console.log(data,this.m);
              // this.loader=false;
              this.userdata = JSON.parse(data);
              this.p_name = this.userdata.message[0].name;
              this.p_email = this.userdata.message[0].email;
              this.p_phone = this.userdata.message[0].phone==undefined?'':this.userdata.message[0].phone;
              this.p_street = this.userdata.message[0].street==undefined?'':this.userdata.message[0].street;
              this.p_city = this.userdata.message[0].city==undefined?'':this.userdata.message[0].city;
              this.p_state = this.userdata.message[0].state==undefined?'':this.userdata.message[0].state;
              this.p_country = this.userdata.message[0].country==undefined?'':this.userdata.message[0].country;
              this.p_pin = this.userdata.message[0].pincode==undefined?'':this.userdata.message[0].pincode;
              this.profile = this.userdata.message[0].image_url;
              console.log(this.profile)
            })
          }
          else {
            this.m.style.display = 'block';
            this.modal_msg = "Error while updating!!"
            this.spin_show = false;
          }
  
        });
      }
      else{     
           if(this.IFSC_Code!='' && this.bank_acc!=''){
            if(this.bank_acc==this.conf_bank_acc){
            this.edit.editprofile(localStorage.getItem('pub-id'), v1, v2, v3, v4, v5, v6, v7, v8,this.Bank_Name,this.IFSC_Code,this.gst_no,this.bank_acc,this.file).subscribe(data => {
              //console.log(data);
              var obj = JSON.parse(data);
              if (obj.success == 1) {
                this.m.style.display = 'block';
                this.spin_show = false;
                this.modal_msg = "Your profile has been successfully updated!!"
                this.epub.edit_profile(localStorage.getItem('pub-id')).subscribe(data => {
                  this.userdata = JSON.parse(data);
                  this.p_name = this.userdata.message[0].name;
                  this.p_email = this.userdata.message[0].email;
                  this.p_phone = this.userdata.message[0].phone==undefined?'':this.userdata.message[0].phone;
                  this.p_street = this.userdata.message[0].street==undefined?'':this.userdata.message[0].street;
                  this.p_city = this.userdata.message[0].city==undefined?'':this.userdata.message[0].city;
                  this.p_state = this.userdata.message[0].state==undefined?'':this.userdata.message[0].state;
                  this.p_country = this.userdata.message[0].country==undefined?'':this.userdata.message[0].country;
                  this.p_pin = this.userdata.message[0].pincode==undefined?'':this.userdata.message[0].pincode;
                  this.profile = this.userdata.message[0].image_url;
                  console.log(this.profile)
                })
              }
              else {
                this.m.style.display = 'block';
                this.modal_msg = "Error while updating!!"
                this.spin_show = false;
              }
      
            });
             }
              else{
                this.m.style.display = 'block';
                  console.log(this.m);
                  this.spin_show = false;
                  this.modal_msg = 'Bank account no. and confirm bank account no. must be same';
              }
           }else{
            this.m.style.display = 'block';
            console.log(this.m);
            this.spin_show = false;
            this.modal_msg = 'Please Provide Bank Account no. and IFSC code'  
           }
           
      }
      console.log("ssss");
      
    }
    else {
      this.m.style.display = 'none';
      console.log(this.m);
      this.modal_msg = 'One or more fields may be empty.'
      this.spin_show=false;
      // this.modal_msg="Empty fields";
    }
  }
  hide_show(){
    this.show_form=!this.show_form
  }

  preventNonNumericalInput(e: any) {//keypress event: This event is for prevent the nonnumeric value in phone number
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (!charStr.match(/^[0-9]+$/))
      e.preventDefault();
}
}
