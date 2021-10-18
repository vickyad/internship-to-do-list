import { Component } from 'react';
import './styles.scss';


class Input extends Component {
    render() {
        return (
            <div className="to-do__input-wrapper">
                <input type="text" className="to-do__input" placeholder="Adicione a tarefa a ser realizada" value={this.props.value} onChange={event => this.props.handleInputChange(event)} />
                <button className="to-do__input-wrapper__button" onClick={() => this.props.handleAddButton()}>+</button>
            </div>
        )
    }
}
export default Input;