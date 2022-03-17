<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// check some test
/*Route::get('/test',[App\Http\Controllers\HomeController::class, 'Test']);
Route::get('/testing',[App\Http\Controllers\TestController::class, 'Test']);
Route::get('/testing1',[App\Http\Controllers\TestController::class, 'Test1']);
Route::get('/testing3',[App\Http\Controllers\TestController::class, 'Test3']);
Route::get('/testing4',[App\Http\Controllers\TestController::class, 'Test4']);
Route::get('/testing5',[App\Http\Controllers\TestController::class, 'Test5']);
Route::get('/testing6',[App\Http\Controllers\TestController::class, 'Test6']);

Route::get('/testing8',[App\Http\Controllers\TestController::class, 'Test8']);
Route::get('/testing9',[App\Http\Controllers\TestController::class, 'Test9']);

Route::get('/sendemail',[App\Http\Controllers\TestController::class, 'Sendemail']);

Route::post('/fileupload',[App\Http\Controllers\TestController::class, 'Fileupload'])->name('fileupload');

Route::get('/testing12',[App\Http\Controllers\TestController::class, 'Test12']);*/

// main api URL

Route::get('/getapiurl', [App\Http\Controllers\HomeController::class, 'Get_API_URL'])->name('getapiurl'); // get main API URL

Route::get('/getmainurl', [App\Http\Controllers\HomeController::class, 'GetURL'])->name('getmainurl'); // get main URL


Route::get('/searchbooks',[App\Http\Controllers\HomeController::class, 'AutoComSearch'])->name('searchbooks');  // Without login click on search textbox 
Route::post('/allbooks',[App\Http\Controllers\HomeController::class, 'AllBooks'])->name('allbooks'); // Without login click on library

Route::post('/enquiry',[App\Http\Controllers\EnquiryController::class, 'Enquiry'])->name('enquiry');  // submit contact us form

Route::post('/change/changepassword', [App\Http\Controllers\publisher\LoginController::class, 'ChangePassword'])->name('change.changepassword');  //  change password user and publisher

Route::post('/change/forgotpassword', [App\Http\Controllers\ForgotController::class, 'Forgot'])->name('change.forgotpassword');  // forgot password  publisher and user
Route::post('/change/forgotpasswordconfirm', [App\Http\Controllers\ForgotController::class, 'ChangeForgot'])->name('change.forgotpasswordconfirm');  // Change password successfully user and publisher 

// All publisher route here 
Route::post('/publisher/register', [App\Http\Controllers\publisher\RegisterController::class,'Create'])->name('publisher.register'); // Register publisher
Route::post('/publisher/confirmregister', [App\Http\Controllers\publisher\RegisterController::class,'ConfirmCreate'])->name('publisher.confirmregister'); // confirm register, click on link send to gmail. 

Route::post('/publisher/login', [App\Http\Controllers\publisher\LoginController::class, 'Login'])->name('publisher.login');  // publisher login 

Route::post('/publisher/home', [App\Http\Controllers\publisher\HomeController::class, 'Home'])->name('publisher.home'); //  click on dashboard
Route::post('/publisher/update', [App\Http\Controllers\publisher\HomeController::class, 'Update'])->name('publisher.update'); // pofile update

	// using ajax
Route::get('/publisher/showcategory', [App\Http\Controllers\publisher\BookController::class, 'ALLCategory'])->name('publisher.showcategory'); //  on uploading book click on category option

Route::post('/publisher/showsubcategory', [App\Http\Controllers\publisher\BookController::class, 'SubCategory'])->name('publisher.showsubcategory'); // on uploading book click on subcategory option

Route::post('/publisher/uploadbook', [App\Http\Controllers\publisher\BookController::class, 'UplodBook'])->name('publisher.uploadbook'); // upload book
Route::post('/publisher/splitbook', [App\Http\Controllers\publisher\BookController::class, 'Splitbook'])->name('publisher.splitbook'); // uploading book splite per page

Route::post('/publisher/allbooks', [App\Http\Controllers\publisher\BookController::class, 'ListBook'])->name('publisher.allbooks'); // click on all book
Route::get('/publisher/allbooks/{id?}', [App\Http\Controllers\publisher\BookController::class, 'ListBook'])->name('publisher.allbooks'); 
Route::post('/publisher/activebooks', [App\Http\Controllers\publisher\BookController::class, 'ActiveBook'])->name('publisher.activebooks'); // 

Route::post('/publisher/notificationcount', [App\Http\Controllers\publisher\NotificationController::class, 'Count'])->name('publisher.notificationcount'); // notifiction counting 
Route::post('/publisher/notificationshow', [App\Http\Controllers\publisher\NotificationController::class, 'Show'])->name('publisher.notificationshow'); // click on notification bell icon

