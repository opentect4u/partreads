<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Model;

class TdPublisherSplitBookDetails extends Model
{
    use HasFactory , Notifiable;
    protected $connection="mongodb";
    protected $table="td_publisher_split_book_details";
    // protected $primarykey = "id";

    protected $fillable = [
        'publisher_id','book_id','book_page_name','book_page_no','book_page_url','contain_page','show_page','price','created_by','updated_by',
    ];
}
