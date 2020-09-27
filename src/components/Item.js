import React from 'react';
import { Card } from '@uifabric/react-cards';
import { Checkbox, Stack, Text, Icon, HoverCard, HoverCardType, ActionButton, Dialog, DialogFooter, PrimaryButton, DefaultButton, IconButton, TextField, FontSizes, DefaultFontStyles, FontWeights, ColorClassNames, AnimationStyles, css, AnimationClassNames } from '@fluentui/react';
import { MotionAnimations, NeutralColors } from '@uifabric/fluent-theme'

import './Item.css';

export default class Item extends React.Component {

    constructor() {
        super();
        
        this.cardTokens = {
            childrenMargin: 12,
            verticalAlign: "center",

            maxWidth: 'calc(100vw - 1rem)',
            minWidth: 'auto',
            width: '400px',
        };

        this.cardItemStyles = {
            root: {
                alignSelf: "center",
            },
        };
    }

    componentDidMount() {
        this.setState({
            title: this.props.item.title,
            desc: this.props.item.desc
        });
    }

    onRenderPlainCard = () => 
        <Card>
            <Card.Section>
                <Stack tokens={{ padding: '.3rem', childrenGap: '.2rem' }}>
                    <ActionButton iconProps={{ iconName: 'Edit' }} title="Edit" ariaLabel="Edit">Edit</ActionButton>
                    <ActionButton iconProps={{ iconName: 'Delete' }} title="Delete" ariaLabel="Delete">Delete</ActionButton>
                    <ActionButton iconProps={{ iconName: 'Share' }} title="Share" ariaLabel="Share">Share</ActionButton>
                </Stack>
            </Card.Section>
        </Card>;

    handleHover = ({ target }) => {
        // target.style.height = '300px';
    }

    render() {
        return (
            <div onAnimationEnd={(e) => {e.preventDefault(); e.bubbles = false; this.props.onDelete(this.props.id, true);}}>
            <Card horizontal
                className={`item ${this.props.item.done && 'done'}
                ${this.props.item.deleted && AnimationClassNames.scaleDownOut98}`}
                styles={{ root: {
                    backgroundColor: `${ this.props.item.done ? NeutralColors.gray20 : ''}`,
                    color: `${ this.props.item.done ? NeutralColors.gray90 : ''}`,
                } }}
                tokens={this.cardTokens}
                onClick={() => this.props.onChange(this.props.id)}
                onMouseEnter={this.handleHover}
            >
                <Card.Section styles={this.cardItemStyles} className="checkbox-container">
                    <Checkbox name={this.props.id} checked={this.props.item.done} onChange={() => this.props.onChange(this.props.id)} />
                </Card.Section>

                <Card.Section grow={1}
                    tokens={{ childrenGap: '.4rem' }}
                    styles={{ root: { justifyContent: 'center', alignSelf: 'stretch' } }}
                >
                    {!this.props.item.editing ?
                        <Text variant="xLarge" className="title">{this.props.item.title}</Text>
                    :
                        <TextField value={this.state && this.state.title || ''} placeholder="Title (required)" required underlined
                            styles={{ field: { fontSize: FontSizes.xLarge, fontWeight: FontWeights.semibold }}}
                            onChange={({ target }) => { this.setState({ title: target.value }) }}
                        />
                    }
                    {!this.props.item.editing ?
                        (this.props.item.desc && <Text variant="mediumPlus" className="desc">{this.props.item.desc}</Text>)
                    :
                        <TextField value={this.state && this.state.desc || ''} placeholder="Description" multiline resizable={false} underlined
                            styles={{ field: { fontSize: FontSizes.mediumPlus }, root: { width: '100%' }}}
                            onChange={({ target }) => { this.setState({ desc: target.value }) }}
                        />
                    }
                </Card.Section>

                {/* <Card.Section
                    styles={{ root: { alignSelf: 'stretch', justifyContent: 'center', borderLeft: '1px solid #F3F2F1' } }}
                    tokens={{ padding: '0px 0px 0px 10px', childrenGap: '.2rem' }}
                    verticalAlign="center">
                    <HoverCard
                        styles={{ root: { flexGrow: 1 } }}
                        cardOpenDelay={0}
                        cardDismissDelay={50}
                        type={HoverCardType.plain}
                        plainCardProps={{ onRenderPlainCard: this.onRenderPlainCard }}
                        // componentRef={hoverCard}
                        // onCardHide={onCardHide}
                    >
                        <Icon styles={{ root: { display: 'block', flexGrow: 1 } }} iconName="MoreVertical" title="More" ariaLabel="More" />
                    </HoverCard>
                </Card.Section> */}
                <Card.Section fill
                    tokens={{ childrenGap: '.1rem', padding: '.2rem' }}
                    styles={{ root: { alignSelf: 'stretch', justifyContent: 'center', } }}
                >
                    {!this.props.item.editing ?
                        <IconButton iconProps={{ iconName: 'Edit' }} title="Edit"
                            onClick={(e) => { e.stopPropagation(); this.props.onEdit(this.props.id); }}
                        />
                    :
                        <IconButton iconProps={{ iconName: 'Save' }} title="Done"
                            onClick={(e) => { e.stopPropagation(); this.props.onSave(this.props.id, this.state); }}
                        />
                    }
                    {!this.props.item.editing &&
                        <IconButton iconProps={{ iconName: 'Delete' }} title="Delete"
                            onClick={(e) => { e.stopPropagation(); this.props.onDelete(this.props.id); }}
                        />
                    }
                </Card.Section>
            </Card>
            </div>
        );
    }
}
