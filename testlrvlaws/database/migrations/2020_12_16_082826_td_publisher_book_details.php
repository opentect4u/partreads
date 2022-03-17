<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TdPublisherBookDetails extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('td_publisher_book_details', function (Blueprint $table) {
            $table->increments('id');
            $table->string('publisher_id');
            $table->string('book_id');
            $table->string('book_name');
            $table->string('author_name');
            $table->string('book_image');
            $table->string('category_id');
            $table->string('sub_category_id');
            $table->string('suggestion');
            $table->string('isbn_no');
            $table->string('full_book_name');
            $table->string('active_book');
            $table->string('show_book');
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
        Schema::dropIfExists('td_publisher_book_details');
    }
}
