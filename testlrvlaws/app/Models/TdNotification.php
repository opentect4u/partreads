<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class TdNotification extends Model
{
    use HasFactory , Notifiable;
    protected $connection="mongodb";
    protected $table="td_notifications";

    protected $fillable = [
    	'date','from_user_type','from_user_id','to_user_type','to_user_id','publisher_id','book_id','subject','body','path','reject_msg','read_flag','created_by','updated_by',
    ];
}
