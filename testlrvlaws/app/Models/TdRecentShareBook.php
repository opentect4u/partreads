<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Model;

class TdRecentShareBook extends Model
{
    use HasFactory, Notifiable;
    protected $connection="mongodb";
    protected $table="td_recent_share_book";

    protected $fillable = [
        'user_id','book_id','page_no',
    ];
}
