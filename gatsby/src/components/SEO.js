import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

export default function SEO({ children, location, description, title, image }) {

    const { site } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                    twitter
                }
            }
        }
    `);

    return(
        <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`} >
            <html lang="en" />
                <title>{title ? title : site.siteMetadata.title}</title>

                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="alternate icon" href="/favicon.ico" />

                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                
                <meta charset="utf-8"/>
                <meta name="description" content={site.siteMetadata.description}/>

                {location && <meta property="og:url" content={location.href} />}
                <meta property="og:image" content={image || '/logo.svg'} />
                <meta property="og:title" content={title} key="ogtitle" />
                <meta property="og:site_name" content={site.siteMetadata.title} key="ogsitename" />
                <meta property="og:desc" content={description} key="ogdescription" />

                {children}
        </Helmet>
    );
}