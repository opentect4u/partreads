<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MdCategory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('md_category', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            // $table->string('user_pass');
            // $table->string('user_name');
            // $table->string('user_status');
            // $table->string('verify_flag');
            // $table->string('user_type');
            // $table->timestamp('email_verified_at')->nullable();
            // $table->string('password');
            $table->string('created_by');
            $table->string('updated_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('md_category');
    }
}
