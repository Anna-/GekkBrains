<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script type="text/javascript" src="js/task_06.js" defer></script>
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
            <input type="text" class="input" id="username" name="username" placeholder="Имя" />
            <div id="username_message" class="error_text" title="Поле 'Имя'"></div>

        	<label for="password">Пароль:</label>
            <input type="password" class="input" id="password" name="password" placeholder="Пароль"/>
            <div id="password_message" class="error_text" title="Поле'Пароль'"></div>

            <label for="email">Email:</label>
            <input type="email" id="email" class="input" name="email" placeholder="Email"/>
            <div id="email_message" class="error_text" title="Поле 'Email'"></div>

            <label for="gender">Пол:</label>
            <select id="gender" class="input" name="gender" >
                <option value="f">Женский</option>
                <option value="m">Мужской</option>
            </select>
            <div id="gender_message" class="error_text" title="Поле 'Пол'"></div>

            <label for="birth">День рождения:</label>
            <input type="text" class="input" name="birth" id="birth">
            <div id="birth_message" class="error_text" title="Поле'День рождения'"></div>

            <label for="credit_card">Кредитная карта:</label>
            <input type="text" id="credit_card" class="input" name="credit_card" placeholder="9999999-9999-999999-999""/>
            <div id="credit_card_message" class="error_text" title="Поле 'Кредитная карта'"></div>
            <!-- type="tel" required="required" pattern="[0-9]{7}-[0-9]{4}-[0-9]{6}-[0-9]{3} -->

            <label for="bio">О себе:</label>
            <textarea name="bio" id="bio" class="input" placeholder="Напишите о себе"></textarea>
            <div id="bio_message" class="error_text" title="Поле 'О себе'"></div>

            <div id="progress" class="progressbar"></div>

            <input id="submit_button" type="submit" value="Проверить" name="submit" />
            <div class="clearfix"></div>

        </form>
    </div>
	<footer>
	</footer>
</body>
</html>