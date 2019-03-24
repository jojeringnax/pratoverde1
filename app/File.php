<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * Class File
 * @package App
 *
 * @property integer $id
 * @property string $created_at
 * @property string $updated_at
 * @property integer $size
 * @property integer $size_x
 * @property integer $size_y
 * @property string $path
 * @property string $type
 */
class File extends Model
{
    /**
     * @var string
     */
    protected $table = 'files';

    /**
     * @var array
     */
    protected $fillable = [
        'size',
        'size_x',
        'size_y',
        'path',
        'type'
    ];

    /**
     * @var bool
     */
    public $timestamps = true;

    const TYPES = [
        'photo' => 0
        ];


    /**
     * @return bool|null
     * @throws \Exception
     */
    public function delete()
    {
        $path = substr($this->path, 9);
        Storage::disk('public')->delete($path);
        return parent::delete();
    }

    /**
     * @param $photo
     * @param $photo_id
     * @param $article_id
     * @param $extension
     * @param $width
     * @return bool
     */
    public static function uploadPhotoOfArticleContent($photo, $photo_id, $article_id, $extension, $width)
    {
        $data = explode( ',', $photo );
        $content = base64_decode($data[1]);
        $path = 'news/photo_'.$article_id.'_'.$photo_id.'.'.$extension;
        Storage::disk('public')->put($path, $content);
        $file = new self();
        $file->size = Storage::disk('public')->size($path);
        $file->size_x = $width;
        $file->path = '/storage/'.$path;
        $file->type = self::TYPES['photo'];
        $file->save();
        $fileConnect = new FileConnect();
        $fileConnect->file_id = $file->id;
        $fileConnect->foreign_id = $article_id;
        $fileConnect->type = FileConnect::TYPES['article'];
        $fileConnect->save();
        return $file->toJson();
    }



}
