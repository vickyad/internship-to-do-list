import { Component } from 'react';

class ListItemVisualization extends Component {
    render() {
        return (
            <div className="to-do__list__item to-do__list__item__visualization">
                <div>
                    <input type="checkbox" onClick={() => this.props.handleCheckInput(this.props.currentItem)} checked={this.props.currentItem.checked} />
                    <label>{this.props.currentItem.value}</label>
                </div>
                <span>{this.props.currentItem.date}</span>
                <div className="to-do__list__item__button-wrapper">
                    <button className="to-do__button" onClick={() => this.props.handleEditItem(this.props.currentItem)}>Editar item</button>
                    <button className="to-do__button" onClick={() => this.props.handleDeleteItem(this.props.currentItem)}>Deletar item</button>
                </div>
            </div>
        )
    }
}
export default ListItemVisualization