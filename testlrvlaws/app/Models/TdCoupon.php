<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Model;

class TdCoupon extends Model
{
    use HasFactory, Notifiable;
    protected $connection="mongodb";
    protected $table="td_coupon";
    // protected $primarykey = "id";

    protected $fillable = [
        'user_id','book_id','coupon_code',
        'created_by','updated_by',
    ];
}
