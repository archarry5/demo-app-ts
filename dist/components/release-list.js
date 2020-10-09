var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from './base-component.js';
import { ItemStatus } from '../models/release-item-model.js';
import { Autobind } from '../decorator/autobind.js';
import { releaseItemsState } from '../models/release-item-state.js';
import { ReleaseItem } from './single-release-item.js';
//Proj List class
export class ReleaseList extends Component {
    constructor(type) {
        super('release-list', 'app', false, `${ItemStatus[type]}-items`);
        this.type = type;
        this.assignedItems = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul');
            listEl.classList.add('droppable');
        }
    }
    dropHandler(event) {
        const jiraId = event.dataTransfer.getData('text/plain');
        releaseItemsState.moveReleaseItem(jiraId, this.type);
    }
    dragLeaveHandler(event) {
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        releaseItemsState.addListener((items) => {
            const relevantItems = items.filter(releaseItem => {
                // if (this.type === 'active') {
                //     return prjItem.status === ProjectStatus.Active;
                // }
                return releaseItem.status === this.type;
            });
            this.assignedItems = relevantItems;
            this.renderItems();
        });
    }
    renderContent() {
        const listId = `${ItemStatus[this.type]}-items-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h3').textContent = (ItemStatus[this.type]).toUpperCase();
    }
    renderItems() {
        const listEle = document.getElementById(`${ItemStatus[this.type]}-items-list`);
        listEle.innerHTML = '';
        for (const item of this.assignedItems) {
            new ReleaseItem(this.element.querySelector('ul').id, item);
        }
    }
}
__decorate([
    Autobind
], ReleaseList.prototype, "dragOverHandler", null);
__decorate([
    Autobind
], ReleaseList.prototype, "dropHandler", null);
__decorate([
    Autobind
], ReleaseList.prototype, "dragLeaveHandler", null);
