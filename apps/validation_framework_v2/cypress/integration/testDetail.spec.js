describe('The test detail and edit views', () => {

    beforeEach(() => {
        // Hippocampus_SomaticFeaturesTest_CA1_pyr_cACpyr
        cy.visit('/#test_id.100abccb-6d30-4c1e-a960-bc0489e0d82d')
        cy.url().then((url) => {
            if (url.startsWith("https://iam.ebrains.eu/")) {
                const password = Cypress.env('PASSWORD');
                cy.get('input[name=username]').type("adavisontesting")
                cy.get('input[name=password]').type(`${password}{enter}`)
            }
        })
    })

    it('Shows relevant metadata', () => {
        cy.get('h4').should('contain', 'Hippocampus_SomaticFeaturesTest_CA1_pyr_cACpyr')
        cy.get('h5').should('contain', 'Sara Saray')
        cy.get('ul').should('contain', 'Recording modality')
        cy.get('ul').should('contain', 'electrophysiology')
    })

})
