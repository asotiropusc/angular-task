describe('User Grid Tests', () => {

    beforeEach(() => {

        cy.visit('/');

        // ensure page is properly visible to reduce flake
        cy.getDataCy('user-grid-card').should('have.length', 10);

    });

    it('should display user grid', () => {

        cy.getDataCy('breadcrumb').find('.p-breadcrumb-item-link').should('have.length', 1).and('contain', 'Users');

        cy.getDataCy('user-grid-card').should('have.length', 10);

        cy.getDataCy('user-grid-card').eq(0).find('.p-card-title').should('contain', 'Leanne Graham');

        cy.getDataCy('user-grid-card').eq(0).find('.p-card-subtitle').should('contain', '@Bret');

        cy.getDataCy('user-grid-card').eq(0).find('.p-tag').eq(0)
        .should('contain', 'Company')
        .and('have.attr', 'icon', 'pi pi-building');

        cy.getDataCy('user-grid-card').eq(0).find('.p-tag-secondary').should('contain', 'Romaguera-Crona');

    });

    it('should favorite and unfavorite user', () => {

        cy.getDataCy('favorite-button').eq(1).find('span')
        .should('have.class', 'pi-star')
        .and('not.have.class', 'pi-star-fill');

        cy.getDataCy('favorite-button').eq(1).click();

        cy.getDataCy('favorite-button').eq(1).find('span')
        .should('have.class', 'pi-star-fill')
        .and('not.have.class', 'pi-star');

        cy.getDataCy('global-toast').should('be.visible')
        .and('contain', 'You added Ervin Howell to your favorites.')
        .and('contain', 'Added Favorite');

        cy.getDataCy('favorite-button').eq(1).click();

        cy.getDataCy('favorite-button').eq(1).find('span')
        .should('have.class', 'pi-star')
        .and('not.have.class', 'pi-star-fill');
        cy.getDataCy('global-toast').should('be.visible')
        .and('contain', 'You removed Ervin Howell from your favorites.')
        .and('contain', 'Removed Favorite');

    });

    it('should test filter group', () => {

        cy.getDataCy('filter-group').find('p-togglebutton button').eq(0)
        .should('contain', 'All')
        .and('have.attr', 'data-p-checked', 'true');

        cy.getDataCy('filter-group').find('p-togglebutton button').eq(1)
        .should('contain', 'Favorites')
        .and('have.attr', 'data-p-checked', 'false');

        cy.getDataCy('filter-group').find('p-togglebutton button').eq(2)
        .should('contain', 'Non-Favorites')
        .and('have.attr', 'data-p-checked', 'false');

        cy.getDataCy('user-grid-card').should('have.length', 10);

        cy.getDataCy('filter-group').contains('Favorites').click();

        cy.getDataCy('empty-state-notification').should('be.visible')
        .and('contain', 'You haven\'t favorited any users yet.');

        cy.getDataCy('filter-group').contains('Non-Favorites').click();

        cy.getDataCy('user-grid-card').should('be.visible').and('have.length', 10);

    });

    it('should test filtering', () => {

        // ensure favorites is empty
        cy.getDataCy('filter-group').contains('Favorites').click();
        cy.getDataCy('empty-state-notification').should('be.visible')
        .and('contain', 'You haven\'t favorited any users yet.');

        // remove users from non-favorites by adding them to favorites
        cy.getDataCy('filter-group').contains('Non-Favorites').click();
        cy.getDataCy('user-grid-card').should('be.visible').and('have.length', 10);

        [3, 7, 1].forEach((cardNum, index) => {

            cy.getDataCy('favorite-button').eq(cardNum).click();
            cy.getDataCy('global-toast').should('contain', 'Added Favorite');
            cy.getDataCy('user-grid-card').should('have.length', 10 - index - 1);
            cy.getDataCy('global-toast').should('not.be.visible');

        });

        // go to all and ensure that 3 favorite-buttons are selected
        cy.getDataCy('filter-group').contains('All').click();
        cy.getDataCy('user-grid-card').should('have.length', 10);
        cy.getDataCy('favorite-button').find('span.pi-star-fill').should('have.length', 3);

        // go to favorites and ensure that there is length of three and unselect them all
        cy.getDataCy('filter-group').contains('Favorites').click();
        cy.getDataCy('user-grid-card').should('have.length', 3);

        for (let i = 1; i <= 3; i++) {

            cy.getDataCy('favorite-button').eq(0).click();
            cy.getDataCy('global-toast').should('contain', 'Removed Favorite');
            cy.getDataCy('user-grid-card').should('have.length', 3 - i);
            cy.getDataCy('global-toast').should('not.be.visible');

        }

        cy.getDataCy('user-grid-card').should('not.exist');
        cy.getDataCy('empty-state-notification').should('be.visible')
        .and('contain', 'You haven\'t favorited any users yet.');

        // check that non-favorites has 10
        cy.getDataCy('filter-group').contains('Non-Favorites').click();
        cy.getDataCy('user-grid-card').should('have.length', 10);

        // check that All has no cards with favorite button selected
        cy.getDataCy('filter-group').contains('All').click();
        cy.getDataCy('favorite-button').find('span').should('not.have.class', 'pi-star-fill');
        cy.getDataCy('favorite-button').find('span.pi-star').should('have.length', 10);

    });

});
