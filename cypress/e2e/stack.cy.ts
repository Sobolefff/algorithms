import { DELAY_SHORT } from '../../src/utils/constants';
import {
    addBtn,
    circle,
    circles,
    clearBtn,
    deleteBtn,
    head,
    indexInput,
} from './constants';
import { url, COLOR_DEFAULT, COLOR_MODIFIED } from './utils';

describe('Страница Стек отображается корректно', function () {
    before(function () {
        cy.visit(`${url}/stack`);
    });

    it('Кнопка неактивна при пустом поле ввода', function () {
        cy.get('input').should('be.empty');
        cy.get('button').should('be.disabled');
    });

    const firstElement = 1;
    const secondElement = 2;
    const thirdElement = 3;

    it('Элементы верно добавляются в стек', function () {
        cy.get('input').type(`${firstElement}`);
        cy.get(addBtn).click();

        cy.get(circle).within(($letters) => {
            expect($letters).to.have.length(1);
            expect($letters.eq(0)).to.contain(firstElement);
        });

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap) => {
            cy.get($el).should('have.css', 'border-color', COLOR_MODIFIED);
            cy.wait(DELAY_SHORT);
            cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
        });

        cy.get(head).within(($head) => {
            expect($head.eq(0)).to.contain('top');
        });

        cy.get(indexInput).each(($el, index, $list) => {
            expect($el).to.contain(index);
        });

        cy.get('input').should('be.empty');
        cy.get('input').type(`${secondElement}`);
        cy.get(addBtn).click();

        cy.get(circle).within(($letters) => {
            expect($letters).to.have.length(2);
            expect($letters.eq(0)).to.contain(firstElement);
        });

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 0) {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            } else if ($el && index === 1) {
                cy.get($el).should('have.css', 'border-color', COLOR_MODIFIED);
                cy.wait(DELAY_SHORT);
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            }
        });

        cy.get(head).within(($head) => {
            expect($head.eq(0)).to.contain('');
            expect($head.eq(1)).to.contain('top');
        });

        cy.get(indexInput).each(($el, index, $list) => {
            expect($el).to.contain(index);
        });

        cy.get('input').should('be.empty');
        cy.get('input').type(`${thirdElement}`);
        cy.get(addBtn).click();

        cy.get(circle).within(($letters) => {
            expect($letters).to.have.length(3);
            expect($letters.eq(0)).to.contain(firstElement);
            expect($letters.eq(1)).to.contain(secondElement);
        });

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

        cy.get(head).within(($head) => {
            expect($head.eq(0)).to.contain('');
            expect($head.eq(1)).to.contain('');
            expect($head.eq(2)).to.contain('top');
        });

        cy.get(indexInput).each(($el, index, $list) => {
            expect($el).to.contain(index);
        });
    });

    it('Элементы верно удаляются из стека', function () {
        cy.get(deleteBtn).click();

        cy.get(circle).within(($letters) => {
            expect($letters.eq(2)).to.contain(thirdElement);
        });

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 2) {
                cy.get($el).should('have.css', 'border-color', COLOR_MODIFIED);
            }
        });

        cy.wait(DELAY_SHORT);

        cy.get(circle).each(($el, index, $list) => {
            cy.wait(DELAY_SHORT);
            expect($list).to.have.length(2);
        });

        cy.get(circle).within(($letters) => {
            expect($letters).to.have.length(2);
            expect($letters.eq(0)).to.contain(firstElement);
            expect($letters.eq(1)).to.contain(secondElement);
        });

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 0) {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            } else if ($el && index === 1) {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            }
        });

        cy.get(head).within(($head) => {
            expect($head.eq(0)).to.contain('');
            expect($head.eq(1)).to.contain('top');
        });

        cy.get(indexInput).each(($el, index, $list) => {
            expect($el).to.contain(index);
        });

        cy.get(deleteBtn).click();

        cy.get(circle).within(($letters) => {
            expect($letters.eq(1)).to.contain(secondElement);
        });

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 1) {
                cy.get($el).should('have.css', 'border-color', COLOR_MODIFIED);
            }
        });

        cy.wait(DELAY_SHORT);

        cy.get(circle).each(($el, index, $list) => {
            cy.wait(DELAY_SHORT);
            expect($list).to.have.length(1);
        });

        cy.get(circle).within(($letters) => {
            expect($letters).to.have.length(1);
            expect($letters.eq(0)).to.contain(firstElement);
        });

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 0) {
                cy.get($el).should('have.css', 'border-color', COLOR_DEFAULT);
            }
        });

        cy.get(head).within(($head) => {
            expect($head.eq(0)).to.contain('top');
        });

        cy.get(indexInput).each(($el, index, $list) => {
            expect($el).to.contain(index);
        });

        cy.get(deleteBtn).click();

        cy.get(circle).within(($letters) => {
            expect($letters.eq(0)).to.contain(firstElement);
        });

        cy.get(circle).each(($el: keyof HTMLElementTagNameMap, index) => {
            if ($el && index === 0) {
                cy.get($el).should('have.css', 'border-color', COLOR_MODIFIED);
            }
        });

        cy.wait(DELAY_SHORT);
        cy.get(circles).should('be.empty');
    });

    it('Cтек очищается корректно', function () {
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
        cy.get(circles).should('be.empty');
    });
});
