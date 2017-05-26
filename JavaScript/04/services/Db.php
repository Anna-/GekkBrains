<?php

namespace app\services;
use app\traits\TSingleton;

class Db 
{
    use TSingleton;

    protected $config = [
                    "driver" => "mysql",
                    "host" => "localhost",
                    "login" => "root",
                    "password" => "",
                    "dbName" => "js_db"];
    protected $conn;
    protected static $instance = null;

    public function getConnection()
    {
        if (is_null($this->conn)) {
            $this->conn = new \PDO(
                $this->prepareDnsString(),
                $this->config['login'],
                $this->config['password']
            );
        }

        $this->conn->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_OBJ);
        $this->conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        return $this->conn;
    }

    public function lastInsertedId() {
        return $this->getConnection()->lastInsertId();
    }

    public function query($sql, $params, $className = null)
    {
        $PDOStatement = $this->getConnection()->prepare($sql);
        if (!is_null($className)) {
            $PDOStatement->setFetchMode(\PDO::FETCH_CLASS, $className); 
        }
        $PDOStatement->execute($params);
        return $PDOStatement;
    }

    public function queryOne($sql, $params = [], $className = null)
    {
        return $this->queryAll($sql, $params, $className)[0];
    }

    public function queryAll($sql, $params = [], $className = null)
    {
        $smtp = $this->query($sql, $params, $className);
        return $smtp->fetchAll();
    }

    public function execute($sql, $params = [])
    {
        $this->query($sql, $params, null);
        return true;
    }

    protected function prepareDnsString()
    {
        return sprintf(
            "%s:host=%s;dbname=%s;charset=UTF8",
            $this->config['driver'],
            $this->config['host'],
            $this->config['dbName']
        );
    }
}