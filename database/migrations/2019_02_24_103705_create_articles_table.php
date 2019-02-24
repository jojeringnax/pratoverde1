
<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('title', 256);
            $table->text('content');
            $table->string('author', 128)->nullable();
            $table->string('title_color', 64)->default('white');
            $table->unsignedInteger('for_index_page_photo_id')->nullable();
            $table->unsignedInteger('single_page_photo_id')->nullable();
            $table->foreign('for_index_page_photo_id')->references('id')->on('files')->onDelete('SET NULL');
            $table->foreign('single_page_photo_id')->references('id')->on('files')->onDelete('SET NULL');
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropForeign('articles_single_page_photo_id_foreign');
            $table->dropForeign('articles_for_index_page_photo_id_foreign');
        });
        Schema::dropIfExists('articles');
    }
}