describe('Favorite Hydration Tests', () => {

    it('should display user card with details', () => {

        cy.visit('/');

        cy.getDataCy('user-grid-card').should('have.length', 10);

        // favorite one user
        cy.getDataCy('favorite-button').eq(0).click();
        cy.getDataCy('global-toast').should('be.visible');

        // go to favorites filter group to ensure it was added and navigate to detail
        cy.getDataCy('filter-group').contains('Favorites').click();
        cy.getDataCy('user-grid-card').should('have.length', 1).click();

        cy.location('pathname').should('eq', '/users/1');

        // ensure that favorite is hydrated and unfavorite 
        cy.getDataCy('favorite-button').find('span').should('have.class', 'pi-star-fill').click();

        cy.getDataCy('global-toast').should('contain', 'Removed Favorite');

        // go back to /users
        cy.getDataCy('breadcrumb').find('.p-breadcrumb-home-item').click();
        cy.location('pathname').should('eq', '/users');

        // verify that filter group resets appropriately back to 'All'
        cy.getDataCy('filter-group').contains('All').should('have.attr', 'data-p-checked', 'true');
        cy.getDataCy('favorite-button').eq(0).find('span').should('not.have.class', 'pi-star-fill');

        cy.getDataCy('filter-group').contains('Favorites').click();
        cy.getDataCy('empty-state-notification').should('be.visible');

    });

    it('should hydrate from user detail', () => {

        cy.visit('/users/1');

        // favorite the user
        cy.getDataCy('favorite-button').click();
        cy.getDataCy('global-toast').should('contain', 'Added Favorite');

        cy.getDataCy('breadcrumb').find('.p-breadcrumb-home-item').click();
        cy.location('pathname').should('eq', '/users');

        // ensure it is hydrated properly on /users
        cy.getDataCy('favorite-button').eq(0).find('span').should('have.class', 'pi-star-fill');

        // verify it is properly filtered
        cy.getDataCy('filter-group').contains('Non-Favorites').click();
        cy.getDataCy('user-grid-card').should('have.length', 9);

        // ensure properly added to favorites filter and unfavorite
        cy.getDataCy('filter-group').contains('Favorites').click();
        cy.getDataCy('user-grid-card').should('have.length', 1);
        cy.getDataCy('favorite-button').click();

        // then navigate to detail and verify it is unfavorited there as well
        cy.getDataCy('filter-group').contains('All').click();
        cy.getDataCy('favorite-button').eq(0).find('span').should('not.have.class', 'pi-star-fill');
        cy.getDataCy('user-grid-card').eq(0).click();

        cy.location('pathname').should('eq', '/users/1');

        cy.getDataCy('favorite-button').find('span').should('not.have.class', 'pi-star-fill');

    });

});
