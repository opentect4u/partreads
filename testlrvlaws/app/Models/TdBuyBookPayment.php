<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Models\TdPublisherBookDetails;
use App\Models\TdPublisherDetails;
use App\Models\TdUserDetails;

class TdBuyBookPayment extends Model
{
    use HasFactory , Notifiable;
    protected $connection="mongodb";
    protected $table="td_buy_book_payment";

    protected $fillable = [
        'user_id','publisher_id','book_id','book_page_no','order_id','date','price','total_price','created_by','updated_by',
    ];

    public function BookDetails(){
        return $this->hasOne(TdPublisherBookDetails::class,'book_id','book_id');  
    }

    public function PublisherDetails(){
        return $this->hasOne(TdPublisherDetails::class,'publisher_id','publisher_id');  
    }

    public function UserDetails(){
        return $this->hasOne(TdUserDetails::class,'user_id','user_id');  
    }
}
