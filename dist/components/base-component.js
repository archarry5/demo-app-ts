// Component Base Class
export class Component {
    constructor(templateId, hostElemId, insertAtStart, newElementId) {
        this.templateElem = document.getElementById(templateId);
        this.hostElem = document.getElementById(hostElemId);
        const importedNode = document.importNode(this.templateElem.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.hostElem.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
    }
}
