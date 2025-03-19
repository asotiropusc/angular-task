declare namespace Cypress {
    interface Chainable {
        getDataCy(selector: string): Chainable<JQuery<Element>>;
    }
}
