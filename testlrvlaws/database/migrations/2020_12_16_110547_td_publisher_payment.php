<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TdPublisherPayment extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('td_publisher_payment', function (Blueprint $table) {
            $table->increments('id');
            $table->string('publisher_id');
            $table->string('price');
            $table->string('payment_id');
            $table->string('payment_date');
            
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
        Schema::dropIfExists('td_publisher_payment');
    }
}
