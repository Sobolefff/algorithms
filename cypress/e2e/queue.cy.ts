import { DELAY_SHORT } from '../../src/utils/constants';
import { addBtn, circle, clearBtn, deleteBtn, head, indexInput, tail } from './constants';
import { url, COLOR_DEFAULT, COLOR_MODIFIED } from './utils';

describe('Страница Очередь отображается корректно', function () {
    before(function () {
        cy.visit(`${url}/queue`);
    });

    it('Кнопка неактивна при пустом поле ввода', function () {
        cy.get('input').should('be.empty');
        cy.get('button').should('be.disabled');
    });

    const firstElement = 1;
    const secondElement = 2;
    const thirdElement = 3;

    it('Элементы верно добавляются в очередь', function () {
        cy.get(circle).each(($list: keyof HTMLElementTagNameMap) => {
            cy.get($list).should('have.css', 'border-color', COLOR_DEFAULT);
        });

        cy.get('input').should('be.empty');
        cy.get('input').type(`${firstElement}`);
        cy.get(addBtn).click();

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 0) {
                cy.get($el).should('have.css', 'border-color', COLOR_MODIFIED);
                cy.wait(DELAY_SHORT);
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            }
        });

        cy.get(circle).within(($letters) => {
            expect($letters.eq(0)).to.contain(firstElement);
        });

        cy.get(head).within(($head) => {
            expect($head.eq(0)).to.contain('head');
        });

        cy.get(tail).within(($tail) => {
            expect($tail.eq(0)).to.contain('tail');
        });

        cy.get(indexInput).each(($el, index) => {
            expect($el).to.contain(index);
        });

        cy.get('input').should('be.empty');
        cy.get('input').type(`${secondElement}`);
        cy.get(addBtn).click();

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 0) {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            } else if ($el && index === 1) {
                cy.get($el).should('have.css', 'border-color', COLOR_MODIFIED);
                cy.wait(DELAY_SHORT);
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            }
        });

        cy.get(circle).within(($letters) => {
            expect($letters.eq(0)).to.contain(firstElement);
            expect($letters.eq(1)).to.contain(secondElement);
        });

        cy.get(head).within(($head) => {
            expect($head.eq(0)).to.contain('head');
            expect($head.eq(1)).to.contain('');
        });

        cy.get(tail).within(($tail) => {
            expect($tail.eq(0)).to.contain('');
            expect($tail.eq(1)).to.contain('tail');
        });

        cy.get(indexInput).each(($el, index) => {
            expect($el).to.contain(index);
        });

        cy.get('input').should('be.empty');
        cy.get('input').type(`${thirdElement}`);
        cy.get(addBtn).click();

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 0) {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            } else if ($el && index === 1) {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            } else if ($el && index === 2) {
                cy.get($el).should('have.css', 'border-color', COLOR_MODIFIED);
                cy.wait(DELAY_SHORT);
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            }
        });

        cy.get(circle).within(($letters) => {
            expect($letters.eq(0)).to.contain(firstElement);
            expect($letters.eq(1)).to.contain(secondElement);
            expect($letters.eq(2)).to.contain(thirdElement);
        });

        cy.get(head).within(($head) => {
            expect($head.eq(0)).to.contain('head');
            expect($head.eq(1)).to.contain('');
            expect($head.eq(2)).to.contain('');
        });

        cy.get(tail).within(($tail) => {
            expect($tail.eq(0)).to.contain('');
            expect($tail.eq(1)).to.contain('');
            expect($tail.eq(2)).to.contain('tail');
        });

        cy.get(indexInput).each(($el, index) => {
            expect($el).to.contain(index);
        });
    });

    it('Элементы верно удаляются из очереди', function () {
        cy.get(deleteBtn).click();

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 0) {
                cy.get($el).should('have.css', 'border-color', COLOR_MODIFIED);
            } else if ($el && index === 2) {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            }
            cy.wait(DELAY_SHORT);
            if ($el && index === 1) {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            } else if ($el && index === 2) {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            }
        });

        cy.get(circle).within(($letters) => {
            expect($letters.eq(0)).to.contain('');
            expect($letters.eq(1)).to.contain(secondElement);
            expect($letters.eq(2)).to.contain(thirdElement);
        });

        cy.get(head).within(($head) => {
            expect($head.eq(0)).to.contain('');
            expect($head.eq(1)).to.contain('head');
            expect($head.eq(2)).to.contain('');
        });

        cy.get(tail).within(($tail) => {
            expect($tail.eq(0)).to.contain('');
            expect($tail.eq(1)).to.contain('');
            expect($tail.eq(2)).to.contain('tail');
        });

        cy.get(indexInput).each(($el, index) => {
            expect($el).to.contain(index);
        });

        cy.get(deleteBtn).click();

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 0) {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            } else if ($el && index === 1) {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            }
            cy.wait(DELAY_SHORT);
            if ($el && index === 2) {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            }
        });

        cy.get(circle).within(($letters) => {
            expect($letters.eq(0)).to.contain('');
            expect($letters.eq(1)).to.contain('');
            expect($letters.eq(2)).to.contain(thirdElement);
        });

        cy.get(head).within(($head) => {
            expect($head.eq(0)).to.contain('');
            expect($head.eq(1)).to.contain('');
            expect($head.eq(2)).to.contain('head');
        });

        cy.get(tail).within(($tail) => {
            expect($tail.eq(0)).to.contain('');
            expect($tail.eq(1)).to.contain('');
            expect($tail.eq(2)).to.contain('tail');
        });

        cy.get(indexInput).each(($el, index) => {
            expect($el).to.contain(index);
        });

        cy.get(deleteBtn).click();

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 0) {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            } else if ($el && index === 1) {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            } else if ($el && index === 2) {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            }
            cy.wait(DELAY_SHORT);
            if ($el && index === 2) {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            }
        });

        cy.get(circle).within(($letters) => {
            expect($letters.eq(0)).to.contain('');
            expect($letters.eq(1)).to.contain('');
            expect($letters.eq(2)).to.contain('');
        });

        cy.get(head).within(($head) => {
            expect($head.eq(0)).to.contain('');
            expect($head.eq(1)).to.contain('');
            expect($head.eq(2)).to.contain('');
        });

        cy.get(tail).within(($tail) => {
            expect($tail.eq(0)).to.contain('');
            expect($tail.eq(1)).to.contain('');
            expect($tail.eq(2)).to.contain('');
        });

        cy.get(indexInput).each(($el, index) => {
            expect($el).to.contain(index);
        });

        cy.get(circle).each(($list) => {
            expect($list).to.contain('');
        });
    });

    it('Очередь очищается корректно', function () {
        cy.get('input').should('be.empty');
        cy.get('input').type(`${firstElement}`);
        cy.get(addBtn).click();
        cy.wait(DELAY_SHORT);

        cy.get('input').should('be.empty');
        cy.get('input').type(`${secondElement}`);
        cy.get(addBtn).click();
        cy.wait(DELAY_SHORT);

        cy.get('input').should('be.empty');
        cy.get('input').type(`${thirdElement}`);
        cy.get(addBtn).click();
        cy.wait(DELAY_SHORT);

        cy.get(clearBtn).click();

        cy.get(circle).each(($list) => {
            expect($list).to.contain('');
        });
    });
});
