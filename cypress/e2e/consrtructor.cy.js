const TEST_URL = 'http://localhost:3000';
const TEST_LOGIN = 'foofoo@yandex.ru';
const TEST_PASSWORD = '123qwe321';
const INGREDIENT_ITEM = '[data-test^=burger-ingredient]';
const MODAL = '[data-test^=modal-block]';
const CLOSE_MODAL = '[data-test^=close-modal]';

describe('constructor page', () => {
    beforeEach(() => {
        cy.visit(TEST_URL);
    });

    // Проверка открытия и закрытия модалки ингредиента из листа
    it('show ingredient-details modal', () => {
        cy.contains('Конструктор');
        cy.contains('Соберите бургер');

        cy.get(INGREDIENT_ITEM).first().click();
        cy.get(MODAL).should('be.visible')
            .contains('Детали ингредиента');

        cy.get(CLOSE_MODAL).click();
        cy.get(MODAL).should('not.exist');
    });

    // Проверка возможности перестаскивания ингредиентов из листа в конструктор и создание заказа
    it('create order', () => {
        cy.get('[data-test^=list-ingredients-all]').as('list');
        cy.get('@list').eq(0).find(INGREDIENT_ITEM).first().as('bun');
        cy.get('@list').eq(1).find(INGREDIENT_ITEM).first().as('ingredient');
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
        cy.get('[name=email]').type(TEST_LOGIN);
        cy.get('[name=password]').type(TEST_PASSWORD);
        cy.contains('button', 'Войти').click();

        // Проверка, что открывается модалка созданного заказа. Падает по таймауту ожидания создания
        cy.get('@order-button').click();
        cy.get('[class^=order-details_order_container]', {timeout: 50000}).should('exist');
        cy.get(CLOSE_MODAL).click();

        // Проверка, что страница конструктора снова доступна
        cy.contains('Конструктор');
        cy.contains('Соберите бургер');
    });
});