var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from './base-component.js';
import { releaseItemsState } from '../models/release-item-state.js';
import { Autobind } from '../decorator/autobind.js';
//Input class
export class ReleaseItemInput extends Component {
    constructor() {
        super('release-item-input', 'modalBody', true, 'user-input');
        this.jiraIdInEle = this.element.querySelector('#jiraId');
        this.descInEle = this.element.querySelector('#description');
        this.statusInEle = this.element.querySelector('#status');
        this.domainInEle = this.element.querySelector('#domain');
        this.validatorInEle = this.element.querySelector('#validator');
        this.valStatusInEle = this.element.querySelector('#valStatus');
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
        document.getElementById('closeBtn').addEventListener('click', () => {
            this.clearUserInputs();
        });
    }
    renderContent() { }
    updateValuesInUI(jiraId, desc, status, domain, validator, validationStatus) {
        this.jiraIdInEle.value = jiraId;
        this.descInEle.value = desc;
        this.statusInEle.value = status.toString();
        this.domainInEle.value = domain.toString();
        this.validatorInEle.value = validator;
        this.valStatusInEle.value = validationStatus.toString();
        this.element.querySelector('button').innerHTML = 'Update Release Item';
    }
    gatherUserInputs() {
        const jiraId = this.jiraIdInEle.value;
        const desc = this.descInEle.value;
        const status = +this.statusInEle.value;
        const domain = +this.domainInEle.value;
        const validator = this.validatorInEle.value;
        const releaseValStatus = +this.valStatusInEle.value;
        // const titleValidatable = {
        //     value: title,
        //     required: true,
        //     minLength: 5
        // };
        // const descValidatable = {
        //     value: desc,
        //     required: true,
        //     minLength: 5
        // };
        // const peopleValidatable = {
        //     value: people,
        //     required: true,
        //     min: 1,
        //     max: 5
        // };
        // if (!validate(titleValidatable) ||
        //     !validate(descValidatable) ||
        //     !validate(peopleValidatable)) {
        //         alert('Invlaid Input!!');
        //         return;
        //     } else {
        //         return [title, desc, +people];
        //     }
        return [jiraId, desc, status, domain, validator, releaseValStatus];
    }
    clearUserInputs() {
        this.jiraIdInEle.value = '';
        this.descInEle.value = '';
        this.statusInEle.value = '';
        this.domainInEle.value = '';
        this.validatorInEle.value = '';
        this.valStatusInEle.value = '';
        this.element.querySelector('button').innerHTML = 'Add Release Item';
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInputs();
        if (Array.isArray(userInput)) {
            const [jiraId, desc, status, domain, validator, valStatus] = userInput;
            releaseItemsState.addOrUpdateReleaseItem(jiraId, desc, status, domain, validator, valStatus);
            this.clearUserInputs();
        }
    }
}
__decorate([
    Autobind
], ReleaseItemInput.prototype, "submitHandler", null);
