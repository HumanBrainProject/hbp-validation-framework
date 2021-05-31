describe("The model detail and edit views", () => {
    beforeEach(() => {
        // Potjans & Diesmann, 2014
        cy.visit("/#model_id.95866c59-26d2-4d84-b1aa-95e1f9cf53bd");
        cy.url().then((url) => {
            if (url.startsWith("https://iam.ebrains.eu/")) {
                const password = Cypress.env("PASSWORD");
                cy.get("input[name=username]").type("adavisontesting");
                cy.get("input[name=password]").type(`${password}{enter}`);
            }
        });
    });

    it("Shows relevant metadata", () => {
        cy.get("h4").should(
            "contain",
            "Potjans & Diesmann, 2014 - microcircuit model of early sensory cortex"
        );
        cy.get("h5").should("contain", "Markus Diesmann");
        cy.get("ul").should("contain", "Model scope");
        cy.get("ul").should("contain", "network: microcircuit");
    });

    it("Has version information", () => {
        cy.get(".MuiGrid-item p[variant=subtitle2]").contains(
            "8e8106531f12fcc84c7782f90f326d4a5b1ea991"
        );
    });

    it("Links to KG Search", () => {
        // link to KG Search
        cy.get(".MuiGrid-item img.MuiAvatar-img").click();
    });
});
