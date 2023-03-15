import { AfterViewInit, Component} from '@angular/core';
import { UsereditService } from '../useredit.service';
import { Router } from '@angular/router';
import { UserdetailsService } from '../userdetails.service';
import { SubmitenquiryService } from 'src/app/publisher-profile/indexpage/submitenquiry.service';
import { UregService } from '../user-reg/ureg.service';
import { UtilityTService } from 'src/app/Utility/utility-t.service';
declare var $:any;
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css',
    '../../../assets/cssfiles/bootstrap.css',
    '../../../assets/cssfiles/font-awesome.css',
    '../../../assets/chosen/chosen.css',
    '../../../assets/cssfiles/apps.css',
    '../../../assets/cssfiles/res.css',
    '../../../assets/cssfiles/apps_inner.css']
})
export class EditUserComponent implements AfterViewInit {

  show_loader:boolean=true;// Usage: showing loader inside the button for verify email / verify phone
  constructor(private utilyT:UtilityTService,private userOtp:UregService,private s:SubmitenquiryService,private edit: UsereditService, private router: Router, private user: UserdetailsService) { }
  mode:any='';// Usage: use for show/hide the input field for 'Whether you are'
  p_name: string=' ';// Usage: use for holding user name
  p_email: string=' ';// Usage: use for holding user email
  p_phone: string=' ';// Usage: use for holding user phone
  p_street: string=' ';// Usage: use for holding user street
  p_city:string=' ';// Usage: use for holding user city
  p_pin: string=' ';// Usage: use for holding user pin code
  p_state: string=' ';// Usage: use for holding user phone
  p_country:string=' ';// Usage: use for holding user country
  file: any;// Usage: use for holding file for user profile image
  profile: any;// Usage: use to preview user profile
  // profile_image: any;
  // fval: string = '';
  spin_show: boolean = true;//Usage:use for show / hide spinner and disable / enable button for submitting user details
  modal_msg = '';//Usage: use for showing error message / success message both for wrong format of image and  user details submitted sucessfull etc.. 
  m: any;//Usage: hide modal for choosing wrong formatted image by user
  update: boolean = false;// USage : For show/Hide error validation message
  getId:any;//Usage: For clearing OTP time out 
  Clg:boolean=false;//Usage: For checking / un-checking the Student/Academician radio button
  Corporate:boolean=false;//Usage: For checking / un-checking the Corporate Counsel radio button
  Advocate:boolean=false;//Usage: For checking / un-checking the Advocate radio button
  email_verify:any;//Usage: For show/hide the please verify and verified button inside email input field
  phone_verify:any;//Usage: For show/hide the please verify and verified button inside phone input field
  check_response:any='';//Usage: To get the response after data has been posted 
  get_otp:any='';//Usage: After clicking on please verify now button,get the OTP from server
  otp_pn_em:any='';//Usage: For getting where the OTP has been sent ,whether is it Phone or Email
  Mode:any;//Usage: For getting the type for which the please verify button has been clicked
  ngAfterViewInit(): void {
       // Initial stage this modal will be hidden ////
            this.m = document.getElementById("myModal");
            this.m.style.display = 'none';
     // END////////////////////////////////////////
   
     //  Call Api for getting User Details (API: /api/user/home)
    this.user.get_Details(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).subscribe(data => {
      var obj = JSON.parse(data);
      this.p_name = obj.message[0].name; // USER NAME//
      this.p_email = obj.message[0].email; //USER EMAIL//
      this.p_phone = obj.message[0].phone; //USER PHONE//
      this.p_street = obj.message[0].street==undefined?'':obj.message[0].street; //USER STREET//
      this.p_city = obj.message[0].city==undefined?'':obj.message[0].city; //USER CITY//
      this.p_country = obj.message[0].country==undefined?'':obj.message[0].country; //USER COUNTRY//
      this.p_pin = obj.message[0].pincode==undefined?'':obj.message[0].pincode; //USER PINCODE//
      this.p_state = obj.message[0].state==undefined?'':obj.message[0].state; //USER STATE//
      this.email_verify=obj.message[0].email_verify; //WHETHER THE USER VERIFY HIS/HER EMAIL, IF THE USER VIRIFIED HIS/HER EMAIL ADDRESS THEN THIS FLAG WILL BE 'Y' OTHER WISE 'N'
      this.phone_verify=obj.message[0].phone_verify; //WHETHER THE USER VERIFY HIS/HER PHONE, IF THE USER VIRIFIED HIS/HER PHONE THEN THIS FLAG WILL BE 'Y' OTHER WISE 'N'
      this.profile = obj.message[0].image_url; //USER PROFILE IMAGE URL//
     // this.profile_image = obj.message[0].profile_image;
       this.mode=(obj.message[0].student_academician == '' || obj.message[0].student_academician == null) ? '' : obj.message[0].student_academician ; //ASSIGN THE FLAG TYPE OF USER WHETHER A USER SELECT STUDENT/ACCADEMICIAN, ADVOCATE OR CA/CS
      // CONDITIONALLY SHOW OR HIDE THE INPUT FIELD FOR 'S'-->'College/University' ,'C'-->'Name Of Company', 'A'-->'Practice Area'//
       if(this.mode=='S'){
        this.Clg=true;
        this.Corporate=false;
        this.Advocate=false;
        $('#prac_area').attr('hidden',true);
        $('#com_name').attr('hidden',true);
        $('#colg').removeAttr('hidden');
        $('#prac_area').val('');
        $('#com_name').val('');
        $('#colg').val(obj.message[0].college_university);
      }
      else if(this.mode=='A'){
        this.Clg=false;
        this.Corporate=false;
        this.Advocate=true;
        $('#colg').attr('hidden',true);
        $('#com_name').attr('hidden',true);
        $('#prac_area').removeAttr('hidden');
        $('#prac_area').val(obj.message[0].college_university);
        $('#com_name').val('');
        $('#colg').val('');
      }
      else if(this.mode=='C'){
        this.Clg=false;
        this.Corporate=true;
        this.Advocate=false;
        $('#colg').attr('hidden',true);
        $('#prac_area').attr('hidden',true);
        $('#com_name').removeAttr('hidden');
        $('#prac_area').val('');
        $('#com_name').val(obj.message[0].college_university);
        $('#colg').val('');
      }
      else{}
      //END//
      this.spin_show=false;
    })
    //END/////////////////////////////////////////

    localStorage.setItem('address','/user/edit-user');
    // AFTER CLICK ON BACKDROP OF THE MODAL THE TIME OUT FOR OTP HAS BEEN CANCELED
    $('#otpmodal').on('hidden.bs.modal',  ()=> {
      // if(this.Mode=='M'){
        clearTimeout(this.getId);
      // }
    })
    //END//
  }
  //CLICK EVENT FOR MODAL CANCELATION
  modal_close_fun() {this.m.style.display = 'none';
    // this.router.navigate(['user/user_dashboard'])
  }
  //END//
  //CLICK EVENT FOR MODAL CANCELATION
  modal_close_funtry() {this.m.style.display = 'none';}
  // END//

