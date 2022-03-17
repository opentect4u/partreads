<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\MdUserPermission;

class MdUserLogin extends Authenticatable
{
    use HasFactory , Notifiable;
    protected $connection="mongodb";
    protected $table="md_user_login";
    // protected $primarykey = "id";

    protected $fillable = [
        'user_id','user_pass','user_name','user_status','verify_flag','user_type','remember_token',
        'mobile_no','reason',
        'created_by','updated_by',
    ];

    public function UserPermission(){
        return $this->hasOne(MdUserPermission::class,'user_id','_id');  
    }
}
