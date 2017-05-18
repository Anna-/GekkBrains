<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <script type="text/javascript" src="js/task_02.js" defer></script>
    <title>Contacts</title>
</head>
<body>
	<header>
	</header>
	<div class="feedback central">
		<h2>Напишите нам</h2>
        <div id="message" class="error_text"></div>
        <form action="" method="post" name="feedback_form" id="feedback_form">
        	<label for="input_name">Имя:</label>
            <input type="text" id="input_username" name="username" placeholder="Имя" />
            <div id="username_message" class="error_text"></div>

        	<label for="input_password">Пароль:</label>
            <input type="password" id="input_password" name="password" placeholder="Пароль"/>
            <div id="password_message" class="error_text"></div>

            <label for="input_email">Email:</label>
            <input type="email" id="input_email" name="email" placeholder="Email"/>
            <div id="email_message" class="error_text"></div>

            <label for="input_gender">Пол:</label>
            <select id="input_gender" name="gender" >
                <option value="f">Женский</option>
                <option value="m">Мужской</option>
            </select>
            <div id="gender_message" class="error_text"></div>

            <label for="input_birth">День рождения:</label>
            <input type="date" name="birth" id="input_birth">
            <div id="birth_message" class="error_text"></div>

            <label for="input_credit_card">Кредитная карта:</label>
            <input type="text" id="input_credit_card" name="credit_card" placeholder="9999999-9999-999999-999""/>
            <div id="credit_card_message" class="error_text"></div>
            <!-- type="tel" required="required" pattern="[0-9]{7}-[0-9]{4}-[0-9]{6}-[0-9]{3} -->

            <label for="input_bio">О себе:</label>
            <textarea name="bio" id="input_bio" placeholder="Напишите о себе"></textarea>
            <div id="bio_message" class="error_text"></div>

            <input id="submit_button" type="submit" value="Проверить" name="submit" onclick="validate(); return false;" />
            <div class="clearfix"></div>
        </form>
    </div>
	<footer>
	</footer>
</body>
</html>