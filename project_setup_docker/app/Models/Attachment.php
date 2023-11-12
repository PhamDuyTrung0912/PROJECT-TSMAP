<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    use HasFactory;

    protected $table = 'attachments';
    
    public $timestamps = false;

    protected $primaryKey = "id";

    protected $fillable = [
        'path',
        'original_name',
        'mime_type',
        'attachmentable_type',
        'attachmentable_id'
    ];

    public function attachmentable()
    {
        return $this->morphTo();
    }
}
