<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Article
 * @package App
 *
 *
 * @property integer $id
 * @property string $created_at
 * @property string $updated_at
 * @property string $title
 * @property string $content
 * @property string $author
 * @property integer $for_index_page_photo_id
 * @property integer $single_page_photo_id
 *
 */
class Article extends Model
{
    /**
     * @var string
     */
    protected $table = 'articles';

    /**
     * @var array
     */
    protected $fillable = [
        'title',
        'content',
        'author',
        'for_index_page_photo_id',
        'single_page_photo_id',
        'title_color'
    ];

    /**
     * @var array
     */
    public $rules = [
        'title' => 'required|string|max:256',
        'content' => 'required|string',
        'author' => 'string|max:128'
    ];

    /**
     * @var bool
     */
    public $timestamps = true;
}
