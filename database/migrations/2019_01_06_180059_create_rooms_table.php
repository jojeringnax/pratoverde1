<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->increments('id');
            $table->tinyInteger('floor');
            $table->tinyInteger('status');
            $table->unsignedInteger('type_id')->nullable();
            $table->date('last_washing_date');
            $table->boolean('need_wash');
            $table->tinyInteger('number_of_beds')->default(2);
            $table->foreign('type_id')->references('id')->on('room_types')->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rooms');
    }
}
