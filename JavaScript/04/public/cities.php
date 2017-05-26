<?php
header('Content-Type: text/html; charset=utf-8');
require_once $_SERVER["DOCUMENT_ROOT"] . "/../vendor/autoload.php";

$mode = $_POST['mode'];
$nameStarter = $_POST['nameStarter'];
$limit = $_POST['limit'];

$citieNames = getCitiesName($mode, $nameStarter, $limit);
if(!is_null($citieNames)) {
	$result = $citieNames;
} else {
	$result = ["(совпадений не найдено)"];
}
die(json_encode($result));

function getCitiesName($mode, $nameStarter, $limit) {
	if ($mode == 'part') {
		$cities = app\models\City::getCitiesByStarter($nameStarter, $limit);
	} else {
		$cities = app\models\City::getAll();
	}

	$citieNames = [];
	foreach ($cities as $city) {
		$citieNames []= $city->getCityName();
	}
	return $citieNames;
}

?>