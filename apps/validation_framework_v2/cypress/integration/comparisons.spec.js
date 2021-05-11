describe('Comparing models starting from the homepage', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.url().then((url) => {
            if (url.startsWith("https://iam.ebrains.eu/")) {
                const password = Cypress.env('PASSWORD');
                cy.get('input[name=username]').type("adavisontesting")
                cy.get('input[name=password]').type(`${password}{enter}`)
            }
        })

        // wait for /vocab call to complete
        cy.wait(1000)
        // click on the cog to open config dialog
        cy.get('button[title="Change Configuration"]').click()
        // select "Only Models"
        cy.get('label').contains("Only Models").click()
        // Choose options
        cy.get('#select-species').click()
        cy.get('[data-value="Rattus norvegicus"] input[type=checkbox]').click()
        cy.get('body').click(200, 0)
        cy.get('#select-brain_region').click()
        cy.get('[data-value="hippocampus"] input[type=checkbox]').click()
        cy.get('body').click(200, 0)
        cy.get('#select-cell_type').click()
        cy.get('[data-value="pyramidal cell"] input[type=checkbox]').click()
        cy.get('body').click(200, 0)
        cy.get('#select-model_scope').click()
        cy.get('[data-value="single cell"] input[type=checkbox]').click()
        cy.get('body').click(200, 0)
        // click "OK" to apply the filters
        cy.get('button span').contains("Ok").click()
    })

    it('should allow us to choose the models to compare', () => {
        cy.get('[data-testid=Search-iconButton]').click()
        cy.get('input[type=text]').type("mpg14")
        cy.get('td').contains("CA1_pyr_cACpyr_mpg141017_a1-2_idC_20170918151638").siblings().first().click()
        cy.get('td').contains("CA1_pyr_cACpyr_mpg141017_a1-2_idC_20190328143405").siblings().first().click()
        cy.get('td').contains("CA1_pyr_cACpyr_mpg141216_A_idA_20171003152605").siblings().first().click()
        cy.get('[title="Add to Compare"]').click()
        cy.wait(6000)
        cy.get('[aria-label="Compare results"]').click()

        cy.get('h4').should('contain', 'Compare Validation Results')
        cy.get('h6').contains('3 models')
        cy.get('button').contains('Compare All').scrollIntoView().click()
        cy.wait(20000)
        cy.get('td').contains("8.48").click()

    })

})
