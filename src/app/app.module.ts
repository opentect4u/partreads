import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule,Router} from '@angular/router';
import { PdfViewerModule }  from  'ng2-pdf-viewer';  
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
// import { NgxSpinnerModule } from "ngx-spinner";
// import { MatMenuModule, MatButtonModule } from '@angular/material'; 
// import { ChartsModule } from 'ng2-charts';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PublisherComponent } from './publisher/publisher.component';
import { PublishersComponent } from './dashboard/publishers/publishers.component';
import { UsersComponent } from './dashboard/users/users.component';
import { CategoryComponent } from './dashboard/category/category.component';
import { SubcategoryComponent } from './dashboard/subcategory/subcategory.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
import {ConnectionServiceModule} from 'ng-connection-service';  
import {MatTooltipModule} from '@angular/material/tooltip'; 
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { LogserveService } from './logserve.service';
import { CatserveService} from './catserve.service';
import { CreateCategoryComponent } from './dashboard/create-category/create-category.component';
import { UpdateCategoryComponent } from './dashboard/update-category/update-category.component';
import { CreateSubcategoryComponent } from './dashboard/create-subcategory/create-subcategory.component';
import { UpdatecatService } from './updatecat.service';
import { RegpubComponent } from './publisher-profile/regpub/regpub.component';
import { LogpubComponent } from './publisher-profile/logpub/logpub.component';
import { IndexpageComponent } from './publisher-profile/indexpage/indexpage.component';
import { PublisherDashboardComponent } from './publisher-profile/publisher-dashboard/publisher-dashboard.component';
import { PublisherAuthGuard } from './publisher-auth.guard';
import { PublisherloginAuthGuard } from './publisherlogin-auth.guard';
import { PublishernavComponent } from './publisher-profile/publishernav/publishernav.component';
import { EbookuploadComponent } from './publisher-profile/ebookupload/ebookupload.component';
import { BookuploadService } from './bookupload.service';
import { BookListComponent } from './publisher-profile/book-list/book-list.component';
import { BooklistService } from './booklist.service';
import { PublisherbooksComponent } from './dashboard/publisherbooks/publisherbooks.component';
import { UserRegComponent } from './user-profile/user-reg/user-reg.component';
import { UserLoginComponent } from './user-profile/user-login/user-login.component';
import { PurchaseListComponent } from './user-profile/purchase-list/purchase-list.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { SiteSideBarComponent } from './site-side-bar/site-side-bar.component';
import { PublogregheaderComponent } from './publogregheader/publogregheader.component';
import { UserheaderComponent } from './userheader/userheader.component';
import { UsersidebarComponent } from './usersidebar/usersidebar.component';
import { UserheaderafterloginComponent } from './userheaderafterlogin/userheaderafterlogin.component';
import { IndexNavHeaderComponent } from './index-nav-header/index-nav-header.component';
import { UserDashboardComponent } from './user-profile/user-dashboard/user-dashboard.component';
import { OrderHistoryComponent } from './user-profile/order-history/order-history.component';
import { AdvanceSearchComponent } from './user-profile/advance-search/advance-search.component';
import { NotificationsComponent } from './user-profile/notifications/notifications.component';
import { UserbookdetailspageComponent } from './user-profile/userbookdetailspage/userbookdetailspage.component';
import { AllbooksComponent } from './allbooks/allbooks.component';
import { ProgressBarModule } from "angular-progress-bar";
import { EditPubComponent } from './publisher-profile/edit-pub/edit-pub.component';
import { EditUserComponent } from './user-profile/edit-user/edit-user.component';
import { UserAllbooksComponent } from './user-profile/user-allbooks/user-allbooks.component';
import { EditbooksComponent } from './publisher-profile/editbooks/editbooks.component';
import { NorightclickDirective } from './user-profile/purchase-list/norightclick.directive';
import { KeyoffDirective } from './user-profile/purchase-list/keyoff.directive';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { RightclickoffDirective } from './user-profile/userbookdetailspage/rightclickoff.directive';
import { CtrlshiftoffDirective } from './user-profile/userbookdetailspage/ctrlshiftoff.directive';
import { ClickonlinkComponent } from './user-profile/clickonlink/clickonlink.component';
import { NorightDirective } from './publisher-profile/book-list/noright.directive';
import { NokeyDirective } from './publisher-profile/book-list/nokey.directive';
import { NotfoundComponent } from './notfound/notfound.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import {MatTableModule} from '@angular/material/table';
// import { NgxSpinnerModule } from "ngx-spinner";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AdminheaderComponent } from './dashboard/commoncomponent/adminheader/adminheader.component';
import { AdminfooterComponent } from './dashboard/commoncomponent/adminfooter/adminfooter.component';
import { AdminsidebarComponent } from './dashboard/commoncomponent/adminsidebar/adminsidebar.component';
import { UpdatesubcateComponent } from './dashboard/updatesubcate/updatesubcate.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PublishernotificationComponent } from './publisher-profile/publishernotification/publishernotification.component';
import { AdnminnotificationComponent } from './dashboard/adnminnotification/adnminnotification.component';
import { PaymenthistoryComponent } from './publisher-profile/paymenthistory/paymenthistory.component';
import { PaymentComponent } from './user-profile/payment/payment.component';
import { ActivepagesComponent } from './publisher-profile/activepages/activepages.component';
import { LawyersComponent } from './lawyers/lawyers.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { CartpageComponent } from './user-profile/cartpage/cartpage.component';
import { ChartsModule } from 'ng2-charts';
// import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import { UserForgetPasswordComponent } from './user-profile/user-forget-password/user-forget-password.component';
import { ChangeForgotPasswordComponent } from './user-profile/change-forgot-password/change-forgot-password.component';
import { PublisherforgotpasswordComponent } from './publisher-profile/publisherforgotpassword/publisherforgotpassword.component';
import { ChangeforgotpasswordComponent } from './publisher-profile/changeforgotpassword/changeforgotpassword.component';
import { DatePipe } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
// import {MatStepperModule} from '@angular/material/stepper';
// import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
// import {
//   GoogleLoginProvider,
//   FacebookLoginProvider
// } from 'angularx-social-login';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";

