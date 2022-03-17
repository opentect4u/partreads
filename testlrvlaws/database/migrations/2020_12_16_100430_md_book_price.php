<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MdBookPrice extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('md_book_price', function (Blueprint $table) {
            $table->increments('id');
            $table->string('publisher_id');
            $table->string('book_id');
            $table->string('price');
            $table->string('total_page_with_contain');
            $table->string('total_page_without_contain');
            $table->string('per_page_price');
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
        Schema::dropIfExists('md_book_price');
    }
}
