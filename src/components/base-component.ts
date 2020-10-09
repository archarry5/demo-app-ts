// Component Base Class
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElem: HTMLTemplateElement;
    hostElem: T;
    element: U;

    constructor(templateId: string, hostElemId: string, insertAtStart: boolean, newElementId?: string) {
        this.templateElem = document.getElementById(templateId) as HTMLTemplateElement;
        this.hostElem = document.getElementById(hostElemId) as T;
        
        const importedNode = document.importNode(this.templateElem.content, true);
        this.element = importedNode.firstElementChild as U;
        if (newElementId) {
            this.element.id = newElementId;
        }

        this.attach(insertAtStart);
    }

    private attach(insertAtBeginning: boolean) {
        this.hostElem.insertAdjacentElement(insertAtBeginning? 'afterbegin': 'beforeend', this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;
}