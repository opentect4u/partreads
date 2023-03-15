import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PublisherComponent } from './publisher/publisher.component';
import { PublishersComponent } from './dashboard/publishers/publishers.component';
import { UsersComponent } from './dashboard/users/users.component';
import { CategoryComponent } from './dashboard/category/category.component';
import { SubcategoryComponent } from './dashboard/subcategory/subcategory.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { CreateCategoryComponent } from './dashboard/create-category/create-category.component';
import { UpdateCategoryComponent } from './dashboard/update-category/update-category.component';
import { CreateSubcategoryComponent } from './dashboard/create-subcategory/create-subcategory.component';
import { RegpubComponent } from './publisher-profile/regpub/regpub.component';
import { LogpubComponent } from './publisher-profile/logpub/logpub.component';
import { IndexpageComponent } from './publisher-profile/indexpage/indexpage.component';
import { PublisherDashboardComponent } from './publisher-profile/publisher-dashboard/publisher-dashboard.component';
import { PublisherAuthGuard } from './publisher-auth.guard';
import { PublisherloginAuthGuard } from './publisherlogin-auth.guard';
import { PublishernavComponent } from './publisher-profile/publishernav/publishernav.component';
import { EbookuploadComponent } from './publisher-profile/ebookupload/ebookupload.component';
import { BookListComponent } from './publisher-profile/book-list/book-list.component';
import { PublisherbooksComponent } from './dashboard/publisherbooks/publisherbooks.component';
import { UserRegComponent } from './user-profile/user-reg/user-reg.component';
import { UserLoginComponent } from './user-profile/user-login/user-login.component';
import { PurchaseListComponent } from './user-profile/purchase-list/purchase-list.component';
import { UserDashboardComponent } from './user-profile/user-dashboard/user-dashboard.component';
// import { NotificationsComponent } from './user-profile/notifications/notifications.component';
import { OrderHistoryComponent } from './user-profile/order-history/order-history.component';
import { UserbookdetailspageComponent } from './user-profile/userbookdetailspage/userbookdetailspage.component';
import { AllbooksComponent } from './allbooks/allbooks.component';
import { EditPubComponent } from './publisher-profile/edit-pub/edit-pub.component';
import { EditUserComponent } from './user-profile/edit-user/edit-user.component';
import { UserAllbooksComponent } from './user-profile/user-allbooks/user-allbooks.component';
import { ClickonlinkComponent } from './user-profile/clickonlink/clickonlink.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UserauthGuard } from './user-profile/userauth.guard';
import { UserloginauthGuard } from './user-profile/userloginauth.guard';
import { UpdatesubcateComponent } from './dashboard/updatesubcate/updatesubcate.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PublishernotificationComponent } from './publisher-profile/publishernotification/publishernotification.component';
import { AdnminnotificationComponent } from './dashboard/adnminnotification/adnminnotification.component';
import { EditbooksComponent } from './publisher-profile/editbooks/editbooks.component';
import { PaymenthistoryComponent } from './publisher-profile/paymenthistory/paymenthistory.component';
import { PaymentComponent } from './user-profile/payment/payment.component';
import { ActivepagesComponent } from './publisher-profile/activepages/activepages.component'
import { LawyersComponent } from './lawyers/lawyers.component';


