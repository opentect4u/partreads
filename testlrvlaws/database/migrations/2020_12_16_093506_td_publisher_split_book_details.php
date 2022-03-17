<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TdPublisherSplitBookDetails extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('td_publisher_split_book_details', function (Blueprint $table) {
            $table->increments('id');
            $table->string('publisher_id');
            $table->string('book_id');
            $table->string('book_page_name');
            $table->string('contain_page');
            $table->string('show_page');
            $table->string('price');
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
        Schema::dropIfExists('td_publisher_split_book_details');
    }
}
