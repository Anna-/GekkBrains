<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="js/task_02-03.js" defer></script>
    <title>Contacts</title>
</head>
<body>
	<header>
	</header>
	<div class="feedback central">
		<h2>Напишите нам</h2>
        <div id="message" class="error_text"></div>
        <form action="" method="post" name="feedback_form" id="feedback_form">
        	<label for="username">Имя:</label>
            <input type="text" id="username" name="username" placeholder="Имя" />

        	<label for="password">Пароль:</label>
            <input type="password" id="password" name="password" placeholder="Пароль"/>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Email"/>

            <label for="gender">Пол:</label>
            <select id="gender" name="gender" >
                <option value="f">Женский</option>
                <option value="m">Мужской</option>
            </select>

            <label for="city">Город:</label>
            <div id="cities_group">
                <input type="text" name="city" id="city"/>
                <select multiple id="cities" hidden="true">
                </select>
            </div>

            <div class="clearfix"></div>
            <input id="submit" type="submit" value="Отправить" name="submit" />
        </form>
    </div>
	<footer>
	</footer>
</body>
</html>