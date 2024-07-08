// @ts-ignore
import login from '../fixtures/login.json';

describe('constructor page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });


    // Проверка открытия и закрытия модалки ингредиента из листа
    it('show ingredient-details modal', () => {
        cy.contains('Конструктор');
        cy.contains('Соберите бургер');

        cy.get('[data-test^=burger-ingredient]').first().click();
        cy.get('[data-test^=modal-block]').should('be.visible')
            .contains('Детали ингредиента');

        cy.get('[data-test^=close-modal]').click();
        cy.get('[data-test^=modal-block]').should('not.exist');
    });

    // Проверка возможности перестаскивания ингредиентов из листа в конструктор и создание заказа
    it('create order', () => {
        cy.get('[data-test^=list-ingredients-all]').as('list');
        cy.get('@list').eq(0).find('[data-test^=burger-ingredient]').first().as('bun');
        cy.get('@list').eq(1).find('[data-test^=burger-ingredient]').first().as('ingredient');
        cy.get('[class^=burger-constructor_list').first().as('dest');
        cy.get('@dest').children().first().as('bun-dest')
        cy.get('@bun-dest').next().as('ingredient-dest');
        cy.get('[class^=burger-constructor_order] button').as('order-button');

        cy.contains('Выберите булки');
        cy.contains('Выберите начинку');

        cy.get('@bun').trigger('dragstart');
        cy.get('@bun-dest').trigger('drop');
        cy.get('@ingredient').trigger('dragstart');
        cy.get('@ingredient-dest').trigger('drop');
        cy.get('@order-button').click();

        // Авторизация с login.json
        cy.contains('Вход');
        cy.get('[name=email]').type(login.email);
        cy.get('[name=password]').type(login.password);
        cy.contains('button', 'Войти').click();

        // Проверка, что открывается модалка созданного заказа. Падает по таймауту ожидания создания
        cy.get('@order-button').click();
        cy.get('[class^=order-details_order_container]', { timeout: 50000 }).should('exist');
        cy.get('[data-test^=close-modal]').click();

        // Проверка, что страница конструктора снова доступна
        cy.contains('Конструктор');
        cy.contains('Соберите бургер');
    });
});