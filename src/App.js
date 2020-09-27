import React, { Component } from 'react';
import { Theme, mergeThemes, FontWeights } from '@fluentui/theme';
import './App.css';
import List from './components/List'

import { ColorClassNames, createTheme, DefaultButton, Dialog, DialogFooter, DialogType, Icon, initializeIcons, PrimaryButton, registerIcons, useBoolean } from '@fluentui/react'
import { uuidv4 } from './components/Helpers';
import { SharedColors } from '@uifabric/fluent-theme';

initializeIcons();

class App extends Component {

    constructor() {
        super();
        this.state = {
            items: [
                { uuid: uuidv4(), done: true, editing: false, title: "titolo", desc: "testo", deleted: false },
                { uuid: uuidv4(), done: false, editing: false, title: "titolo2", desc: "testo2" },
                { uuid: uuidv4(), done: false, editing: false, title: "titolo3", desc: "" },
                { uuid: uuidv4(), done: false, editing: false, title: "titolo4", desc: "testo testo4 testo testo4testo testo4 testo testo4testo testo4 testo testo4testo testo4 testo testo4testo testo4" },
            ],
            lists: [{
                title: "Groceries",
                desc: null,
                items: [
                    { uuid: uuidv4(), done: true, title: "titolo", desc: "testo" },
                    { uuid: uuidv4(), done: false, title: "titolo2", desc: "testo2" },
                    { uuid: uuidv4(), done: false, title: "titolo3", desc: "testo 3" },
                    { uuid: uuidv4(), done: false, title: "titolo4", desc: "testo testo4" },
                ],
            }],
            hideDeleteDialog: true,
        };

        this.deletingItem = {
            title: "asd",
            index: -1,
        };

        this.dangerTheme = createTheme({
            palette: {
                themePrimary: '#e81123',
                themeLighterAlt: '#fef5f5',
                themeLighter: '#fbd6d9',
                themeLight: '#f8b3b9',
                themeTertiary: '#f16b76',
                themeSecondary: '#eb2b3b',
                themeDarkAlt: '#d10f1f',
                themeDark: '#b00c1a',
                themeDarker: '#820913',
            }
        });
    }

    handleCheck = (index, checked) => {
        if (this.state.items[index].editing) {
            return;
        }
        let items = this.state.items.slice();
        items[index].done = checked && !!checked || !items[index].done;
        this.setState({ items });
    }

    handleEnableEditing = (index) => {
        let items = this.state.items.slice();
        items[index].editing = true;
        this.setState({ items });
    }
    handleSaveChanges = (index, item) => {
        let items = this.state.items.slice();
        items[index] = { ...items[index], ...{ title: item.title, desc: item.desc, editing: false } };
        this.setState({ items });
    }

    handleDelete = (index, rightaway = false) => {
        if (rightaway) {
            console.log('rightaway');
            this.setState({ items: this.state.items.slice().filter((_, i) => { return i !== index; }) });
            return;
        }
        this.deletingItem = {
            title: this.state.items[index].title,
            index: index,
        }
        console.log('showing dialog');
        this.setState({ hideDeleteDialog: false });
    }

    hideDialog = () => {
        console.log('hiding dialog');
        this.setState({ hideDeleteDialog: true });
    }

    animateDelete = (index) => {
        // this.hideDialog();
        let items = this.state.items.slice();
        items[index] = { ...items[index], ...{ deleted: true } };
        this.setState({ items: items, hideDeleteDialog: true });
    }

    newItem = () => {
        let items = this.state.items.slice();
        items.push({ uuid: uuidv4(), editing: true });
        this.setState({ items });
    }

    render () {
        return (
            <div className="app">
                <div className="app-container">
                    <List
                        styles={{ root: { marginBlock: '1rem' } }}
                        items={this.state.items}
                        handleCheck={this.handleCheck}
                        enableEditing={this.handleEnableEditing}
                        saveChanges={this.handleSaveChanges}
                        deleteItem={this.handleDelete}
                    />

                    <DefaultButton styles={{ root: { marginBlockEnd: '1rem' } }} onClick={this.newItem}>New todo</DefaultButton>

                    <Dialog
                        hidden={this.state.hideDeleteDialog}
                        onDismiss={this.hideDialog}
                        modalProps={{
                            isBlocking: true
                        }}
                        dialogContentProps={{
                            theme: this.dangerTheme,
                            type: DialogType.largeHeader,
                            title: `Delete ${this.deletingItem.title}?`,
                            closeButtonAriaLabel: 'Close',
                            subText: 'This action is irreversible',
                        }}
                        // modalProps={modalProps}
                    >
                        <DialogFooter>
                            <PrimaryButton onClick={() => this.animateDelete(this.deletingItem.index)} theme={this.dangerTheme}>Delete</PrimaryButton>
                            <DefaultButton onClick={this.hideDialog}>Cancel</DefaultButton>
                        </DialogFooter>
                    </Dialog>
                </div>
            </div>
        );
    };
}

export default App;
