<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFilesConnectTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('files_connect', function (Blueprint $table) {
            $table->unsignedInteger('file_id');
            $table->unsignedInteger('foreign_id');
            $table->tinyInteger('type');
            $table->primary('file_id');
            $table->foreign('file_id')->references('id')->on('files')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('files_connect', function (Blueprint $table) {
           $table->dropForeign('files_connect_file_id_foreign');
        });
        Schema::dropIfExists('files_connect');
    }
}
