<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\TdPublisherBookDetails;
use App\Models\MdUserLogin;
use App\Models\TdUserDetails;
use App\Models\TdPublisherDetails;

class TdReport extends Model
{
    use HasFactory, Notifiable;
    protected $connection="mongodb";
    protected $table="td_reports";

    protected $fillable = [
        'user_publisher_id','user_type','report_id','subject','description','file_name','file_url','create_date','created_by','updated_by',
    ];

    public function BookName(){
        return $this->hasOne(TdPublisherBookDetails::class,'book_id','book_id');  
    }

    public function UserName(){
        return $this->hasOne(TdUserDetails::class,'user_id','user_publisher_id');  
    }


    public function PublisherName(){
        return $this->hasOne(TdPublisherDetails::class,'publisher_id','user_publisher_id');  
    }
}
