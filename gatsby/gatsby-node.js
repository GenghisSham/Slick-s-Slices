import path, { resolve } from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
    // get template for this page
    const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
    // query all pizzas
    const { data } = await graphql(`
        query {
            pizzas: allSanityPizza {
                nodes {
                    name
                    slug {
                        current
                    }
                }
            }
        }
    `);
    
    // loop over each pizza and create a page for that pizza
    data.pizzas.nodes.forEach( (pizza) => {
        actions.createPage({
            // url for new page
            path: `pizza/${pizza.slug.current}`,
            component: pizzaTemplate,
            context: {
                slug: pizza.slug.current,
            }
        });
    });
}

async function turnToppingsIntoPages({ graphql, actions }) {
    //get template - reuse the page pizza.js
    const toppingTemplate = path.resolve('./src/pages/pizzas.js');
    //query all toppings
    const { data } = await graphql(`
    query {
        toppings: allSanityTopping {
            nodes {
                name
                id
            }
        }
    }
    `);
    //create page for topping
    data.toppings.nodes.forEach( (topping) => {
        actions.createPage({
            path: `topping/${topping.name}`,
            component: toppingTemplate,
            context: {
                topping: topping.name,
                toppingRegex: `/${topping.name}/i`,
            },
        });
    });
    //pass topping data to pizza.js
}

async function fetchBeersAndTurnIntoNodes({ actions, createNodeId, createContentDigest }) {
    // fetch list of beers
    const res = await fetch('https://api.sampleapis.com/beers/ale');
    const beers = await res.json();
    // loop over each one
    for (const beer of beers) {
        // const nodeContent = JSON.stringify(beer);
        const nodeMeta = {
            id: createNodeId(`beer-${beer.name}`),
            parent: null,
            children: [],
            internal: {
                type: 'Beer',
                mediaType: 'application/json', 
                contentDigest: createContentDigest(beer),
            }
        };
        // create a node for that beer
        actions.createNode({
            ...beer,
            ...nodeMeta
        });
    }
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
    const slicemasterTemplate = path.resolve('./src/templates/Slicemaster.js');

    // query all slicemasters
    const { data } = await graphql(`
        query {
            slicemasters: allSanityPerson {
                totalCount
                nodes {
                    name
                    id
                    slug {
                        current
                    }
                }
            }
        }
    `);

    //turn each slicemaster into their own page
    data.slicemasters.nodes.forEach( (slicemaster) => {
        actions.createPage({
            // url for new page
            path: `slicemaster/${slicemaster.slug.current}`,
            component: slicemasterTemplate,
            context: {
                name: slicemaster.person,
                slug: slicemaster.slug.current,
            }
        });
    });

    // how many pages there are based on how many slicemasters exist and how many per page
    const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
    const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);

    //loop from one to n (where n is the number of pages)
    Array
        .from({ length: pageCount })
        // underscore is to fill in the unneeded variable
        .forEach( (_, i) => {
            actions.createPage({
                path: `/slicemasters/${i + 1}`,
                component: path.resolve('./src/pages/slicemasters.js'),
                context: {
                    skip: i * pageSize,
                    currentPage: i + 1,
                    pageSize,

                },
            });
        });
}

export async function sourceNodes(params) {
    // fetch list of beers and source them into gatsby api
    await Promise.all([
        fetchBeersAndTurnIntoNodes(params),
    ]);
}

export async function createPages(params) {
    // create pages dynamically
    // wait for all promises to be resolved before finishing this function
    await Promise.all([
        // pizzas
        turnPizzasIntoPages(params),
        // toppings
        turnToppingsIntoPages(params),
        // slicemasters
        turnSlicemastersIntoPages(params),
    ]);
}