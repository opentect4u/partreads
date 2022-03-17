<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TdBookContainUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('td_book_contain_user', function (Blueprint $table) {
            $table->increments('id');
            $table->string('user_id');
            $table->string('book_id');
            $table->string('book_page_name');
            $table->string('start_time');
            $table->string('end_time');
            // $table->string('total_page_with_contain');
            // $table->string('total_page_without_contain');
            // $table->string('per_page_price');
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
        Schema::dropIfExists('td_book_contain_user');
    }
}
