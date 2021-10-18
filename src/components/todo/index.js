import { Component } from 'react';
import Input from '../input';
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
        this.handleUnload = this.handleUnload.bind(this);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.handleUnload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleUnload);
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
                                    <div className="to-do__list__item to-do__list__item__on-edit">
                                        <div>
                                            <input type="text" className="to-do__input" placeholder="Tarefa a ser realizada" value={this.state.editInput} onChange={event => this.handleUpdateInputChange(event)} />
                                        </div>
                                        <div className="to-do__list__item__button-wrapper">
                                            <button className="to-do__button" onClick={() => this.handleSaveItemEdition(item)}>Salvar edição</button>
                                            <button className="to-do__button to-do__cancel_button" onClick={() => this.handleCancelItemEdition(item)}>Cancelar edição</button>
                                        </div>
                                    </div>
                                    :
                                    <div className="to-do__list__item to-do__list__item__visualization">
                                        <div>
                                            <input type="checkbox" onClick={() => this.handleCheckItem(item)} checked={item.checked} />
                                            <label>{item.value}</label>
                                        </div>
                                        <span>{item.date}</span>
                                        <div className="to-do__list__item__button-wrapper">
                                            <button className="to-do__button" onClick={() => this.handleEditItem(item)}>Editar item</button>
                                            <button className="to-do__button" onClick={() => this.handleDeleteItem(item)}>Deletar item</button>
                                        </div>
                                    </div>
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
export default ToDo;