// Material DatePicker///
import {MatDatepickerModule} from '@angular/material/datepicker';
// End///
// Material GridList//
import {MatGridListModule} from '@angular/material/grid-list';
// End////////////////
// import {MatCheckboxModule} from '@angular/material/checkbox';
//For Star Rating////
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatChipsModule} from '@angular/material/chips';
import { AccVerificationComponent } from './acc-verification/acc-verification.component';
import { AccVerificationPubComponent } from './acc-verification-pub/acc-verification-pub.component';
import { DashComponent } from './user-profile/dash/dash.component';
import { LoginToReadComponent } from './user-profile/login-to-read/login-to-read.component';
//End///////////////
//For angular2 multiselect dropdown///
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
// import { FileDragDropDirective } from './publisher-profile/file-drag-drop.directive';
//End///////////////////////////////
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { NgxSpinnerModule } from "ngx-spinner";

 //Image Magnifier/////
//  import { ImgMagnifier } from "ng-img-magnifier";
 //ENd////////////////
//  import { ImgMagnifier } from "ng-img-magnifier";
// import { NgxImageZoomModule } from 'ngx-image-zoom';
import {MatRadioModule} from '@angular/material/radio';
 import {TextFieldModule} from '@angular/cdk/text-field';
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
import {MatDividerModule} from '@angular/material/divider';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminPayemthistoryComponent } from './dashboard/admin-payemthistory/admin-payemthistory.component';
import { CommissionMgmtComponent } from './dashboard/commission-mgmt/commission-mgmt.component';
import { PublisherCommissionComponent } from './publisher-profile/publisher-commission/publisher-commission.component';
import { ViewBookdetailsComponent } from './publisher-profile/view-bookdetails/view-bookdetails.component';
// import { DashboardServiceComponent } from './publisher-profile/publisher-dashboard/dashboard-service/dashboard-service.component';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CouponCodeComponent } from './dashboard/coupon-code/coupon-code.component';
import { UsedCouponComponent } from './dashboard/used-coupon/used-coupon.component';
import { AddCouponComponent } from './dashboard/add-coupon/add-coupon.component';
import { SearchPipe } from './dashboard/search.pipe';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { TermsComponent } from './terms/terms.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AlertDialogComponent } from './user-profile/alert-dialog/alert-dialog.component';
import { UnSubscribeComponent } from './user-profile/un-subscribe/un-subscribe.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TransformPipe } from './transform.pipe';
import { LoaderComponent } from './CommonLoader/loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { adminemailComponent } from './dashboard/AdminEmail/adminemail.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AssigncpnagainstbooksComponent } from './dashboard/assignCpnAgainstbooks/assignCpnAgainstbooks.component';
import { DialogforbjapprejComponent } from './dashboard/dialogForbkApprRej/dialogForbjAppRej.component';
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("Your-Facebook-app-id")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("672469858991-g4fb7nel5v3fbcice07dds7dv30p80ip.apps.googleusercontent.com")
        },
         
      ]
  );
  return config;
}
@NgModule({
  declarations: [	
    DialogforbjapprejComponent,
    AssigncpnagainstbooksComponent,
    adminemailComponent,
    TransformPipe,
    TermsComponent,
    PrivacyPolicyComponent,
    AppComponent,
    DashboardComponent,
    PublisherComponent,
    PublishersComponent,
    UsersComponent,
    CategoryComponent,
    SubcategoryComponent,
    LoginComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    CreateSubcategoryComponent,
    RegpubComponent,
    LogpubComponent,
    IndexpageComponent,
    PublisherDashboardComponent,
    PublishernavComponent,
    EbookuploadComponent,
    BookListComponent,
    PublisherbooksComponent,
    UserRegComponent,
    UserLoginComponent,
    PurchaseListComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    SiteSideBarComponent,
    PublogregheaderComponent,
    UserheaderComponent,
    UsersidebarComponent,
    UserheaderafterloginComponent,
    IndexNavHeaderComponent,
    UserDashboardComponent,
    OrderHistoryComponent,
    AdvanceSearchComponent,
    NotificationsComponent,
    // MatSnackBarModule,
    UserbookdetailspageComponent,
    AllbooksComponent,
    EditPubComponent,
    EditUserComponent,
    UserAllbooksComponent,
    EditbooksComponent,
    NorightclickDirective,
    KeyoffDirective,
    RightclickoffDirective,
    CtrlshiftoffDirective,
    ClickonlinkComponent,
    NorightDirective,
    NokeyDirective,
    NotfoundComponent,
    AdminheaderComponent,
    AdminfooterComponent,
    AdminsidebarComponent,
    UpdatesubcateComponent,
    ErrorPageComponent,
    PublishernotificationComponent,
    AdnminnotificationComponent,
    PaymenthistoryComponent,
    PaymentComponent,
    ActivepagesComponent,
    LawyersComponent,
    CartpageComponent,
    UserForgetPasswordComponent,
    ChangeForgotPasswordComponent,
    PublisherforgotpasswordComponent,
    ChangeforgotpasswordComponent,
    AccVerificationComponent,
    AccVerificationPubComponent,
    DashComponent,
    LoginToReadComponent,
    AdminsComponent,
    AdminsAddComponent,
    ReviewRatingComponent,
    HardcopyComponent,
    PubDetailsComponent,
    UserDetailsComponent,
    ReportsComponent,
    AdminReportsComponent,
    PubReportsComponent,
    FullReportsComponent,
    AdminPayemthistoryComponent,
    CommissionMgmtComponent,
    PublisherCommissionComponent,
    ViewBookdetailsComponent,
    CouponCodeComponent,
    UsedCouponComponent,
    AddCouponComponent,
    SearchPipe,
    AlertDialogComponent,
    UnSubscribeComponent,
    TransformPipe,
    LoaderComponent,   
     // DashboardServiceComponent
    // FileDragDropDirective
   ],
  imports: [
    AngularEditorModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    CarouselModule,
    ScrollingModule,
    MatListModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSelectModule,
    MatRadioModule,
    MatDividerModule,
    MatCardModule,
    MatNativeDateModule,
    TextFieldModule,
    MatGridListModule,
    MatDatepickerModule,
    AngularMultiSelectModule,
    MatStepperModule,
    MatIconModule,
    BrowserModule,
    CommonModule,
    MatButtonModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AutocompleteLibModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    PdfViewerModule,
    ProgressBarModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    ConnectionServiceModule,
    NgxExtendedPdfViewerModule,
    ImageCropperModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    ChartsModule,
    MatTooltipModule,
    ToastrModule.forRoot(),
    MatMenuModule,
    NgxExtendedPdfViewerModule 
  ],
  providers: [
  DatePipe,
  {provide:LocationStrategy, useClass:HashLocationStrategy},MatStepperModule, CookieService,AuthService,LogserveService,CatserveService,UpdateCategoryComponent,UpdatecatService,BookuploadService,BooklistService,UserbookdetailspageComponent,UserAllbooksComponent,AllbooksComponent],
  bootstrap: [AppComponent],

  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class AppModule { }