  //KEY PRESS EVENT FOR PHONE INPUT FIELD
  preventNonNumericalInput(e: any) {
    e = e || window.event;
      var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
      var charStr = String.fromCharCode(charCode);
  
      if (!charStr.match(/^[0-9]+$/))
        e.preventDefault();
  }
  //END//

  //CHANGE EVENT FOR INPUT TYPE FILE//
  onChange(event: any) {
    this.file = event.target.files[0];//Assign File details
    var ext = event.target.files[0].name.split('.').pop();//Get extension of image
    //For Checking whether the selected file extension is valid or not ,id valid then image is getting preview otherwise error modal will open with message 'Wrong Format!'
    if (ext == "jpeg" || ext == "jpg" || ext == 'png') {
      // this.fval = event.target.files[0].name;
      const reader = new FileReader();
      reader.onload = () => {
        this.profile= reader.result as string;
        // this.img_src=reader.result as string;
      }
      reader.readAsDataURL(this.file);
    }
    else {
      this.m.style.display='block';
      this.modal_msg='Wrong format!!'
      // this.fval = "";
    }
    //END//
  }
  //END//

  //CLICK EVENT FOR SUBMITTING USER DETAILS 
  send_data(v1: any, v2: any, v3: any, v4: any, v5: any, v6: any, v7: any, v8: any) {
      var college_university=this.mode =='S' ? $('#colg').val() : (this.mode=='A' ? $('#prac_area').val():$('#com_name').val());//For getting the value of ''S' --> College/University' / 'C' --> 'Name Of Company' / 'A' --> 'Practice Area'
      this.spin_show = true;
      this.update=true;
    this.m.style.display = 'none';
    if (v1 != '' && v2 != '' && v3 != '' && v4 != '' && v5 != '' && v6 != '' && v7 != '' && v8 != '') {
      //Call Api for posting user details (API URL:'/api/user/update')
    this.edit.edit_profile(localStorage.getItem('u-id'), v1, v2, v3, v4, v5, v6, v7, v8, localStorage.getItem('user-type_user'),this.mode,college_university,localStorage.getItem('remember_token'),this.file).subscribe(data => {
      var obj = JSON.parse(data);
      if (obj.success == 1) {
        this.spin_show = false;
        this.modal_msg='Your profile has been updated successfully!!';
        this.utilyT.showToastr(this.modal_msg,'S');
        //Call Api for getting user  details after submiited user details and post it (API URL: '/api/user/home')
        this.user.get_Details(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).subscribe(data => {
          var obj = JSON.parse(data);
          this.p_name = obj.message[0].name; //USER NAME//
          this.p_email = obj.message[0].email; //USER EMAIL//
          this.p_phone = obj.message[0].phone; //USER PHONE//
          this.p_street = obj.message[0].street==undefined?'':obj.message[0].street; //USER STREET//
          this.p_city = obj.message[0].city==undefined?'':obj.message[0].city; //USER CITY//
          this.p_country = obj.message[0].country==undefined?'':obj.message[0].country; //USER COUNTRY//
          this.p_pin = obj.message[0].pincode==undefined?'':obj.message[0].pincode; //USER PINCODE//
          this.p_state = obj.message[0].state==undefined?'':obj.message[0].state; //USER STATE//
          this.profile = obj.message[0].image_url;
         // this.profile_image = obj.message[0].profile_image;
        })
        //END//
      }
      else {
        // this.m.style.display = 'block';
        this.modal_msg='Error while updating.';
        this.utilyT.showToastr(this.modal_msg,'E');
        this.spin_show = false;
      }
    });
  }
  else{
    this.spin_show = false;
    this.m.style.display='none';
    this.modal_msg='One or more fields may be empty.'
  }
  
  }
  //END//

