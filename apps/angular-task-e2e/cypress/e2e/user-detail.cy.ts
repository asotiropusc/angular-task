describe('User Detail Tests', () => {

    beforeEach(() => cy.visit('/users/2'));

    it('should display user card with details', () => {

        cy.getDataCy('detail-user-email').should('contain', 'Shanna@melissa.tv');

        cy.getDataCy('detail-user-phone').should('contain', '010-692-6593 x09125');

        cy.getDataCy('detail-user-website').should('contain', 'anastasia.net');

        cy.getDataCy('detail-user-company').should('contain', 'Deckow-Crist');

        cy.getDataCy('detail-user-address').should('contain', 'Victor Plains, Wisokyburgh');

    });

    it('should favorite user and unfavorite', () => {

        cy.getDataCy('favorite-button').find('span')
        .should('have.class', 'pi-star')
        .should('not.have.class', 'pi-star-fill');

        cy.getDataCy('favorite-button').click();

        cy.getDataCy('favorite-button').find('span')
        .should('have.class', 'pi-star-fill')
        .should('not.have.class', 'pi-star');

        cy.getDataCy('global-toast').should('be.visible')
        .and('contain', 'You added Ervin Howell to your favorites.')
        .and('contain', 'Added Favorite');

        cy.getDataCy('favorite-button').click();

        cy.getDataCy('favorite-button').find('span')
        .should('have.class', 'pi-star')
        .and('not.have.class', 'pi-star-fill');
        cy.getDataCy('global-toast').should('be.visible')
        .and('contain', 'You removed Ervin Howell from your favorites.')
        .and('contain', 'Removed Favorite');

    });

    it('should display breadcrumb and navigate to /users', () => {

        cy.getDataCy('breadcrumb').find('.p-breadcrumb-item').should('contain', 'User Detail');

        cy.getDataCy('breadcrumb').find('.p-breadcrumb-home-item').should('contain', 'Users').click();

        cy.location('pathname').should('eq', '/users');

    });

});