Route::post('/publisher/editbookshow', [App\Http\Controllers\publisher\BookController::class, 'EditbookShow'])->name('publisher.editbookshow'); // click on eye icon and edit button
Route::post('/publisher/editbookconfirm', [App\Http\Controllers\publisher\BookController::class, 'Editbook'])->name('publisher.editbookconfirm'); // update book

Route::get('/publisher/activepages', [App\Http\Controllers\publisher\ActivePagesController::class, 'ShowPages'])->name('publisher.activepages'); //click on inactive books


Route::post('/publisher/report', [App\Http\Controllers\publisher\HomeController::class, 'Report'])->name('publisher.report'); // click on contacts

Route::get('/publisher/paymenthistory', [App\Http\Controllers\publisher\HomeController::class, 'PaymentHistory'])->name('publisher.paymenthistory');  // click on commission history
Route::post('/publisher/soldbookhistory', [App\Http\Controllers\publisher\HomeController::class, 'SoldBookHistory'])->name('publisher.soldbookhistory'); // click on subcription history
Route::post('/publisher/homedetails', [App\Http\Controllers\publisher\HomeController::class, 'HomeDetails'])->name('publisher.homedetails'); // show publisher dashboard details 


// ALl users route here
Route::post('/user/register', [App\Http\Controllers\user\RegisterController::class,'Create_old'])->name('user.register'); // register

Route::post('/user/registerlogin', [App\Http\Controllers\user\RegisterController::class,'Create'])->name('user.registerlogin'); // register
Route::post('/user/registerlogin1', [App\Http\Controllers\user\RegisterController::class,'Create1'])->name('user.registerlogin1'); // register
Route::post('/user/registerlogin2', [App\Http\Controllers\user\RegisterController::class,'Create2'])->name('user.registerlogin2'); // register

Route::post('/user/confirmregister', [App\Http\Controllers\user\RegisterController::class,'ConfirmCreate'])->name('user.confirmregister'); // confirm register
Route::post('/user/login', [App\Http\Controllers\user\LoginController::class, 'Login'])->name('user.login');  // login

Route::post('/user/home', [App\Http\Controllers\user\HomeController::class, 'Home'])->name('user.home');   // click on dashboard
Route::post('/user/update', [App\Http\Controllers\user\HomeController::class, 'Update'])->name('user.update'); // profile update

Route::post('/user/allbooks', [App\Http\Controllers\user\BookController::class, 'ALLBooks'])->name('user.allbooks'); // click on store
Route::post('/user/showbook', [App\Http\Controllers\user\BookController::class, 'Book'])->name('user.showbook'); // on store setion click on particular book
Route::post('/user/allpublishers', [App\Http\Controllers\user\BookController::class, 'Publishers'])->name('user.allpublishers'); // on store section filter option 

Route::post('/user/topratedbook', [App\Http\Controllers\user\BookController::class, 'TopRatedBook'])->name('user.topratedbook'); // on store section 
Route::get('/user/catewithsubcate', [App\Http\Controllers\user\BookController::class, 'CateWithSubcategory'])->name('user.catewithsubcate'); 
Route::post('/user/relatedbook', [App\Http\Controllers\user\BookController::class, 'RelatedBook'])->name('user.relatedbook'); // on store setion click on particular book on right side details


Route::post('/user/showcategory', [App\Http\Controllers\user\SearchBookController::class, 'ALLCategory'])->name('user.showcategory'); // on store section filter option 
Route::post('/user/showsubcategory', [App\Http\Controllers\user\SearchBookController::class, 'SubCategory'])->name('user.showsubcategory'); // on store section filter option 
Route::post('/user/searchbook', [App\Http\Controllers\user\SearchBookController::class, 'SearchBook'])->name('user.searchbook'); // click on search buttton 

Route::post('/user/autocomsearch', [App\Http\Controllers\user\SearchBookController::class, 'AutoComSearch'])->name('user.autocomsearch'); // click on search textbox show result 

Route::post('/user/showpreviewindex', [App\Http\Controllers\user\BookController::class, 'BookPreviewIndex'])->name('user.showpreviewindex'); //on book details page click on preview button

Route::post('/user/showpreviewindexandbuypages', [App\Http\Controllers\user\BookController::class, 'PreviewAndBuyPages'])->name('user.showpreviewindexandbuypages'); //on book details page click on preview button

Route::post('/user/buybookpages', [App\Http\Controllers\user\BookController::class, 'BuybookPages'])->name('user.buybookpages'); // on book details page click on buy pages


Route::post('/user/purchaselist', [App\Http\Controllers\user\PurchaseListController::class, 'PurchaseList'])->name('user.purchaselist'); // click on my books
Route::post('/user/purchasebookpageshow', [App\Http\Controllers\user\PurchaseListController::class, 'PurchaseBookShow'])->name('user.purchasebookpageshow'); // on my books section  click on partcular book

