<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Layer extends Model
{
    use HasFactory;

    protected $table = "map_layers";

    protected $primaryKey = "id";

    protected $fillable = [
        "active",
        "background_color",
        "border_color",
        "border_width",
        "cluster",
        "cluster_color",
        "cluster_distance",
        "default",
        "geoserver_code",
        "geoserver_url",
        "geojson_url",
        "geojson_type",
        "geotype",
        "symbol_path",
        "symbol_height",
        "line_width",
        "map_connection_id",
        "map_group_id",
        "map_subgroup_id",
        "map_table_name",
        "map_column_name",
        "name",
        "z_index",
        "show_dialog",
        "edit_dialog",
        "digthrough_dialog",
        "index",
        'filters',
        'search_fields',
        'min_zoom',
        'max_zoom',
        'type',
        'arcgis_type',
        'arcgis_url',
        'arcgis_code',
        'locked',
        'restrictions',
        'geoserver_type',
        'map_projection_id',
        'hidden_name',
        'style_type',
        'style_field',
        'style_legend',
        'geojsons_urls',
        'features_safe_delete',
        'opendatasoft_api_id',
        'arcgis_protected',
        'arcgis_login',
        'arcgis_password',
        'gwc_tilegrid',
        'odwb_dataset_uid',
        'odwb_schedule',
        'odwb_updated_at',
        'opacity'
    ];

    protected $hidden = [
        'arcgis_login',
        'arcgis_password',
    ];

    public function group() {
        return $this->belongsTo('App\Models\Map\Group', 'map_group_id', 'id');
    }

    public function subgroup() {
        return $this->belongsTo('App\Models\Map\Subgroup', 'map_subgroup_id', 'id');
    }

    public function projection() {
        return $this->belongsTo('App\Models\Map\Projection', 'map_projection_id', 'id');
    }

    public function dialogs() {
        return $this->hasMany('App\Models\Map\Dialog', 'map_layer_id', 'id');
    }

    public function connection() {
        return $this->belongsTo('App\Models\Map\Connection', 'map_connection_id', 'id');
    }

    public function opendatasoftApi() {
        return $this->belongsTo('App\Models\Map\OpendatasoftApi', 'opendatasoft_api_id', 'id');
    }
}
