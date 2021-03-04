import { useEffect, useState } from 'react';

// fake out graphql library so we dont have to load the whole thing
const gql = String.raw;

const details = `
    name
    _id
    image {
        asset {
            url
            metadata{
                lqip
            }
        }
    }
`;

export default function useLatestData() {
    // hot slices
    const [hotSlices, setHotSlices] = useState();
    
    // slicemasters
    const [slicemasters, setSlicemasters] = useState();

    // use a side effect to fetch data from graphql endpoint
    useEffect( function() {
        // when component loads, fetch data

        // use _id instead of id because quering sanity directly
        // lqip = low quality image placeholder - coming from sanity not gatsby
        fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                "Content-Type" : 'application/json',
            },
            body: JSON.stringify({
                query: gql`
                    query {
                        StoreSettings(id: "downtown") {
                            name
                            slicemaster {
                                ${details}
                            }
                            hotSlices {
                                ${details}
                            }
                        }
                    }
                `,
            })
        })
        .then( res => res.json() )
        .then( res => {
            // TODO: check for errors

            // set the data to state
            setHotSlices(res.data.StoreSettings.hotSlices);
            setSlicemasters(res.data.StoreSettings.slicemaster);
            // console.log(res.data);
        })
        .catch( err => {

        });
    }, []);

    return {
        hotSlices,
        slicemasters,
    }
}