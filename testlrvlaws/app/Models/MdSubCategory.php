<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Model;
use  App\Models\MdCategory;

class MdSubCategory extends Model
{
    use HasFactory, Notifiable;
    protected $connection="mongodb";
    protected $table="md_sub_category";
    // protected $primarykey = "id";

    protected $fillable = [
        'category_id','name','created_by','updated_by',
    ];


    public function Category(){
        // return $this->hasOne(MdUserType::class,'user_code','user_type'); // first value join table field and 2nd main table field
        // return $this->hasMany(MdCategory::class,'_id','category_id'); 
        return $this->hasOne(MdCategory::class,'_id','category_id'); 
        // return $this->embedsOne(MdCategory::class,'_id'); // first 

        // return $this->belongsTo('App\Models\MdCategory');
        // return $this->belongsToMany('App\Models\MdCategory','_id','');
        
    }
}
