<?php

namespace app\models;

class City extends DBModel {
    protected $name;
	protected $countryId;
    protected $regionId;

    public static function getClassName() {
        return get_class($this);
    }

    static public function getTableName() {
        return "Cities";
    }

    static protected function getIdName() {
        return "city_id";
    }

    static public function getNeededSqlParams() {
        return "city_id, country_id, region_id, name";
    }

    static protected function createObjectBy($properties) {
        $city = new City($properties->city_id, $properties->name,
            $properties->country_id, $properties->region_id);
        return $city;
    }

    public function getCityName() {
        return $this->name;
    }

    public function __construct ($id, $name, $countryId, $regionId) {
        parent::__construct($id);
    	$this->name = $name;
    	$this->countryId = $countryId;
    	$this->regionId = $regionId;
    }

    public static function getCitiesByStarter ($nameStarter, $limit) {
        $cond = "name LIKE CONCAT(:nameStarter, '%') LIMIT {$limit}";
        $cities = static::getAll($cond, [':nameStarter' => $nameStarter]);
        return $cities;
    }
}

?>