  // CLICK EVENT FOR RADIO BUTTON
showValue(event:any){
  this.mode=event.value;
// CONDITIONALLY SHOW OR HIDE THE INPUT FIELD FOR 'S'-->'College/University' ,'C'-->'Name Of Company', 'A'-->'Practice Area'//
  if(event.value=='S'){
    $('#prac_area').attr('hidden',true);
    $('#com_name').attr('hidden',true);
    $('#colg').removeAttr('hidden');
    $('#prac_area').val('');
    $('#com_name').val('',);
    $('#colg').val('');
  }
  else if(event.value=='A'){
    $('#colg').attr('hidden',true);
    $('#com_name').attr('hidden',true);
    $('#prac_area').removeAttr('hidden');
    $('#prac_area').val('');
    $('#com_name').val('');
    $('#colg').val('');
  }
  else{
    $('#colg').attr('hidden',true);
    $('#prac_area').attr('hidden',true);
    $('#com_name').removeAttr('hidden');
    $('#prac_area').val('');
    $('#com_name').val('',);
    $('#colg').val('');
  }
  //END//
}
//KEY UP EVENT FOR OTP INPUT FIELD  ; FOCUS TO THE NEXT INPUT FIELD IF NUMBER HAS BEEN GIVEN AS  VALUE// 
setfocus(event:any,mode:any,i:any){
  if(event.keyCode!=8){
    event = event || window.event;
    var charCode = (typeof event.which == "undefined") ? event.keyCode : event.which;
    var charStr = String.fromCharCode(charCode);
    if((event.keyCode>= 48 && event.keyCode<=57) || (event.keyCode>= 96 && event.keyCode<=105)){
      $('#'+mode).focus();
    }
    else{

    }

  }
  else if(event.keyCode==8 && i > 1){$('#otp'+(i-1)).focus();}
}
//END//
//ASSIGN TIMER FOR OTP//
update_time(){
  var myTime =$('#counter_left').text();
  var ss = myTime.split(":");
  var dt = new Date();
  dt.setHours(0);
  dt.setMinutes(ss[0]);
  dt.setSeconds(ss[1]);
  var dt2 = new Date(dt.valueOf() - 1000);
  var temp = dt2.toTimeString().split(" ");
  var ts = temp[0].split(":");
  $('#counter_left').text(ts[1]+":"+ts[2]);
  if(ts[1]=='00' && ts[2]=='00'){
  $('#counter_left').hide();
  $('#resendOtp').show();
  $('#counter_left').text('01:59');
  this.get_otp='';
  }
  else{
   this.getId=setTimeout(() => {
      this.update_time() 
    }, 1000);
  
  }
}
//END//
//FOR Resend OTP
Update(){
  this.check_response='';
  this.get_otp='';
  this.userOtp.getOtp(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'),this.otp_pn_em).subscribe(data=>{
    this.check_response=data;
    if(this.check_response.success==1){
      this.get_otp=this.check_response.otp;
      clearTimeout(this.getId)
      $('#counter_left').text('01:59');
      $('#counter_left').show();
      $('#resendOtp').hide();
      this.update_time();
    }
    else{
      this.utilyT.showToastr('Something went wrong! please try again later','E');
    }
  })
}
//click event fired when the OTP modal is opened
OpenModal(mode:any,val:any){
  $('#otp1').val(''); $('#otp2').val('');$('#otp3').val(''); $('#otp4').val('');$('#otp5').val('');$('#otp6').val('');
   this.Mode='';
  this.Mode=mode;
  this.check_response='';
  this.get_otp='';
  this.otp_pn_em='';
 this.userOtp.getOtp(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'),val).subscribe(data=>{
  this.check_response=data;
  if(this.check_response.success==1){
    this.get_otp=this.check_response.otp;
    this.otp_pn_em=this.check_response.email_phone;
    $('#modalSpan').text('');
    var msg='We have sent an OTP to '+val;
    if(mode!='E'){
      $('#counter_left').text('01:59');
      $('#counter_left').show();
      $('#resendOtp').hide();
      this.update_time();
       $('#modalSpan').text(msg);
    }
    else{
      $('#modalSpan').text(msg); 
    }
  }
  else{
    this.utilyT.showToastr('Something went wrong! please try again later','E'); 
  }
  
 })


}
//CLICK EVENT FIRED AFTER SUBMITTING OTP SUCCESSFULLY
submit(){clearTimeout(this.getId);
  this.show_loader=false;
  this.check_response='';
  $('#matLabel').text('');
  var otp=$('#otp1').val()+$('#otp2').val()+$('#otp3').val()+$('#otp4').val()+$('#otp5').val()+$('#otp6').val()
  if(otp==this.get_otp){
    this.userOtp.verifyphoneemail(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'),this.otp_pn_em).subscribe(data=>{
         this.check_response=data;
         if(this.check_response.success==1){
          $('#otp1').val('');
          $('#otp2').val('');
          $('#otp3').val('');
          $('#otp4').val('');
          $('#otp5').val('');
          $('#otp6').val('');
          this.show_loader=true;
          this.ngAfterViewInit();
          $('#CloseModal').click();
          var msg=this.Mode=='E'? 'Email verified Successfully' : 'Phone number verified successfully';
          this.utilyT.showToastr(msg,'S');
          $('.modal-backdrop').remove();
          $('body').removeClass( "modal-open" );
         }
         else{
          this.show_loader=true;
          this.utilyT.showToastr('Something went wrong! please try again later','E');
         }
    })
  }
  else{
    this.show_loader=true;
    this.utilyT.showToastr('Invalid OTP','E');
    $('#otp1').val(''); $('#otp2').val('');$('#otp3').val(''); $('#otp4').val('');$('#otp5').val('');$('#otp6').val('');

  }
}
//END//
//CLICK EVENT FIRED AFTER CLOSING VERIFY EMAIL / VERIFY MOBILE MODAL; CLEAR THE TIMER FOR OTP 
closeModal(){clearTimeout(this.getId);$('#otp1').val(''); $('#otp2').val('');$('#otp3').val(''); $('#otp4').val('');$('#otp5').val('');$('#otp6').val('');}
//END//
}