import { CartpageComponent } from './user-profile/cartpage/cartpage.component';
import { UserForgetPasswordComponent } from './user-profile/user-forget-password/user-forget-password.component';
import { ChangeForgotPasswordComponent } from './user-profile/change-forgot-password/change-forgot-password.component';
import { PublisherforgotpasswordComponent } from './publisher-profile/publisherforgotpassword/publisherforgotpassword.component';
import { ChangeforgotpasswordComponent } from './publisher-profile/changeforgotpassword/changeforgotpassword.component';
import { AccVerificationComponent } from './acc-verification/acc-verification.component';
import { AccVerificationPubComponent } from './acc-verification-pub/acc-verification-pub.component';
import { DashComponent } from './user-profile/dash/dash.component';
import { LoginToReadComponent } from './user-profile/login-to-read/login-to-read.component';
import { AdminsComponent } from './dashboard/admins/admins.component';
import { AdminsAddComponent } from './dashboard/admins-add/admins-add.component';
import { ReviewRatingComponent } from './dashboard/review-rating/review-rating.component';
import { HardcopyComponent } from './dashboard/hardcopy/hardcopy.component';
import { PubDetailsComponent } from './dashboard/publishers/pub-details/pub-details.component';
import { UserDetailsComponent } from './dashboard/users/user-details/user-details.component';
import { ReportsComponent } from './commonReport/reports/reports.component';
import { AdminReportsComponent } from './dashboard/admin-reports/admin-reports.component';
import { PubReportsComponent } from './dashboard/pub-reports/pub-reports.component';
import { FullReportsComponent } from './dashboard/full-reports/full-reports.component';
import { AdminPayemthistoryComponent } from './dashboard/admin-payemthistory/admin-payemthistory.component';
import { CommissionMgmtComponent } from './dashboard/commission-mgmt/commission-mgmt.component';
import { PublisherCommissionComponent } from './publisher-profile/publisher-commission/publisher-commission.component';
import { ViewBookdetailsComponent } from './publisher-profile/view-bookdetails/view-bookdetails.component';
import { CouponCodeComponent } from './dashboard/coupon-code/coupon-code.component';
import { UsedCouponComponent } from './dashboard/used-coupon/used-coupon.component';
import { AddCouponComponent } from './dashboard/add-coupon/add-coupon.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsComponent } from './terms/terms.component';
import { UnSubscribeComponent } from './user-profile/un-subscribe/un-subscribe.component';
import { adminemailComponent } from './dashboard/AdminEmail/adminemail.component';
import { NotificationsComponent } from './user-profile/notifications/notifications.component';
import { EventHandledGuard } from './Utility/event-handled.guard';
import { AssigncpnagainstbooksComponent } from './dashboard/assignCpnAgainstbooks/assignCpnAgainstbooks.component';


