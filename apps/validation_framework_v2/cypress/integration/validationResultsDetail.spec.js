describe('The model validation result detail view', () => {

    beforeEach(() => {
        // Migliore_et_al_2011_Schizophr
        cy.visit('/#result_id.c0f5decd-0d3b-4e82-a725-78d0e076d7c2')
        cy.url().then((url) => {
            if (url.startsWith("https://iam.ebrains.eu/")) {
                const password = Cypress.env('PASSWORD');
                cy.get('input[name=username]').type("adavisontesting")
                cy.get('input[name=password]').type(`${password}{enter}`)
            }
        })
        cy.wait(5000)
    })

    it('Shows detailed metadata about the validation result', () => {
        cy.get("h6").contains("Validated Model:").siblings().contains("Migliore_et_al_2011_Schizophr")
        cy.get("h6").contains("Validated Model:").siblings().contains("3342e542-5fb1-45aa-b7be-69e94f809160")

        cy.get("h6").contains("Validation Test:").siblings().contains("Hippocampus_CA1_BackpropagatingAPTest")
        cy.get("h6").contains("Validation Test:").siblings().contains("4d1210a6-e674-4cb6-a9cd-981a11d31175")

        cy.get("p").contains("TimeStamp").parent().parent().children().contains("Fri, 29 May 2020 11:11:45 GMT")
    })

    it('Has a list of additional files produced by the validation', () => {
        cy.get('.MuiTabs-flexContainer').children().contains("Result Files").click()
        cy.get('.MuiAccordionSummary-root').its('length').should('equal', 15)
    })

    it('Has a tab showing details about the model and test', () => {
        cy.get('.MuiTabs-flexContainer').children().contains("Model/Test Info").click()

        cy.get('#panel_model_test_common').siblings().contains("Migliore_et_al_2011_Schizophr")
        cy.get('#panel_model_test_common').siblings().contains("Hippocampus_CA1_BackpropagatingAPTest")
        cy.get('#panel_model_test_common').siblings().contains("Rattus norvegicus")

        cy.get('#panel_model_test_instance_others').siblings().contains('{"class_name" : "Migliore_et_al_2011"}')
        cy.get('#panel_model_test_instance_others').siblings().contains('hippounit.tests.BackpropagatingAPTest')
    })

})
