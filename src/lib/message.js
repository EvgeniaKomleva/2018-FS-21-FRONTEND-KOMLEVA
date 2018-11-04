import bootstrapStyles from '../../static/css/bootstrap.css'

const template = `
	<style>${bootstrapStyles.toString()}</style>
	<form>
		<div class="form-group">
			<div class="chat"></div>
			<input class="form-control" name="message_text" placeholder="Введите сообщение" >
		</div>
		<input class="btn btn-primary float-sm-none float-md-right" type="submit">
	</form>
`;

class MessageForm extends HTMLElement {
	constructor () {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = template;
		this._initElements();
		this._addHandlers();
	}

	static get observedAttributes() {
		return [
			"action",
			"method"
		]
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		this._elements.form[attrName] = newVal;
	}

	_initElements () {
		var form = this.shadowRoot.querySelector('form');
		var message = this.shadowRoot.querySelector('.chat');
		var localStorage = window.localStorage;
		var input_form = this.shadowRoot.querySelector('.form-control');
		var user = localStorage.getItem('user');
		var colors = ['Crimson', 'green','DarkGoldenRod',  'CornflowerBlue'];
		var idxcolor = 0;
		this._elements = {
			form : form,
			message : message,
			localStorage : localStorage,
			input_form : input_form,
			user : user,
			colors : colors,
			idxcolor : idxcolor
		};
	}

	_addHandlers () {
		this._elements.form.addEventListener('submit', this._onSubmit.bind(this));
	}

	_onSubmit (event) {
		var current_user = localStorage.getItem('user');
		this._elements.message.innerHTML += '<div class="user-message">' + current_user + ' said: ' + this._elements.input_form.value + '</div>';
		this._elements.input_form.value = '';

		var idxlast = this.shadowRoot.querySelectorAll('.user-message').length - 1;
		if (current_user != this._elements.user) {
			this._elements.idxcolor  = (this._elements.idxcolor + 1) % this._elements.colors.length;
			this._elements.user = current_user;
		}
		this.shadowRoot.querySelectorAll('.user-message')[idxlast].style.color = this._elements.colors[this._elements.idxcolor];

		event.preventDefault();
		return false;
	}
}


class LogInForm extends HTMLElement{
	constructor () {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = `
			<style>${bootstrapStyles.toString()}</style>
			<form class="mt-5">
				<h5 class="logged_in">Anonymous</h5>
        <div class="form-group mt-2">
          <input class="form-control" placeholder="username" name="username">
        </div>
				<input class="btn btn-primary float-sm-none float-md-right" type="submit" value="Log in"> 
			</form>
		`;
		this._initElements();
		this._addHandlers();
	}

	static get observedAttributes() {
		return [
			"action",
			"method"
		]
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		this._elements.form[attrName] = newVal;
	}

	_initElements () {
		var form = this.shadowRoot.querySelector('form');
		var localStorage = window.localStorage;
		var loggedin = this.shadowRoot.querySelector('.logged_in');
		var user = this.shadowRoot.querySelector('.form-control');
		localStorage.setItem('user', 'Anonymous')
		this._elements = {
			form: form,
			localStorage: localStorage,
			loggedin: loggedin,
			user: user
		};
	}

	_addHandlers () {
		this._elements.form.addEventListener('submit', this._onSubmit.bind(this));
	}

	_onSubmit (event) {
		this._elements.localStorage.setItem('user', this._elements.user.value);
		this._elements.loggedin.innerText = this._elements.user.value;
		this._elements.user.value = "";
		event.preventDefault();
		return false;
	}


}

customElements.define('log-in-form', LogInForm);
customElements.define('message-form', MessageForm);