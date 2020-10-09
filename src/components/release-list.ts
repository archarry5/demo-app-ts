import {Component} from './base-component.js';
import {DragTarget} from '../models/drag-and-drop.js';
import {ReleaseItemModel, ItemStatus} from '../models/release-item-model.js';
import {Autobind} from '../decorator/autobind.js';
import {releaseItemsState} from '../models/release-item-state.js';
import { ReleaseItem } from './single-release-item.js';

//Proj List class
export class ReleaseList extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget {
    assignedItems: ReleaseItemModel[] = [];

    constructor(private type: ItemStatus) {
        super('release-list', 'app', false, `${ItemStatus[type]}-items`)

        this.configure();
        this.renderContent();
    }

    @Autobind
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    }

    @Autobind
    dropHandler(event: DragEvent) {
        const jiraId = event.dataTransfer!.getData('text/plain');
        releaseItemsState.moveReleaseItem(jiraId, this.type);
        
    }

    @Autobind
    dragLeaveHandler(event: DragEvent) {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

        releaseItemsState.addListener((items: ReleaseItemModel[]) => {
            const relevantItems = items.filter(releaseItem => {
                // if (this.type === 'active') {
                //     return prjItem.status === ProjectStatus.Active;
                // }
                return releaseItem.status === this.type;
            })
            this.assignedItems = relevantItems;
            this.renderItems();
        });
    }

    renderContent() {
        const listId = `${ItemStatus[this.type]}-items-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h3')!.textContent = (ItemStatus[this.type]).toUpperCase();
    }

    private renderItems() {
        const listEle = document.getElementById(`${ItemStatus[this.type]}-items-list`)! as HTMLUListElement;
        listEle.innerHTML = '';
        for (const item of this.assignedItems) {
            new ReleaseItem(this.element.querySelector('ul')!.id, item);
        }
    }
}