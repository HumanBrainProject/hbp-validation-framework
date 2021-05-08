/*
describe('The model validation result and figures tabs', () => {

    beforeEach(() => {
        // Migliore_et_al_2011_Schizophr
        cy.visit('/#model_id.3ff4367a-ea8f-402c-b75f-5bdeed876940')
        cy.url().then((url) => {
            if (url.startsWith("https://iam.ebrains.eu/")) {
                const password = Cypress.env('PASSWORD');
                cy.get('input[name=username]').type("adavisontesting")
                cy.get('input[name=password]').type(`${password}{enter}`)
            }
        })
    })

    it('Shows a summary of the validation results in the "Results" tab', () => {
        cy.wait(5000)
        cy.get('h4').should('contain', 'Migliore_et_al_2011_Schizophr')
        cy.get('.MuiTabs-flexContainer').children().contains("Results").click()

        cy.wait(10000)
        cy.get('table th').contains("Validation Test")
        cy.get('td').contains("hippo_somafeat_CA1_pyr_patch")

        cy.get('td').contains("3.33").click()
        cy.url().should('equal', 'https://model-catalog.brainsimulation.eu/#result_id.c0f5decd-0d3b-4e82-a725-78d0e076d7c2')
      })

    it('Shows graphs comparing validation results in the "Figures" tab', () => {
        cy.wait(5000)
        cy.get('h4').should('contain', 'Migliore_et_al_2011_Schizophr')
        cy.get('.MuiTabs-flexContainer').children().contains("Figures").click()

        cy.wait(10000)
        cy.get('.svg-container > svg')
        cy.get('td p').contains("Observation Data Type")
        cy.get('td p').contains("Mean, SD")
    })

})
*/

describe('The validation test result and figures tabs', () => {

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

    it('Shows a summary of the validation results in the "Results" tab', () => {
        cy.wait(5000)
        cy.get('h4').should('contain', 'Hippocampus_SomaticFeaturesTest_CA1_pyr_cACpyr')
        cy.get('.MuiTabs-flexContainer').children().contains("Results").click()

        cy.wait(60000)
        cy.get('table th').contains("Model Name")
    })

})
