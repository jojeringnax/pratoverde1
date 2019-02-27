<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoomConnectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('room_connects', function (Blueprint $table) {
            $table->unsignedInteger('room_id')->nullable();
            $table->unsignedInteger('booking_id')->nullable();
            $table->tinyInteger('guests_number')->nullable();
            $table->tinyInteger('children_number')->default(0);
            $table->boolean('with_pets')->default(false);
            $table->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');
            $table->foreign('booking_id')->references('id')->on('bookings')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('room_connects');
    }
}
