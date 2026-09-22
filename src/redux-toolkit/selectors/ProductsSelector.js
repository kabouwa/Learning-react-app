/**
 * Full state Example
 * const state = {
 *      products : {
 *          products : [],
 *          filtredProducts : [],
 *          categories : [],
 *      },
 * }
 */

export const productsSelector = ({ products }) => products.products;

export const categoriesSelector = ({ products }) => products.categories;

export const filtredProductsSelector = ({ products }) => products.filtredProducts;