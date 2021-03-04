import dotenv from 'dotenv';

dotenv.config({ path:'.env' });

export default {
    siteMetadata: {
        title: `Slick Slices`,
        siteUrl:'https://gatsby.pizza',
        description: 'Best pizza in Tyrrellspass',
        twitter: '@slicksSlices'
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-styled-components',
        {
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: 'drs9rgzb',
                dataset: 'production',
                watchMode: true,
                token: process.env.SANITY_TOKEN,
            }
        }
    ]
};