const routes: Routes = [
  // {
  //   path: 'admin/login',
  //   // canActivate: [AuthGuard],
  //   component: LoginComponent
  // },
  {
    path: 'admin',
    canActivate: [LoginGuard],
    component: LoginComponent
  },
  {
     path:'oth_admins',
     canActivate: [AuthGuard],
     component:AdminsComponent
  },
 {
    path:'admins_add/:id',
    canActivate: [AuthGuard],
    component:AdminsAddComponent

 },{
    path:'admin/review_rating',
    canActivate: [AuthGuard],
    component:ReviewRatingComponent

 },
  {
    path: 'admin/dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: 'admin/publisher',
     canActivate: [AuthGuard],
    component: PublishersComponent
  },
{
  path:'admin/hardcopy',
  canActivate: [AuthGuard],
  component:HardcopyComponent
},
{
  path:'admin/pub_details/:id',
  canActivate: [AuthGuard],
  component:PubDetailsComponent
},

  {
    path: 'admin/users',
    canActivate: [AuthGuard],
    component: UsersComponent
  },
  {
    path: ':admin/category',
    canActivate: [AuthGuard],
    component: CategoryComponent
  },
  {
    path: ':admin/category/:id/:id1',
    canActivate: [AuthGuard],
    component: CategoryComponent
  },
  {
    path: 'admin/createcategory',
    canActivate: [AuthGuard],
    component: CreateCategoryComponent
  },
  {
    path: 'admin/subcategory',
    canActivate: [AuthGuard],
    component: SubcategoryComponent
  },
  {
    path: 'admin/subcategory/:id/:id1/:id2',
    canActivate: [AuthGuard],
    component: SubcategoryComponent
  },
  {
    path: 'admin/updatesubcategory/:id/:id1/:id2',
    canActivate:[AuthGuard],
    component: UpdatesubcateComponent
  },
  {
    path: 'admin/updatesubcategory',
    canActivate:[AuthGuard],
    component: UpdatesubcateComponent
  },
  {
    path: 'admin/notifications',
    canActivate:[AuthGuard],
    component: AdnminnotificationComponent
  },
  {
    path:'admin/user_details/:id',
    canActivate: [AuthGuard],
    component:UserDetailsComponent
  },
  {
    path: 'admin/login',
    canActivate: [LoginGuard],
    component: LoginComponent
  },
  {
    path: 'admin/updatecategory',
    canActivate:[AuthGuard],
    component: UpdateCategoryComponent
  },
  {
    path: 'admin/updatecategory/:id/:id1',
    canActivate:[AuthGuard],
    component: UpdateCategoryComponent
  },
  {
     path:'admin/email',
     component:adminemailComponent
  },
  // {
  //   path: 'admin/createsubcategory',
  //   canActivate:[AuthGuard],
  //   component: CreateSubcategoryComponent
  // },

  {
    path: 'admin/createsubcategory/:id',
    canActivate:[AuthGuard],
    component: CreateSubcategoryComponent
  },
  {
    path: 'publisher/regpub',
    canActivate: [PublisherloginAuthGuard,UserloginauthGuard],
    component: RegpubComponent
  },
  {
    path: 'publisher/logpub',
    canActivate: [PublisherloginAuthGuard,UserloginauthGuard],
    component: LogpubComponent
  },
  {
    path:'lawyers',
    component:LawyersComponent
  },
  // {
  //   path:'readmore1',
  //   component:Readmore1Component
  // },
  // {
  //   path:'readmore2',
  //   component:Readmore2Component
  // },
  // {
  //   path:'readmore3',
  //   component:Readmore3Component
  // },
  {
    path: '',
    // canActivate: [PublisherloginAuthGuard,UserloginauthGuard],
    component: IndexpageComponent
  },
  {
    path: 'publisher/publisher-dashboard',
    canActivate: [PublisherAuthGuard,UserloginauthGuard],
    component: PublisherDashboardComponent
  },
  {
    path: 'publisher/publishernav',
    canActivate: [PublisherloginAuthGuard,UserloginauthGuard],
    component: PublishernavComponent

  },
  {
    path: 'publisher/ebookupload',
    canActivate: [PublisherAuthGuard,UserloginauthGuard],
    component: EbookuploadComponent
    // ,
    // canDeactivate:[EventHandledGuard]
  },
  {
    path: 'publisher/notification',
    canActivate: [PublisherAuthGuard,UserloginauthGuard],
    component: PublishernotificationComponent
 },
  {
    path: 'publisher/book-list',
    canActivate: [PublisherAuthGuard,UserloginauthGuard],
    component: BookListComponent
  },
  {
    path: 'admin/publisherbooks',
    canActivate:[AuthGuard],
    component: PublisherbooksComponent
  },
  {
    path: 'user/userreg',
    canActivate:[PublisherloginAuthGuard,UserloginauthGuard],
    component: UserRegComponent
  },

  {
    path: 'user/userlogin',
    canActivate:[PublisherloginAuthGuard,UserloginauthGuard],
    component: UserLoginComponent
  },
  {
    path: 'user/purchaselist',
    canActivate:[UserauthGuard,PublisherloginAuthGuard],
    component: PurchaseListComponent
  },
  {
    path: 'user/clickonlink',
    // canActivate:[UserauthGuard],
    component: ClickonlinkComponent
  },
  {
    path: 'user/user_dashboard',
    canActivate:[UserauthGuard,PublisherloginAuthGuard],
    component: UserDashboardComponent
  },
  {
    path:'user/login_to_read',
    // canActivate:[UserauthGuard,PublisherloginAuthGuard],
    component:LoginToReadComponent
  },
    {
      path: 'user/user_view',
      canActivate:[UserauthGuard,PublisherloginAuthGuard],
      component: DashComponent
    }, 
  
  {
    path: 'user/notifications',
    canActivate:[UserauthGuard,PublisherloginAuthGuard],
    component: NotificationsComponent
  },
  {
    path: 'user/order_history',
    canActivate:[UserauthGuard,PublisherloginAuthGuard],
    component: OrderHistoryComponent
  },
  {
    path: 'user/bookdetails',
    canActivate:[UserauthGuard,PublisherloginAuthGuard],
    component: UserbookdetailspageComponent
  },
  {
    path: 'allbooks/:search_value',
    canActivate: [PublisherloginAuthGuard,UserloginauthGuard],
    component: AllbooksComponent
  },
  {
    path: 'allbooks',
    canActivate: [PublisherloginAuthGuard,UserloginauthGuard],
    component: AllbooksComponent
  },
  {
    path: 'publisher/edit',
    canActivate: [PublisherAuthGuard,UserloginauthGuard],
    component: EditPubComponent
  },
  {
    path:'publisher/editbooks/:id/:id1',
    canActivate: [PublisherAuthGuard,UserloginauthGuard],
    component: EditbooksComponent
  },
  {
    path:'publisher/paymenthistory',
    canActivate: [PublisherAuthGuard,UserloginauthGuard],
    component:PaymenthistoryComponent
  },
  {
    path:'publisher/activepages',
    canActivate: [PublisherAuthGuard,UserloginauthGuard],
    component:ActivepagesComponent
  },
  // {
  //    path:'user/payment',
  //    canActivate:[UserauthGuard,PublisherloginAuthGuard],
  //    component:PaymentComponent
  // },
  {
    path:'user/payment/:book_id/:pub_id/:book_name/:frm/:to/:whole_book',
       canActivate:[UserauthGuard,PublisherloginAuthGuard],
       component:PaymentComponent
  },
  {
    path: 'user/edit-user',
    canActivate:[UserauthGuard,PublisherloginAuthGuard],
    component: EditUserComponent
  },
  {
    path: 'user/user_allbooks',
    canActivate:[UserauthGuard,PublisherloginAuthGuard],
    component: UserAllbooksComponent
  },
  {
    path:'user/cart',
    canActivate:[UserauthGuard,PublisherloginAuthGuard],
    component:CartpageComponent
  },
  {
    path:'user/forgetpassword',
    component:UserForgetPasswordComponent
  },
  {
    path:'user/changeforgotpassword/:user_id',
    component:ChangeForgotPasswordComponent
  },
  {
    path:'publisher/forgetpassword',
    component:PublisherforgotpasswordComponent
  },
  {
    path:'user/verification/:id',
    component:AccVerificationComponent
  },
  {
    path:'publisher/verification/:id',
    component:AccVerificationPubComponent
  },
  {
    path:'publisher/changeforgotpassword/:user_id',
    component:ChangeforgotpasswordComponent
  },
  {
    path:'reports',
    // canActivate:[UserauthGuard,PublisherloginAuthGuard],
    // canActivate: [PublisherAuthGuard,UserloginauthGuard],

    component:ReportsComponent
  },
  {
    path:'admin/reports',
    canActivate: [AuthGuard],
    component:AdminReportsComponent
  },
  {
    path:'admin/pubReports',
    canActivate: [AuthGuard],
    component:PubReportsComponent
  },
  {
    path:'admin/fullReports/:id/:type',
    component:FullReportsComponent
  },
  {
    path:'admin/history',
    canActivate: [AuthGuard],
    component:AdminPayemthistoryComponent
  },
  {
    path:'admin/commision',
    canActivate: [AuthGuard],
    component:CommissionMgmtComponent
  },
  // {
  //   path:'publisher/viewDetails/:id/:id1',
  //   component:ViewBookdetailsComponent
  // },
  {
    path:'publisher/viewDetails/:id/:id1/:flag',
    component:ViewBookdetailsComponent
  },
  {
        path:'publisher/pubCommission',
        component:PublisherCommissionComponent
  },
  {
    path:'admin/couponCode',
    canActivate: [AuthGuard],
    component:CouponCodeComponent
  },

  {
    path:'admin/addCoupon',
    canActivate: [AuthGuard],
    component:AddCouponComponent
  },
  {
    path:'admin/assigncpnagainstbooks/:id',
    canActivate: [AuthGuard],
    component:AssigncpnagainstbooksComponent
  },
  {
     path:'admin/usedCoupon',
    canActivate: [AuthGuard],
     component:UsedCouponComponent
  },
  {
      path:'Privacypolicy',
      component:PrivacyPolicyComponent
  },
  {
      path:'terms',
      component:TermsComponent
  },
  {
    path:'unsubscribe/:email',
    component:UnSubscribeComponent
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '404pagenotfound/:id',
    component: NotfoundComponent
  },
  { path: '**', redirectTo: '/404'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
