import { Component } from './base-component.js';
import {Draggable} from '../models/drag-and-drop.js';
import { Domain, ReleaseItemModel } from '../models/release-item-model.js';
import { Autobind } from '../decorator/autobind.js';
import {ReleaseItemInput} from './release-item-input.js';

import {inputForm} from '../app.js';

//Release Item Class
export class ReleaseItem extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable {
    private releaseItem: ReleaseItemModel;

    // get persons() {
    //     if (this.releaseItem.people === 1) {
    //         return '1 person';
    //     } else {
    //         return `${this.project.people} persons`;
    //     }
    // }

    constructor(hostElemId: string, releaseItem: ReleaseItemModel) {
        super('release-item', hostElemId, false, releaseItem.jiraId);
        this.releaseItem = releaseItem;

        this.configure();
        this.renderContent();
    }

    @Autobind
    dragStartHandler(event:DragEvent) {
        event.dataTransfer!.setData('text/plain', this.releaseItem.jiraId);
    }

    @Autobind
    dragEndHandler(_:DragEvent) {
        console.log('DragEnd');
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);

        this.element.querySelector('.fa-edit')!.addEventListener('click', () => {
            //const inputForm = new ReleaseItemInput();
            inputForm.updateValuesInUI(this.releaseItem.jiraId, this.releaseItem.description, this.releaseItem.status, this.releaseItem.domain, this.releaseItem.validator, this.releaseItem.valStatus);

        })
    }

    renderContent() {
        this.element.querySelector('h3')!.textContent = this.releaseItem.jiraId;
        this.element.querySelector('h4')!.textContent = Domain[this.releaseItem.domain] + ' ' + this.releaseItem.validator;
        this.element.querySelector('p')!.textContent =  this.releaseItem.description;;
    }
}