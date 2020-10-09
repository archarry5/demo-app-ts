import {Component} from './base-component.js';
import { releaseItemsState } from '../models/release-item-state.js';
import { Domain, ItemStatus, ReleaseValidationStatus } from '../models/release-item-model.js';
import { Autobind } from '../decorator/autobind.js';

//Input class
export class ReleaseItemInput extends Component<HTMLDivElement, HTMLFormElement>{
    jiraIdInEle: HTMLInputElement;
    descInEle: HTMLInputElement;
    statusInEle: HTMLSelectElement;
    domainInEle: HTMLSelectElement;
    validatorInEle: HTMLInputElement;


    constructor() {
        super('release-item-input', 'modalBody', true,'user-input');
        
        this.jiraIdInEle = this.element.querySelector('#jiraId') as HTMLInputElement;
        this.descInEle = this.element.querySelector('#description') as HTMLInputElement;
        this.statusInEle = this.element.querySelector('#status') as HTMLSelectElement;
        this.domainInEle = this.element.querySelector('#domain') as HTMLSelectElement;
        this.validatorInEle = this.element.querySelector('#validator') as HTMLInputElement;

        this.configure();
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
        document.getElementById('closeBtn')!.addEventListener('click', () => {
            this.clearUserInputs();
        });
    }

    renderContent() {}

    updateValuesInUI(jiraId: string, desc: string, status: ItemStatus, domain: Domain, validator: string, validationStatus: ReleaseValidationStatus) {
        this.jiraIdInEle.value = jiraId;
        this.descInEle.value = desc;
        this.statusInEle.value = status.toString();
        this.domainInEle.value = domain.toString();
        this.validatorInEle.value = validator;
        this.element.querySelector('button')!.innerHTML = 'Update Release Item';
    }

    private gatherUserInputs(): [string, string, ItemStatus, Domain, string] | void {
        const jiraId = this.jiraIdInEle.value;
        const desc = this.descInEle.value;
        const status = +this.statusInEle.value as ItemStatus;
        const domain = +this.domainInEle.value as Domain
        const validator = this.validatorInEle.value;

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
        return [jiraId, desc, status, domain, validator];

    }

    private clearUserInputs() {
        this.jiraIdInEle.value = '';
        this.descInEle.value = '';
        this.statusInEle.value = '';
        this.domainInEle.value = '';
        this.validatorInEle.value = '';
        this.element.querySelector('button')!.innerHTML = 'Add Release Item';
    }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInputs();
        if (Array.isArray(userInput)) {
            const [jiraId, desc, status, domain, validator] = userInput;
            releaseItemsState.addOrUpdateReleaseItem(jiraId, desc, status, domain, validator);
            this.clearUserInputs();
        }
    }
}