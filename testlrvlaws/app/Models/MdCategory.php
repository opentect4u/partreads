<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Model;

class MdCategory extends Model
{
    use HasFactory, Notifiable;
    protected $connection="mongodb";
    protected $table="md_category";
    // protected $primarykey = "id";

    protected $fillable = [
        'name','created_by','updated_by',
    ];
}
