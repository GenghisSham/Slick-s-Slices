import { MdLocalPizza as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

export default {
    //computer name
    name: 'pizza',
    //visible title
    title: 'Pizzas',
    type: 'document',
    icon: icon,
    fields: [
        {
            name: 'name',
            title: 'Pizza',
            type: 'string',
            description: 'Name of the pizza',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 100,
            }
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            description: 'Price of the pizza in cent',
            // rule that 1000 cent is min, 50000 cent is max
            validation: Rule => Rule.min(1000).max(50000),
            //TODO: Add custom input component
            inputComponent: PriceInput,
        },
        {
            name: 'toppings',
            title: 'Toppings',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [
                        {
                            type: 'topping'
                        }
                    ],
                }
            ],
        },
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
            toppingName0: 'toppings.0.name',
            toppingName1: 'toppings.1.name',
            toppingName2: 'toppings.2.name',
            toppingName3: 'toppings.3.name',
        },
        prepare: ({ title, media, ...toppings }) => {
            // filter by boolean will remove anything undefined
            const tops = Object.values(toppings).filter(Boolean);
            return  {
                title: title,
                media: media,
                subtitle: tops.join(', '),
            }
        }
    }
};