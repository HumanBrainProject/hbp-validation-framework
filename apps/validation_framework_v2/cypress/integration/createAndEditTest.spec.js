/*

*/


function configureApp() {
    // wait for /vocab call to complete
    cy.wait(5000)
    // click on the cog to open config dialog
    cy.get('button[title="Change Configuration"]').click()
    // select "Only Test"
    cy.get('label').contains("Only Tests").click()
    // Choose one option from the species menu
    cy.get('#select-species').click()
    cy.get('[data-value="Callithrix jacchus"] input[type=checkbox]').click()
    // click outside the menu to close it
    cy.get('body').click(200, 0)
    // check the input contains the correct value
    cy.get('input[name=species]').should('have.value', "Callithrix jacchus")
    // click "OK" to apply the filters
    cy.get('button span').contains("Ok").click()
    // check there is a Chip with the correct species
    cy.get('[title=Species] span.MuiChip-label').contains("Callithrix jacchus")
    cy.wait(10000)
}


function addTestEntry() {
    const now = Date.now();
    const testData = {
        name: `[-TEST-] Validation test created by Cypress script @ ${now} for software testing purposes`,
        authors: "Bilbo Baggins; Thorin Oakenshield",
        alias: `test-${now}`,
        description: "The description goes here{enter}",
        data_location: [
            "https://example.com/my_data.csv"
        ],
        data_type: "CSV",
        species: "Callithrix jacchus",
        brain_region: "stratum pyramidale",
        cell_type: "interneuron",
        test_type: "network activity",
        score_type: "Other",
        recording_modality: "electrophysiology",
        implementation_status: "in development",
        instance: {
            version: "0.1.2",
            repository: "https://example.com/path/to/my/code",
            path: "path.to.TestClass"
        }
    }
    // open Add New Test dialog and enter information
    cy.get('button[title="Add New Test"]').click()
    cy.get('input[name=name]').type(testData.name)
    cy.get('[name=authors]').type(testData.authors)
    cy.get('input[name=alias]').type(testData.alias)
    cy.get('textarea[name=description]').type(testData.description)
    cy.get('textarea[name=description]').type(testData.data_location[0] + '{enter}')
    cy.get('input[name=data_type]').type(testData.data_type)
    cy.get('#select-species').click()
    cy.get('.MuiListItemText-primary').contains(testData.species).click()
    cy.get('#select-brain_region').click()
    cy.get('.MuiListItemText-primary').contains(testData.brain_region).click()
    cy.get('#select-cell_type').click()
    cy.get('.MuiListItemText-primary').contains(testData.cell_type).click()
    cy.get('#select-test_type').click()
    cy.get('.MuiListItemText-primary').contains(testData.test_type).click()
    cy.get('#select-score_type').click()
    cy.get('.MuiListItemText-primary').contains(testData.score_type).click()
    cy.get('#select-recording_modality').click()
    cy.get('.MuiListItemText-primary').contains(testData.recording_modality).click()
    cy.get('#select-implementation_status').click()
    cy.get('.MuiListItemText-primary').contains(testData.implementation_status).click()
    cy.get('input[name=version]').type(testData.instance.version)
    cy.get('input[name=repository]').type(testData.instance.repository)
    cy.get('input[name=path]').type(testData.instance.path)
    // click the submit button
    cy.get('button').contains('Add Test').click()
    cy.wait(15000)
    return testData;
}


describe('Adding a test to the catalog', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.url().then((url) => {
            if (url.startsWith("https://iam.ebrains.eu/")) {
                const password = Cypress.env('PASSWORD');
                cy.get('input[name=username]').type("adavisontesting")
                cy.get('input[name=password]').type(`${password}{enter}`)
            }
        })
        configureApp();
    })

    it("Provides a button to add a new test", () => {
        // open Add New Test dialog and enter information
        const testData = addTestEntry();
        // should now be on test detail page
        cy.get('h4').should('contain', testData.name)
        cy.get('h5').should('contain', testData.authors.replace(";", ","))
        cy.get('ul').should('contain', 'Test type')
        cy.get('ul').should('contain', testData.test_type)
        cy.get(".MuiGrid-item p[variant=subtitle2]").contains(testData.instance.version)
        // now close model detail page and check if model is in list
        cy.get('button[aria-label=close]').click()
        cy.get('td').contains(testData.name)
    })
})


describe('Editing a validation test', () => {
    let testData = {};

    beforeEach(() => {
        cy.visit('/')
        cy.url().then((url) => {
            if (url.startsWith("https://iam.ebrains.eu/")) {
                const password = Cypress.env('PASSWORD');
                cy.get('input[name=username]').type("adavisontesting")
                cy.get('input[name=password]').type(`${password}{enter}`)
            }
        })
        configureApp();
        testData = addTestEntry();
        // close model detail page
        cy.get('button[aria-label=close]').click()
    })

    it("Allows a user to edit a test they have permissions for", () => {
        cy.get('td').contains(testData.name).click()
        // click Edit button
        cy.get('[aria-label="edit test"]').click()
        cy.get('h2').contains("Edit an existing test in the library")
        // change data type
        cy.get('input[name=data_type]').clear().type("text/csv")
        // save changes
        cy.wait(6000)  // wait for snackbar message to go away
        cy.get('button').contains("Save changes").click()
        cy.wait(15000)
        // check changes have been applied
        cy.get('ul').should('contain', 'Data type')
        cy.get('ul').should('contain', "text/csv")

        // now add a version

        const newVersion = {
            version: "0.2.0",
            repository: "https://example.com/path/to/my/code/0.2.0",
            path: "path.to.TestClass"
        };
        cy.get('button').contains("Add new version").click()
        cy.wait(6000)
        cy.get('input[name=version]').type(newVersion.version)
        cy.get('input[name=repository]').type(newVersion.repository)
        cy.get('input[name=path]').type(newVersion.path)
        // click the submit button
        cy.get('button').contains('Add Test Version').click()
        cy.wait(8000)
        cy.get(".MuiGrid-item p[variant=subtitle2]").contains("0.2.0")

        // edit the version we just added
        cy.get('button[aria-label="edit test instance"]').last().click()
        cy.get('input[name=repository]').clear().type("https://example.com/path/to/my/code/0.2.0")
        cy.get('button').contains('Save changes').click()
        cy.wait(30000)
        cy.get('.MuiBox-root').contains("https://example.com/path/to/my/code/0.2.0")

    })

})