import React from 'react';
import Item from '../Vistas/Item'

const List =  ({ items, ondelete }) => {
    return (
        <>
            {items.map((i) => (
                <Item item={i} key={i.id} ondelete={ondelete} />
            ))}
        </>
    );
};

export default List;