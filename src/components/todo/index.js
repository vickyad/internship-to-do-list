import { Component } from 'react';
import Input from '../input';
import ListItemEdit from '../list_item_edit';
import ListItemVisualization from '../list_item_visualization';
import './styles.scss';

class ToDo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: "",
            editInput: "",
            onEdition: false,
            toDoList: this.loadInitialList(),
        }
        this.handleUnload = this.handleUnload.bind(this)
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.handleUnload)
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleUnload)
    }

    loadInitialList() {
        const storageItem = localStorage.getItem('to-do-list')
        return storageItem ? JSON.parse(storageItem) : []
    }

    handleAddItem() {
        const nowDate = new Date().toLocaleString()
        this.setState({ ...this.state, toDoList: [...this.state.toDoList, { value: this.state.inputValue, checked: false, date: nowDate, editing: false }], inputValue: "" })
    }

    handleCheckItem(itemToCheck) {
        const newList = this.state.toDoList.map((item) => item === itemToCheck ? { ...item, checked: !item.checked } : item)
        this.setState({ ...this.state, toDoList: newList })
    }

    handleEditItem(itemToEdit) {
        if (!this.state.onEdition) {
            const newList = this.state.toDoList.map((item) => item === itemToEdit ? { ...item, editing: true } : item)
            this.setState({ ...this.state, onEdition: true, editInput: itemToEdit.value, toDoList: newList })
        }
    }

    handleDeleteItem(item) {
        this.setState({ ...this.state, toDoList: this.state.toDoList.filter(i => i !== item) })
    }

    handleUpdateChange(event) {
        this.setState({ ...this.state, inputValue: event.target.value })
    }

    handleUpdateInputChange(event) {
        this.setState({ ...this.state, editInput: event.target.value })
    }

    handleDeleteAllItens() {
        this.setState({ ...this.state, toDoList: [] })
    }

    handleUnload() {
        localStorage.setItem('to-do-list', JSON.stringify(this.state.toDoList))
    }

    handleSaveItemEdition(itemToSave) {
        const newList = this.state.toDoList.map((item) => item === itemToSave ? { ...item, value: this.state.editInput, editing: false } : item)
        this.setState({ ...this.state, onEdition: false, editInput: "", toDoList: newList })
    }

    handleCancelItemEdition(itemToEdit) {
        const newList = this.state.toDoList.map((item) => item === itemToEdit ? { ...item, editing: false } : item)
        this.setState({ ...this.state, onEdition: false, toDoList: newList })
    }

    render() {
        return (
            <div className="to-do" >
                <h1 className="to-do__title">To-do List</h1>
                <Input value={this.state.inputValue} handleInputChange={event => this.handleUpdateChange(event)} handleAddButton={() => this.handleAddItem()} />
                <ul className="to-do__list">
                    {this.state.toDoList ? this.state.toDoList.map((item, index) => {
                        return (
                            <li key={index}>
                                {item.editing ?
                                    <ListItemEdit
                                        currentItem={item}
                                        handleSaveChanges={() => this.handleSaveItemEdition(item)}
                                        handleCancelChanges={() => this.handleCancelItemEdition(item)}
                                        inputValue={this.state.editInput}
                                        handleInputChange={event => this.handleUpdateInputChange(event)}
                                    />
                                    :
                                    <ListItemVisualization
                                        currentItem={item}
                                        handleCheckInput={() => this.handleCheckItem(item)}
                                        handleEditItem={() => this.handleEditItem(item)}
                                        handleDeleteItem={() => this.handleDeleteItem(item)}
                                    />
                                }
                            </li>
                        )
                    }) : <></>}
                </ul>
                <button className="to-do__button to-do__delete_button" onClick={() => this.handleDeleteAllItens()}>Deletar todos os itens</button>
            </div>
        )
    }
}
export default ToDo