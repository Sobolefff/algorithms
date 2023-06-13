import { DELAY_SHORT } from '../../src/utils/constants';
import { arrow, circle, circleItem, circles, head, headAddBtn, indexAddBtn, indexDelBtn, indexInput, tail, tailAddBtn, topCircle, valueInput } from './constants';
import { url, COLOR_DEFAULT, COLOR_CHANGING, COLOR_MODIFIED } from './utils';

describe('Страница Связный список отображается корректно', function () {
    before(function () {
        cy.visit(`${url}/list`);
    });

    it('Кнопка неактивна при пустом поле ввода', function () {
        cy.get('input').should('be.empty');
        cy.get('button').should('be.disabled');
    });

    const value = 1;
    const index = 2;

    it('Кнопки добавления и удаления по индексу неактивны при пустом поле ввода', function () {
        cy.get('input').should('be.empty');
        cy.get(headAddBtn).should('be.disabled');
        cy.get(tailAddBtn).should('be.disabled');
        cy.get(indexAddBtn).should('be.disabled');
        cy.get(indexDelBtn).should('be.disabled');
    });

    it('Список отображается корректно', function () {
        cy.get('#circleslist').find('li');
        cy.get(circles).get(circle).should('have.length', 4);

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap) => {
            cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
        });

        cy.get(head).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 0) {
                cy.get($el).should('contain', 'head');
            } else {
                cy.get($el).should('contain', '');
            }
        });

        cy.get(tail).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 3) {
                cy.get($el).should('contain', 'tail');
            } else {
                cy.get($el).should('contain', '');
            }
        });

        cy.get(indexInput).each(
            ($el: keyof HTMLElementTagNameMap, index, $list) => {
                cy.get($el).should('contain', index);
            }
        );
    });

    it('Элемент добавляется в список', function () {
        cy.get(valueInput).should('be.empty');
        cy.get(valueInput).type(`${value}`);

        cy.get(headAddBtn).click();

        cy.get(topCircle);

        cy.get(topCircle).contains(value);
        cy.get(topCircle).should('have.css', 'border-color', COLOR_MODIFIED);

        cy.wait(DELAY_SHORT);

        cy.get(circles).get(circle).should('have.length', 5);
        cy.get(circles)
            .get(circle)
            .get(circleItem)
            .get(arrow)
            .should('have.length', 4);

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 0) {
                cy.get($el).should('have.css', 'border-color', COLOR_CHANGING);
            } else {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            }
        });

        cy.wait(DELAY_SHORT);

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap) => {
            cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
        });

        cy.get(head).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 0) {
                cy.get($el).should('contain', 'head');
            } else {
                cy.get($el).should('contain', '');
            }
        });

        cy.get(tail).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 4) {
                cy.get($el).should('contain', 'tail');
            } else {
                cy.get($el).should('contain', '');
            }
        });

        cy.get(indexInput).each(
            ($el: keyof HTMLElementTagNameMap, index, $list) => {
                cy.get($el).should('contain', index);
            }
        );
    });

    it('Элемент добавляется в tail', function () {
        cy.get(valueInput).should('be.empty');
        cy.get(valueInput).type(`${value}`);

        cy.get(tailAddBtn).click();

        cy.get(topCircle);

        cy.get(topCircle).contains(value);
        cy.get(topCircle).should('have.css', 'border-color', COLOR_MODIFIED);

        cy.wait(DELAY_SHORT);

        cy.get(circles).get(circle).should('have.length', 6);
        cy.get(circles)
            .get(circle)
            .get(circleItem)
            .get(arrow)
            .should('have.length', 5);

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 5) {
                cy.get($el).should('have.css', 'border-color', COLOR_CHANGING);
            } else {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            }
        });

        cy.wait(DELAY_SHORT);

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap) => {
            cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
        });

        cy.get(head).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 0) {
                cy.get($el).should('contain', 'head');
            } else {
                cy.get($el).should('contain', '');
            }
        });

        cy.get(tail).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 5) {
                cy.get($el).should('contain', 'tail');
            } else {
                cy.get($el).should('contain', '');
            }
        });

        cy.get(indexInput).each(
            ($el: keyof HTMLElementTagNameMap, index, $list) => {
                cy.get($el).should('contain', index);
            }
        );
    });

    it('Элемент удаляется из head', function () {
        cy.get('[data-testid=deletefromheadbutton]').click();
        cy.get('#bottomcircle').contains(value);

        cy.wait(DELAY_SHORT);

        cy.get(circles).get(circle).should('have.length', 5);
        cy.get(circles)
            .get(circle)
            .get(circleItem)
            .get(arrow)
            .should('have.length', 4);

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap) => {
            cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
        });

        cy.get(head).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 0) {
                cy.get($el).should('contain', 'head');
            } else {
                cy.get($el).should('contain', '');
            }
        });

        cy.get(tail).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 4) {
                cy.get($el).should('contain', 'tail');
            } else {
                cy.get($el).should('contain', '');
            }
        });

        cy.get(indexInput).each(
            ($el: keyof HTMLElementTagNameMap, index, $list) => {
                cy.get($el).should('contain', index);
            }
        );
    });

    it('Элемент удаляется из tail', function () {
        cy.get('[data-testid=deletefromtailbutton]').click();

        cy.get('#bottomcircle').contains(value);

        cy.wait(DELAY_SHORT);

        cy.get(circles).get(circle).should('have.length', 4);
        cy.get(circles)
            .get(circle)
            .get(circleItem)
            .get(arrow)
            .should('have.length', 3);

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap) => {
            cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
        });

        cy.get(head).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 0) {
                cy.get($el).should('contain', 'head');
            } else {
                cy.get($el).should('contain', '');
            }
        });

        cy.get(tail).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 3) {
                cy.get($el).should('contain', 'tail');
            } else {
                cy.get($el).should('contain', '');
            }
        });

        cy.get(indexInput).each(
            ($el: keyof HTMLElementTagNameMap, index, $list) => {
                cy.get($el).should('contain', index);
            }
        );
    });

    it('Элемент добавляется по индексу', function () {
        cy.get(valueInput).should('be.empty');
        cy.get(valueInput).type(`${value}`);

        cy.get('[data-testid=indexinput]').should('be.empty');
        cy.get('[data-testid=indexinput]').type(`${index}`);

        cy.get(indexAddBtn).click();

        cy.get(topCircle);

        cy.get(topCircle).contains(value);
        cy.get(topCircle).should('have.css', 'border-color', COLOR_MODIFIED);

        cy.wait(DELAY_SHORT);

        cy.get(circle).each(
            ($el: keyof HTMLElementTagNameMap, index, $list) => {
                if ($el && index === 0) {
                    cy.get($el).should(
                        'have.css',
                        'border-color',
                        COLOR_MODIFIED
                    );
                }
            }
        );

        cy.wait(DELAY_SHORT);

        cy.get(circle).each(
            ($el: keyof HTMLElementTagNameMap, index, $list) => {
                if ($el && index === 1) {
                    cy.get($el).should(
                        'have.css',
                        'border-color',
                        COLOR_MODIFIED
                    );
                }
            }
        );

        cy.get(circles).get(circle).should('have.length', 5);
        cy.get(circles)
            .get(circle)
            .get(circleItem)
            .get(arrow)
            .should('have.length', 4);

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 2) {
                cy.get($el).should('have.css', 'border-color', COLOR_CHANGING);
                expect($el).to.contain(`${value}`);
            } else {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            }
        });

        cy.wait(DELAY_SHORT);

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap) => {
            cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
        });

        cy.get(head).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 0) {
                cy.get($el).should('contain', 'head');
            } else {
                cy.get($el).should('contain', '');
            }
        });

        cy.get(tail).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 4) {
                cy.get($el).should('contain', 'tail');
            } else {
                cy.get($el).should('contain', '');
            }
        });

        cy.get(indexInput).each(
            ($el: keyof HTMLElementTagNameMap, index, $list) => {
                cy.get($el).should('contain', index);
            }
        );
    });

    it('Элемент удаляется по индексу', function () {
        cy.get('[data-testid=indexinput]').should('be.empty');
        cy.get('[data-testid=indexinput]').type(`${index}`);
        cy.get(indexDelBtn).click();

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 0) {
                cy.get($el).should('have.css', 'border-color', COLOR_MODIFIED);
            } else {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            }
        });

        cy.wait(DELAY_SHORT);

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 0) {
                cy.get($el).should('have.css', 'border-color', COLOR_MODIFIED);
            } else if ($el && index === 1) {
                cy.get($el).should('have.css', 'border-color', COLOR_MODIFIED);
            } else {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            }
        });

        cy.wait(DELAY_SHORT);

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 0) {
                cy.get($el).should('have.css', 'border-color', COLOR_MODIFIED);
            } else if ($el && index === 1) {
                cy.get($el).should('have.css', 'border-color', COLOR_MODIFIED);
            } else if ($el && index === 2) {
                cy.get($el).should('have.css', 'border-color', COLOR_MODIFIED);
            } else {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            }
        });

        cy.get('#bottomcircle').contains(value);

        cy.wait(DELAY_SHORT);

        cy.get(circles).get(circle).should('have.length', 4);
        cy.get(circles)
            .get(circle)
            .get(circleItem)
            .get(arrow)
            .should('have.length', 3);

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap) => {
            cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
        });

        cy.get(head).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 0) {
                cy.get($el).should('contain', 'head');
            } else {
                cy.get($el).should('contain', '');
            }
        });

        cy.get(tail).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 3) {
                cy.get($el).should('contain', 'tail');
            } else {
                cy.get($el).should('contain', '');
            }
        });

        cy.get(indexInput).each(
            ($el: keyof HTMLElementTagNameMap, index, $list) => {
                cy.get($el).should('contain', index);
            }
        );
    });
});
