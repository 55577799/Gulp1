

	// Custom JS 

	$(document).ready(function () {
		$('.bxslider').bxSlider({
			speed: 1000,
			easing: 'ease',
			infiniteLoop: true,
			auto: true,
			pause: 10000,
			controls: false
		});
	});


	//DROPDOWN MENU WORK VARIANT

	// развернуть дропдаун по селектору
	function showDropdown(selector) {

		// удаляем у всех элементов класс show
		document.querySelectorAll(`.dropdown_content:not(${selector})`).forEach((el) => {
			el.classList.remove("show");
		});

		// добавляем класс show к элементу, селектор которого получили в функцию
		document.querySelector(selector).classList.toggle("show");
	}


	//HAMBURGER MENU

	$(document).ready(function () {
		$('.hamburger-icon').click(function () {
			$('.hamburger-menu').toggle("show");
			$('.hamburger-menu').css('display', 'block');
		});
	
		$('.close').click(function () {
			$('.hamburger-menu').remove("show");
	
		});
	})

	
	// REGISTRATION FORM

	function showModalWin() {
 
		let darkLayer = document.createElement('div'); // слой затемнения
		darkLayer.id = 'shadow'; // id чтобы подхватить стиль
		document.body.appendChild(darkLayer); // включаем затемнение

		let closeForm = document.getElementById('hider');
		let modalWin = document.getElementById('popupWin'); // находим наше "окно"
		modalWin.style.display = 'block'; // "включаем" его

		darkLayer.onclick = function () {  // при клике на слой затемнения все исчезнет
			darkLayer.parentNode.removeChild(darkLayer); // удаляем затемнение
			modalWin.style.display = 'none'; // делаем окно невидимым
			return false;
		};
		closeForm.onclick = function () {
			darkLayer.parentNode.removeChild(darkLayer); // удаляем затемнение
			modalWin.style.display = 'none'; // делаем окно невидимым
			return false;
		}
	}

	function closeModalWin() {
		let closeForm = document.getElementById('hider').onclick = function () {
			document.getElementById('popupWin').hidden = true;
		};
	}

	// VALIDATOR FORM

	class Validator {
		constructor(form) {
			this.patterns = {
				name: /^[a-zа-яё]+$/i,
				phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
				email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i
			};
			this.errors = {
				name: 'Имя содержит только буквы',
				phone: 'Телефон подчиняется шаблону +7(000)000-0000',
				email: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
			};
			this.errorClass = 'error-msg';
			this.form = form;
			this.valid = false;
			this._validateForm();
		}
		_validateForm() {
			let errors = [...document.getElementById(this.form).querySelectorAll(`.${this.errorClass}`)];
			for (let error of errors) {
				error.remove();
			}
			let formFields = [...document.getElementById(this.form).getElementsByTagName('input')];
			for (let field of formFields) {
				this._validate(field);
			}
			if (![...document.getElementById(this.form).querySelectorAll('.invalid')].length) {
				this.valid = true;
			}
		}
		_validate(field) {
			if (this.patterns[field.name]) {
				if (!this.patterns[field.name].test(field.value)) {
					field.classList.add('invalid');
					this._addErrorMsg(field);
					this._watchField(field);
				}
			}
		}
		_addErrorMsg(field) {
			let error = `<div class="${this.errorClass}">${this.errors[field.name]}</div> `;
			field.parentNode.insertAdjacentHTML('beforeend', error);
		}
		_watchField(field) {
			field.addEventListener('input', () => {
				let error = field.parentNode.querySelector(`.${this.errorClass}`);
				if (this.patterns[field.name].test(field.value)) {
					field.classList.remove('invalid');
					field.classList.add('valid');
					if (error) {
						error.remove();
					}
				} else {
					field.classList.remove('valid');
					field.classList.add('invalid');
					if (!error) {
						this._addErrorMsg(field);
					}
				}
			});
		}
	}


	function showOfferBox(selector) {
		document.querySelector('.offer__aperti').classList.toggle("show");
	}

	//IZMENENIE RAZMERA BLOKOV
	window.onresize = function (event) {
		$('.offer').removeClass('h-100');
		$('.offer').addClass('h-100');
	};


	window.onload = () => {
		document.getElementById('myform').addEventListener('val-btn', e => {
			const valid = new Validator('myform');
			if (!valid.valid) {
				e.preventDefault();
			}
		})
	}
