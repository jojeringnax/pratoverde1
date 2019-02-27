<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProblemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('problems', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->unsignedInteger('room_id')->nullable();
            $table->string('title', 255);
            $table->text('content');
            $table->tinyInteger('status');
            $table->unsignedInteger('parent_id')->nullable();
            $table->unsignedInteger('category_id')->nullable();
            $table->foreign('parent_id')->references('id')->on('problems')->onDelete('SET NULL');
            $table->foreign('category_id')->references('id')->on('problem_categories')->onDelete('SET NULL');
            $table->foreign('room_id')->references('id')->on('rooms')->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('problems', function (Blueprint $table) {
            $table->dropForeign('problems_category_id_foreign');
            $table->dropForeign('problems_parent_id_foreign');
            $table->dropForeign('problems_room_id_foreign');
        });
        Schema::dropIfExists('problems');
    }
}
