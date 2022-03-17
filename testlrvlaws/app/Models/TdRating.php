<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\TdPublisherBookDetails;
use App\Models\MdUserLogin;

class TdRating extends Model
{
    use HasFactory, Notifiable;
    protected $connection="mongodb";
    protected $table="td_ratings";

    protected $fillable = [
        'user_id','book_id','rating_no','review','Show_flag','create_date','created_by',
    ];

    public function BookName(){
        return $this->hasOne(TdPublisherBookDetails::class,'book_id','book_id');  
    }

    public function UserName(){
        return $this->hasOne(MdUserLogin::class,'_id','user_id');  
    }
}
