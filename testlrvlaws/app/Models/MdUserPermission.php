<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Model;

class MdUserPermission extends Model
{
    use HasFactory, Notifiable;
    protected $connection="mongodb";
    protected $table="md_user_permission";
    // protected $primarykey = "id";

    protected $fillable = [
        'user_id','user_manage','publisher_manage','category_manage','subcategory_manage','all_books',
          'review_rating',
          'hard_copy',
          'user_reports',
          'publisher_reports',
          'payment_history',
          'commission_management',
          'coupon_manage',
          'used_coupon',
        'created_by','updated_by',
    ];
}

