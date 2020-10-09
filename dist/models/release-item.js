// Project Type
export var ItemStatus;
(function (ItemStatus) {
    ItemStatus[ItemStatus["DevPending"] = 0] = "DevPending";
    ItemStatus[ItemStatus["CodeReview"] = 1] = "CodeReview";
    ItemStatus[ItemStatus["QAPending"] = 2] = "QAPending";
    ItemStatus[ItemStatus["ReadyToRelease"] = 3] = "ReadyToRelease";
})(ItemStatus || (ItemStatus = {}));
;
export var Domain;
(function (Domain) {
    Domain[Domain["GSCS"] = 0] = "GSCS";
    Domain[Domain["HR"] = 1] = "HR";
    Domain[Domain["Usage"] = 2] = "Usage";
})(Domain || (Domain = {}));
;
export var ReleaseValidationStatus;
(function (ReleaseValidationStatus) {
    ReleaseValidationStatus[ReleaseValidationStatus["None"] = 0] = "None";
    ReleaseValidationStatus[ReleaseValidationStatus["Passed"] = 1] = "Passed";
    ReleaseValidationStatus[ReleaseValidationStatus["Failed"] = 2] = "Failed";
})(ReleaseValidationStatus || (ReleaseValidationStatus = {}));
export class ReleaseItem {
    constructor(jiraId, description, status, domain, validator, valStatus) {
        this.jiraId = jiraId;
        this.description = description;
        this.status = status;
        this.domain = domain;
        this.validator = validator;
        this.valStatus = valStatus;
    }
}
