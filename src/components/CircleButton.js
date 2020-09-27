import React from 'react';
import { DefaultButton, Icon, IconButton } from '@fluentui/react'

import './CircleButton.css';

export default function CircleButton(props) {

    return <IconButton className="circle-button" {...props}></IconButton>;

}