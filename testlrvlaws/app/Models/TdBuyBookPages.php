<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Models\MdCategory;
use App\Models\MdSubCategory;
use App\Models\MdUserLogin;
use App\Models\TdPublisherBookDetails;

class TdBuyBookPages extends Model
{
    use HasFactory , Notifiable;
    protected $connection="mongodb";
    protected $table="td_buy_book_pages";

    protected $fillable = [
    	'user_id','publisher_id','book_id','book_page_name','book_page_no','full_book','book_page_url','price','created_by','updated_by',
    ];

    public function PubDetails(){
        return $this->hasOne(MdUserLogin::class,'_id','publisher_id')->select(array('user_name'));  
    }

    public function BookDetails(){
        return $this->hasOne(TdPublisherBookDetails::class,'book_id','book_id');  
    }

    // active pages
    public function ActivePages(){
        return $this->hasOne(TdPublisherBookDetails::class,'book_id','book_id');  
        // return $this->hasOne(TdPublisherBookDetails::class,'book_id','book_id');  
    }
}
