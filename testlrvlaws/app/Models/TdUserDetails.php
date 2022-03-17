<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\TdRecentVisitBook;

class TdUserDetails extends Model
{
    use HasFactory , Notifiable;
    protected $connection="mongodb";
    protected $table="td_user_details";
    // protected $primarykey = "id";

    protected $fillable = [
        'user_id','name','phone','email','street','state','city','pincode','country','profile_iamge','image_url','referral_code','type',
        'student_academician','college_university',
        'created_by','updated_by',
    ];


    // public function Recent(){
    //     return $this->hasOne(TdRecentVisitBook::class,'book_id','book_id');  
    // }

    // public function UserName(){
    //     return $this->hasOne(MdUserLogin::class,'_id','user_id');  
    // }
}
