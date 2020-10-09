import { ReleaseItemModel, ReleaseValidationStatus } from './release-item-model.js';
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
//Release Item State Management
export class ReleaseItemState extends State {
    constructor() {
        super();
        this.items = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ReleaseItemState();
        return this.instance;
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.items.slice());
        }
    }
    addOrUpdateReleaseItem(jiraId, description, status, domain, validator) {
        const newItem = new ReleaseItemModel(jiraId, description, status, domain, validator, ReleaseValidationStatus.None);
        let existingProj = this.items.find(x => x.jiraId === jiraId && (this.updateReleaseItem(x, newItem), true));
        if (!existingProj) {
            this.items.push(newItem);
        }
        this.updateListeners();
    }
    moveReleaseItem(jiraId, newStatus) {
        const releaseItem = this.items.find(item => item.jiraId === jiraId);
        if (releaseItem && releaseItem.status !== newStatus) {
            releaseItem.status = newStatus;
            this.updateListeners();
        }
    }
    updateReleaseItem(destObj, srcObj) {
        destObj.jiraId = srcObj.jiraId;
        destObj.description = srcObj.description;
        destObj.status = srcObj.status;
        destObj.domain = srcObj.domain;
        destObj.validator = srcObj.validator;
        destObj.valStatus = srcObj.valStatus;
    }
}
export const releaseItemsState = ReleaseItemState.getInstance();
