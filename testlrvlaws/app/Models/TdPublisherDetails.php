<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Model;


class TdPublisherDetails extends Model
{
    use HasFactory,Notifiable;
    protected $connection="mongodb";
    protected $table="td_publisher_details";
    protected $primarykey = "id";

    protected $fillable = [
        'publisher_id','name','phone','email','street','state','city','pincode','country','profile_iamge','image_url','bank_name','gst_no','acc_no','ifsc_code','created_by','updated_by',
    ];
}
