import React, { Children } from 'react';
import S from '@sanity/desk-tool/structure-builder';

// build custom sidebar
export default function Sidebar() {
    return S.list()
        .title(`Slick's Slices`) 
        .items([
            // create a new sub item
            S.listItem()
                .title('Home Page')
                .icon( () => <strong>🔥</strong>)
                .child(
                    S.editor()
                        .schemaType('storeSettings')
                        // make document ID, so we dont have random string of numbers
                        .documentId('downtown')
                ),
                // add in the rest of the document items
                ...S.documentTypeListItems()
                    .filter( 
                        item => item.getId() !== 'storeSettings' 
                    ),
        ]);
}