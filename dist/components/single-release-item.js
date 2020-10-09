var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from './base-component.js';
import { Domain, ItemStatus, ReleaseValidationStatus } from '../models/release-item-model.js';
import { Autobind } from '../decorator/autobind.js';
import { inputForm } from '../app.js';
//Release Item Class
export class ReleaseItem extends Component {
    // get persons() {
    //     if (this.releaseItem.people === 1) {
    //         return '1 person';
    //     } else {
    //         return `${this.project.people} persons`;
    //     }
    // }
    constructor(hostElemId, releaseItem) {
        super('release-item', hostElemId, false, releaseItem.jiraId);
        this.releaseItem = releaseItem;
        // document.getElementById('valStatus')!.addEventListener('change', (event) => {
        //     alert((event?.target as HTMLSelectElement).value);
        // });
        this.configure();
        this.renderContent();
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.releaseItem.jiraId);
    }
    dragEndHandler(_) {
        console.log('DragEnd');
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
        this.element.querySelector('.fa-edit').addEventListener('click', () => {
            inputForm.updateValuesInUI(this.releaseItem.jiraId, this.releaseItem.description, this.releaseItem.status, this.releaseItem.domain, this.releaseItem.validator, this.releaseItem.valStatus);
            if (this.releaseItem.status === ItemStatus.ReadyToRelease) {
                document.getElementById('valStatusDiv').hidden = false;
            }
            else {
                document.getElementById('valStatusDiv').hidden = true;
            }
        });
    }
    renderContent() {
        this.element.querySelector('h3').textContent = this.releaseItem.jiraId;
        this.element.querySelector('h4').textContent = Domain[this.releaseItem.domain] + ' ' + this.releaseItem.validator;
        this.element.querySelector('p').textContent = this.releaseItem.description;
        if (this.releaseItem.status === ItemStatus.ReadyToRelease) {
            if (this.releaseItem.valStatus === ReleaseValidationStatus.Passed) {
                this.element.style.backgroundColor = 'yellowgreen';
            }
            else if (this.releaseItem.valStatus === ReleaseValidationStatus.Failed) {
                this.element.style.backgroundColor = 'red';
            }
        }
    }
}
__decorate([
    Autobind
], ReleaseItem.prototype, "dragStartHandler", null);
__decorate([
    Autobind
], ReleaseItem.prototype, "dragEndHandler", null);
