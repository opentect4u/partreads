<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Model;
use  App\Models\MdCategory;

class TdTableofContent extends Model
{
    use HasFactory, Notifiable;
    protected $connection="mongodb";
    protected $table="td_table_of_content";
    // protected $primarykey = "id";

    protected $fillable = [
        'book_id','publisher_id','title','description','actual_page','pdf_page','created_by','updated_by',
    ];


    
}
