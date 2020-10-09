// Release Item Type
export enum ItemStatus { DevPending, CodeReview, QAPending, ReadyToRelease };

export enum Domain { GSCS, HR, Usage };

export enum ReleaseValidationStatus { None, Passed, Failed }

export class ReleaseItemModel {
    constructor(public jiraId: string, public description: string, public status: ItemStatus, public domain: Domain, public validator: string, public valStatus: ReleaseValidationStatus) {
        
    }
}