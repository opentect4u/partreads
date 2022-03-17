<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Models\TdPublisherBookDetails;
use App\Models\TdPublisherDetails;

class TdPublisherPayment extends Model
{
    use HasFactory , Notifiable;
    protected $connection="mongodb";
    protected $table="td_publisher_payment";

    protected $fillable = [
        'publisher_id','amount','month','order_id','date','created_by','updated_by',
    ];


    public function PublisherDetails(){
        return $this->hasOne(TdPublisherDetails::class,'publisher_id','publisher_id');  
    }
}
