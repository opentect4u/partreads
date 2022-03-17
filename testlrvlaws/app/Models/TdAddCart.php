<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Models\MdCategory;
use App\Models\MdSubCategory;
use App\Models\MdUserLogin;
use App\Models\TdPublisherBookDetails;

class TdAddCart extends Model
{
    use HasFactory , Notifiable;
    protected $connection="mongodb";
    protected $table="td_add_cart";

    protected $fillable = [
        'user_id','publisher_id','book_id','book_page_form','book_page_to','full_book','created_by','updated_by',
    ];


    public function BookDetails(){
        return $this->hasOne(TdPublisherBookDetails::class,'book_id','book_id');  
    }
}
