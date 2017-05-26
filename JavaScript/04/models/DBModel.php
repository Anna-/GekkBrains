<?php

namespace app\models;
use app\services\Db;

abstract class DBModel {
    abstract static public function getTableName();
    abstract static public function getNeededSqlParams();
    abstract static protected function getIdName();
    abstract public static function getClassName();
    abstract static protected function createObjectBy($properties);

    protected $id;
    public function getId() {
        return $this->id;
    }

    public function __construct ($id) {
        $this->id = $id;
    }

    public static function getDb(){
        return Db::getInstance();
    }

    protected static function getAddCondition() {
        return "";
    }

    public static function getById($id, $cond = "") {
        $params = static::getNeededSqlParams();
        return static::getByProperties($params, $id, $cond);
    }

    public static function getByProperties($params, $id, $cond = "") {
        $table = static::getTableName();
        $idName = static::getIdName();
        $resCond = static::joinConditions(["{$idName}=:id", static::getAddCondition(), $cond]);

        $sql = "SELECT {$params} FROM {$table} {$resCond}";
        return static::createObjectBy(static::getDb()->queryOne($sql, [':id' => $id]/*, static::getClassName()*/));
    }

    public static function getByCondition($cond, $variables = []) {
        $params = static::getNeededSqlParams();
        $table = static::getTableName();
        $resCond = static::joinConditions([static::getAddCondition(), $cond]);

        $sql = "SELECT {$params} FROM {$table} {$resCond}";
        return static::createObjectBy(static::getDb()->queryOne($sql, $variables));
    }

    public static function getAll($cond = "", $variables = []) {
        $table = static::getTableName();
        $params = static::getNeededSqlParams();
        $resCond = static::joinConditions([static::getAddCondition(), $cond]);

        $sql = "SELECT {$params} FROM {$table} {$resCond}";
        $all = static::getDb()->queryAll($sql, $variables);

        $res = [];
        foreach ($all as $value) {
            $res []= static::createObjectBy($value);
        }
        return $res;
    }

    static private function joinConditions ($conds = []) {
        $resCond = "";
        $isFirst = true;
        foreach ($conds as $cond) {
            if ($cond != "") {
                $resCond .= ($isFirst ? "WHERE " : " AND ") . $cond;
                $isFirst = false;
            }
        }
        return $resCond;
    }
}

?>