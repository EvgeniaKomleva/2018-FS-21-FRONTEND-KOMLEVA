import bootstrapStyles from '../../static/css/bootstrap.css'
import dropzoneStyles from './dropzone.css'

class DropZone extends HTMLElement {
	constructor () {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = `
			<style>${bootstrapStyles.toString()}</style>
			<style>${dropzoneStyles.toString()}</style>
			<img class="drop-zone rounded-circle">
		`;
		this._initElements();
		this._addHandlers();
	}

	_initElements () {
		var dropzone = this.shadowRoot.querySelector('.drop-zone');
		dropzone.src="https://melodics.com/account/img/blank-profile-picture-instructions.png";
		var localStorage = window.localStorage;
		this._elements = {
			dropzone: dropzone,
			localStorage: localStorage
		};
	}

	_addHandlers () {
		this._elements.dropzone.addEventListener("dragenter", this._onDragEnter.bind(this));
		this._elements.dropzone.addEventListener("dragover", this._onDragOver.bind(this));
		this._elements.dropzone.addEventListener("dragleave", this._onDragLeave.bind(this));
		this._elements.dropzone.addEventListener('drop', this._onDrop.bind(this));
	}

	_onDragEnter (event) {
		  event.target.style.border = "3px dashed grey";
	}

	_onDragOver (event) {
		    event.preventDefault();
	}

	_onDragLeave (event) {
		  event.target.style.border = "";
	}

	_onDrop (event) {
	  event.stopPropagation();
	  event.preventDefault();

	  var dt = event.dataTransfer;
	  var files = dt.files;

	  const url = URL.createObjectURL(files[0]);
		const image = new Image;
		// image.onload = () => URL.revokeObjectURL(url);
		this._elements.dropzone.src = url;
		localStorage.setItem('icon', url);
		event.target.style.border = "";
	}
}

customElements.define('drop-zone', DropZone);