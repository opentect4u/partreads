<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\MdCategory;
use App\Models\MdSubCategory;
use App\Models\MdUserLogin;
use App\Models\TdRating;
use App\Models\TdTableofContent;

class TdPublisherBookDetails extends Model
{
    use HasFactory , Notifiable;
    protected $connection="mongodb";
    protected $table="td_publisher_book_details";
    // protected $primarykey = "id";

    protected $fillable = [
        'publisher_id','book_id','book_name','publisher_name','author_name','price','price_fullbook','book_image','category_id','category_id_1','category_id_2','sub_category_id','sub_category_id_1','sub_category_id_2','suggestion','isbn_no','full_book_name','about_author','about_book','active_book','show_book',
        'edition','publication_date','print_book_mrp','print_book_offermrp','print_book_deliverycharge',
        'created_by','updated_by',
    ];

    public function Category(){
        return $this->hasOne(MdCategory::class,'_id','category_id')->select(array('name'));  
    }
    public function Category_1(){
        return $this->hasOne(MdCategory::class,'_id','category_id_1')->select(array('name'));  
    }
    public function Category_2(){
        return $this->hasOne(MdCategory::class,'_id','category_id_2')->select(array('name'));  
    }

    public function SubCategory(){
        return $this->hasOne(MdSubCategory::class,'_id','sub_category_id')->select(array('name'));  
    }

    public function SubCategory_1(){
        return $this->hasOne(MdSubCategory::class,'_id','sub_category_id_1')->select(array('name'));  
    }
    public function SubCategory_2(){
        return $this->hasOne(MdSubCategory::class,'_id','sub_category_id_2')->select(array('name'));  
    }

    public function PubName(){
        return $this->hasOne(MdUserLogin::class,'_id','publisher_id')->select(array('user_name'));  
    }

    public function Ratings()
    {
        // return $this->hasMany(TdRating::class,'book_id','book_id');  
        return $this->hasMany(TdRating::class,'book_id','book_id')->where('Show_flag','=', 'Y');  
        // return $this->hasMany(TdRating::class,'book_id','book_id')->wherePivot('Show_flag', 'Y');  
        // return $this->hasMany(TdRating::class,'book_id','book_id')->select("sum('rating_no') as total");  
        // return $this->hasMany(TdRating::class,'book_id','book_id')->select(array('rating_no'));  
    }

    public function Contents()
    {
        return $this->hasMany(TdTableofContent::class,'book_id','book_id');  
        // return $this->hasMany(TdRating::class,'book_id','book_id')->select(array('rating_no'));  
    }
}
