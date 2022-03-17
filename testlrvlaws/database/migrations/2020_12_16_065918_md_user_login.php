<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MdUserLogin extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('md_user_login', function (Blueprint $table) {
            $table->id();
            $table->string('user_id')->unique();
            $table->string('user_pass');
            $table->string('user_name');
            $table->string('user_status');
            $table->string('verify_flag');
            $table->string('user_type');
            // $table->timestamp('email_verified_at')->nullable();
            // $table->string('password');
            $table->string('created_by');
            $table->string('updated_by');
            $table->rememberToken();
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
        Schema::dropIfExists('md_user_login');
    }
}