Route::post('/user/sharebookpage', [App\Http\Controllers\user\ShareBookController::class, 'ShareBookPage'])->name('user.sharebookpage'); // click on parchesed page open the model then click on share iocn then click on copy link button and share button

Route::post('/user/clickonlink', [App\Http\Controllers\user\ShareBookController::class, 'ClickLink'])->name('user.clickonlink'); // click on link button

Route::post('/user/clickbuyonmodel', [App\Http\Controllers\user\ShareBookController::class, 'BuyBookModelClick'])->name('user.clickbuyonmodel'); // before share model open click on buy now button 

Route::post('/user/notificationcount', [App\Http\Controllers\user\NotificationController::class, 'Count'])->name('user.notificationcount');  // notification counting
Route::post('/user/notificationshow', [App\Http\Controllers\user\NotificationController::class, 'Show'])->name('user.notificationshow'); //click on notifiation bell

Route::post('/user/orderhistory', [App\Http\Controllers\user\OrderHistoryController::class, 'OrderHistory'])->name('user.orderhistory'); // click on subscription history

Route::post('/user/addtocart', [App\Http\Controllers\user\AddToCartController::class, 'CreateCart'])->name('user.addtocart'); // on store setion click on particular book then click on add to cart 
Route::post('/user/showcartdetails', [App\Http\Controllers\user\AddToCartController::class, 'ShowCart'])->name('user.showcartdetails'); // count card details
Route::post('/user/showbookcart', [App\Http\Controllers\user\AddToCartController::class, 'ShowBookCart'])->name('user.showbookcart'); // click on cart icon
Route::post('/user/removetocart', [App\Http\Controllers\user\AddToCartController::class, 'Remove'])->name('user.removetocart'); //  remove book from card 


Route::post('/user/createrating', [App\Http\Controllers\user\RatingController::class, 'Create'])->name('user.createrating'); // create rating on book details page
Route::post('/user/showratingperuser', [App\Http\Controllers\user\RatingController::class, 'ShowRatingUser'])->name('user.showratingperuser'); // show ratring per user on book details page
Route::post('/user/showavaragerating', [App\Http\Controllers\user\RatingController::class, 'AvarageRating'])->name('user.showavaragerating'); // show average ratring per user on book details page

Route::post('/user/dsahboarddata', [App\Http\Controllers\user\HomeController::class, 'GraphData'])->name('user.dsahboarddata');  // user dash details


Route::post('/user/printbook', [App\Http\Controllers\user\BookController::class, 'PrintBook'])->name('user.printbook'); // on preview book page click on subscribe hard copy


Route::post('/user/report', [App\Http\Controllers\user\HomeController::class, 'Report'])->name('user.report'); // go to contact and click on submit

Route::post('/user/applycoupon', [App\Http\Controllers\user\CouponController::class, 'Apply'])->name('user.applycoupon'); // on user dashboard page click on apply button

Route::post('/user/registerapplycoupon', [App\Http\Controllers\user\RegisterController::class, 'ApplyCoupon'])->name('user.registerapplycoupon'); // on registration click on apply coupon



// All admin route here
Route::post('/admin/login', [App\Http\Controllers\admin\LoginController::class, 'Login'])->name('admin.login'); // login admin 

Route::get('/admin/categoryshow', [App\Http\Controllers\admin\MdCategoryController::class, 'Show'])->name('admin.categoryshow'); // click on category
Route::post('/admin/categorycreate', [App\Http\Controllers\admin\MdCategoryController::class, 'Create'])->name('admin.category.create'); // create category
Route::post('/admin/categoryshowUpadte', [App\Http\Controllers\admin\MdCategoryController::class, 'ShowUpdate'])->name('admin.category.updateshow'); // show particular category
Route::post('/admin/categoryupdate', [App\Http\Controllers\admin\MdCategoryController::class, 'Update'])->name('admin.category.update'); // update category

Route::get('/admin/subcategoryshow', [App\Http\Controllers\admin\MdSubCategoryController::class, 'Show'])->name('admin.subcategoryshow'); // click on subcategory
Route::post('/admin/subcategorycreate', [App\Http\Controllers\admin\MdSubCategoryController::class, 'Create'])->name('admin.subcategory.create'); // create subcategory
Route::post('/admin/subcategoryshowUpadte', [App\Http\Controllers\admin\MdSubCategoryController::class, 'ShowUpdate'])->name('admin.subcategory.show'); // show particular subcategory
Route::post('/admin/subcategoryupdate', [App\Http\Controllers\admin\MdSubCategoryController::class, 'Update'])->name('admin.subcategory.update'); // update subcategory


Route::get('/admin/publisher', [App\Http\Controllers\admin\PublisherController::class, 'Show'])->name('admin.publisher'); // click on publisher manage

Route::get('/admin/user', [App\Http\Controllers\admin\UserController::class, 'Show'])->name('admin.user'); // click on user manage

