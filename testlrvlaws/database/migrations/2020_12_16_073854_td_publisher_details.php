<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TdPublisherDetails extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('td_publisher_details', function (Blueprint $table) {
            $table->id();
            $table->string('publisher_id')->unique();
            $table->string('name');
            $table->string('phone');
            $table->string('email')->unique();
            $table->string('address');
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
        Schema::dropIfExists('td_publisher_details');
    }
}
