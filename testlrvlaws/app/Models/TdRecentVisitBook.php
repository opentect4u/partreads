<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\TdPublisherBookDetails;

class TdRecentVisitBook extends Model
{
    use HasFactory, Notifiable;
    protected $connection="mongodb";
    protected $table="td_recent_visit_book";

    protected $fillable = [
        'user_id','book_id','publisher_id','created_date',
    ];

    public function bookDetails(){
        return $this->hasOne(TdPublisherBookDetails::class,'book_id','book_id');  
        // return $this->hasOne(MdCategory::class,'_id','category_id')->select(array('name'));  
    }
}
