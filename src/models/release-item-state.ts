import { Domain, ItemStatus, ReleaseItemModel, ReleaseValidationStatus } from './release-item-model.js';

// listener type
type Listener<T> = (val: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}
//Release Item State Management
export class ReleaseItemState extends State<ReleaseItemModel>{
    items: ReleaseItemModel[] = [];

    private static instance: ReleaseItemState;

    private constructor() {
        super();
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

    addOrUpdateReleaseItem(jiraId: string, description: string, status: ItemStatus, domain: Domain, validator: string) {
        const newItem = new ReleaseItemModel(
           jiraId,
            description,
            status,
            domain,
            validator,
            ReleaseValidationStatus.None);
        let existingProj = this.items.find(x => x.jiraId === jiraId && (this.updateReleaseItem(x, newItem), true));
        if (!existingProj) {
            this.items.push(newItem);
        }
        this.updateListeners();
    }

    moveReleaseItem(jiraId: string, newStatus: ItemStatus) {
        const releaseItem = this.items.find(item => item.jiraId === jiraId);
        if (releaseItem && releaseItem.status !== newStatus) {
            releaseItem.status = newStatus;
            this.updateListeners();
        }
    }

    updateReleaseItem(destObj: ReleaseItemModel, srcObj: ReleaseItemModel) {
        destObj.jiraId = srcObj.jiraId;
        destObj.description = srcObj.description;
        destObj.status = srcObj.status;
        destObj.domain = srcObj.domain;
        destObj.validator = srcObj.validator;
        destObj.valStatus = srcObj.valStatus;
    }
}

export const releaseItemsState = ReleaseItemState.getInstance();

