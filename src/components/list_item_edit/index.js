import { Component } from 'react';

class ListItemEdit extends Component {
    render() {
        return (
            <div className="to-do__list__item to-do__list__item__on-edit">
                <div>
                    <input type="text" className="to-do__input" placeholder="Tarefa a ser realizada" value={this.props.inputValue} onChange={event => this.props.handleInputChange(event)} />
                </div>
                <div className="to-do__list__item__button-wrapper">
                    <button className="to-do__button" onClick={() => this.props.handleSaveChanges(this.props.currentItem)}>Salvar edição</button>
                    <button className="to-do__button to-do__cancel_button" onClick={() => this.props.handleCancelChanges(this.props.currentItem)}>Cancelar edição</button>
                </div>
            </div>
        )
    }
}
export default ListItemEdit