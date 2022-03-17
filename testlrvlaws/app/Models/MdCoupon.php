<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\TdPublisherBookDetails;

class MdCoupon extends Model
{
    use HasFactory, Notifiable;
    protected $connection="mongodb";
    protected $table="md_coupon";
    // protected $primarykey = "id";

    protected $fillable = [
        'book_id','publisher_id','coupon_code','coupon_amount','coupon_from_date','coupon_to_date','book_from_date','book_to_date',
        'allow_flag',
        'created_by','updated_by',
    ];

    public function bookDetails(){
        return $this->hasOne(TdPublisherBookDetails::class,'book_id','book_id');  
        // return $this->hasOne(MdCategory::class,'_id','category_id')->select(array('name'));  
    }
}
