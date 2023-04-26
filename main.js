const questions = [
	{
		question: "Недавно Миша ездил в Новгород и был ... 3 дня",
		answers: [
			"туда",
			"там",
			"где-то",
			"в там",
		],
		correct: 2,
	},
	{
		question: "Вымой руки, они очень ...",
		answers: [
			"холодные",
		 	"чистые",
		  	"грязные",
			"теплые"],
		correct: 3,
	},
	{
		question: "Марина и Олег уже давно ...",
		answers: [
			"замуж",
		 	"женаты",
		  	"замужем",
			"женат"],
		correct: 2,
	},
	{
		question: "Изучать русский язык ...",
		answers: [
			"нелегкий",
		 	"нелегко",
		  	"с трудом",
			"тяжело"],
		correct: 2,
	},
	{
		question: "Нина любит ... на коньках.",
		answers: [
			"ездить",
		 	"ходить",
		  	"уехать",
			"кататься"],
		correct: 4,
	},
	{
		question: "... , пожалуйста, немного о себе.",
		answers: [
			"Расскажите",
		 	"Рассказывайте",
		  	"Разговаривайте",
			"Объясните"],
		correct: 1,
	},
	{
		question: "Автобус ... людей на работу.",
		answers: [
			"едет",
		 	"ведет",
		  	"везет",
			"везти"],
		correct: 3,
	},


];

// находим элементы.
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');
const answerOk = document.querySelector('.answerOk');


// переменные игры.
let score = 0; // количество правильных ответов
let questionIndex = 0; // текущий вопрос.

clearPage();
showQuestion();

submitBtn.addEventListener('click', () => {
	checkAnswer();
});

function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion() {
	// вопрос
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']); // Возвращает новую строку с заменой на наш вопрос. Метод replace().
	headerContainer.innerHTML = title;

	// варианты ответа
	const answers = (questions[questionIndex]['answers']);

	answers.forEach((answerText, index) => {
		const questionTemplate = `
		<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>`;

		const answerHTML = questionTemplate
											.replace('%answer%', answerText)
											.replace('%number%', index + 1, answerText);

		listContainer.innerHTML += answerHTML;
	});
}


function checkAnswer() {
	console.log('checkanswer');

	// находим выбранную радио-кнопку.
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

	if (!checkedRadio) {
		submitBtn.blur();
		return;	
	}

	// узнаем номер ответа пользователя
	const userAnswer = parseInt(checkedRadio.value);

	// если ответил верно - увеличиваем счёт
	if(userAnswer === questions[questionIndex]['correct']) {
		score++;
	}

	if(questionIndex !== questions.length - 1) {
		questionIndex++;
		clearPage();
		showQuestion();
		return;
	} else {
		clearPage();
		showResults();
	}
}	

function showResults() {

	const resultsTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
		`;
	
	let title, message;

	if(score === questions.length) {
		title = 'Поздравляем!!! 	&#128525; &#128175; &#128104;&#8205;&#127891;';
		message = 'Вы ответили на все вопросы!';
	} else if(score * 100 / questions.length >= 50) {
		title = 'Неплохой резульат &#128076; &#128015;';
		message = 'Вы дали более половины правильных вопросов';
	} else {
		title = 'Стоит постараться &#128405; 	&#128580; 	&#128104;&#8205;&#9992;&#65039;';
		message = 'Пока у вас меньше половины правильных ответов';
	}

	// результат
	let result = `${score} из ${questions.length}`;

	// финальный ответ. Подставляем данные в шаблон.
	const finalMessage = resultsTemplate
										.replace('%title%', title)
										.replace('%message%', message)
										.replace('%result%', result);

	headerContainer.innerHTML = finalMessage;
	
	submitBtn.blur(); // меняем активность кнопки
	submitBtn.innerText = 'Начать заново'; // меняем назавание кнопки.
	
	submitBtn.addEventListener('click', () => { // по клику перезагружаем заново викторину.
		history.go();
	});

}
