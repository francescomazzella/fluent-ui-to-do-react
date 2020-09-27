import React from 'react';
import { Stack } from '@fluentui/react';
import Item from './Item';

// import './List.css'

export default class List extends React.Component {

    render() {
        return (
            <Stack className="items-list" tokens={{ childrenGap: '1rem' }} styles={this.props.styles}>
                {this.props.items.map((item, index) =>
                    <Item
                        key={item.uuid}
                        id={index}
                        item={item}
                        onChange={this.props.handleCheck}
                        onClick={this.props.handleClick}
                        onEdit={this.props.enableEditing}
                        onSave={this.props.saveChanges}
                        onDelete={this.props.deleteItem} />
                )}
            </Stack>
        );
    }

}
