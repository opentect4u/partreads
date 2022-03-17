<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\TdPublisherBookDetails;
use App\Models\MdUserLogin;
use App\Models\TdUserDetails;
use App\Models\TdPublisherDetails;

class TdPrintBook extends Model
{
    use HasFactory, Notifiable;
    protected $connection="mongodb";
    protected $table="td_print_book";

    protected $fillable = [
        'user_id','book_id','publisher_id','address','state','city','pincode','create_date','created_by',
    ];

    public function BookName(){
        return $this->hasOne(TdPublisherBookDetails::class,'book_id','book_id');  
    }

    public function UserName(){
        return $this->hasOne(TdUserDetails::class,'user_id','user_id');  
    }


    public function PublisherName(){
        return $this->hasOne(MdUserLogin::class,'_id','publisher_id');  
    }
}