Route::get('/admin/allbooks', [App\Http\Controllers\admin\BookController::class, 'Show'])->name('admin.allbooks'); // click on all books
Route::post('/admin/approvedbook', [App\Http\Controllers\admin\BookController::class, 'ApprovalBook'])->name('admin.approvedbook'); // on all books section click on approve
Route::post('/admin/rejectbook', [App\Http\Controllers\admin\BookController::class, 'RejectBook'])->name('admin.rejectbook'); // on all books section click on reject


Route::post('/admin/logout', [App\Http\Controllers\admin\LoginController::class, 'Logout'])->name('admin.logout'); // admin logout

Route::post('/admin/notificationcount', [App\Http\Controllers\admin\NotificationController::class, 'Count'])->name('admin.notificationcount'); // notifiation count
Route::post('/admin/notificationshow', [App\Http\Controllers\admin\NotificationController::class, 'Show'])->name('admin.notificationshow'); // click on bell icon 

Route::post('/admin/useractiveinactive', [App\Http\Controllers\admin\UserController::class, 'UsersActive'])->name('admin.useractiveinactive'); // on user section click on active button


Route::get('/admin/hometopbook', [App\Http\Controllers\admin\HomeController::class, 'TopBooks'])->name('admin.hometopbook'); // on dashbord show to rated book


Route::post('/admin/showsubcatincat', [App\Http\Controllers\admin\MdCategoryController::class, 'ShowSubCategory'])->name('admin.showsubcatincat'); // 



Route::post('/admin/createsubadmin', [App\Http\Controllers\admin\LoginController::class, 'Create'])->name('admin.createsubadmin'); // create subadmin

Route::get('/admin/showsubadmin', [App\Http\Controllers\admin\LoginController::class, 'AdminManage'])->name('admin.showsubadmin');  // click on admins


Route::post('/admin/showeditsubadmin', [App\Http\Controllers\admin\LoginController::class, 'ShowEdit'])->name('admin.showeditsubadmin'); // on admin details page show edit details particular user
Route::post('/admin/editsubadmin', [App\Http\Controllers\admin\LoginController::class, 'Edit'])->name('admin.editsubadmin'); // edit particular user


Route::get('/admin/showrating', [App\Http\Controllers\admin\RatingReviewController::class, 'Show'])->name('admin.showrating'); // click on rating show ratingg
Route::post('/admin/showratingajax', [App\Http\Controllers\admin\RatingReviewController::class, 'ShowRating'])->name('admin.showratingajax'); // on rating page approve rating


Route::get('/admin/showprintbook', [App\Http\Controllers\admin\PrintBookController::class, 'Show'])->name('admin.showprintbook'); // click on print book


Route::post('/admin/publisherdetails', [App\Http\Controllers\admin\PublisherController::class, 'Details'])->name('admin.publisherdetails'); // on publiser page click on eye icon 
Route::post('/admin/userdetails', [App\Http\Controllers\admin\UserController::class, 'Details'])->name('admin.userdetails'); // on user page click on eye icon 


Route::get('/admin/showuserreport', [App\Http\Controllers\admin\ReportController::class, 'ShowUser'])->name('admin.showuserreport'); // click on user report
Route::get('/admin/showpublisherreport', [App\Http\Controllers\admin\ReportController::class, 'ShowPublisher'])->name('admin.showpublisherreport'); // click on publisher report


Route::get('/admin/paymentHistory', [App\Http\Controllers\admin\PaymentController::class, 'Show'])->name('admin.paymentHistory'); // click on subcription history


Route::get('/admin/showcommissionmanage', [App\Http\Controllers\admin\PaymentController::class, 'PayCommissionManage'])->name('admin.showcommissionmanage'); // click on commision manage
Route::post('/admin/paycommission', [App\Http\Controllers\admin\PaymentController::class, 'PayCommission'])->name('admin.paycommission'); // on commission manage page click on pay commission
Route::get('/admin/paidcommissionmanage', [App\Http\Controllers\admin\PaymentController::class, 'PaidCommissionManage'])->name('admin.paidcommissionmanage'); // check on paid radio buttion 


Route::post('/admin/addcoupon', [App\Http\Controllers\admin\CouponController::class, 'Add'])->name('admin.addcoupon'); // add coupon 
Route::post('/admin/showcoupon', [App\Http\Controllers\admin\CouponController::class, 'Show'])->name('admin.showcoupon'); // click on coupon then search with details
Route::post('/admin/pdfdownload', [App\Http\Controllers\admin\CouponController::class, 'PdfDownload'])->name('admin.pdfdownload'); // click on download pdf icon


Route::get('/admin/usedcoupon', [App\Http\Controllers\admin\CouponController::class, 'UsedCoupon'])->name('admin.usedcoupon'); // click on used coupon
