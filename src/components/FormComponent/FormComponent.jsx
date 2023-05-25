import React, { Component } from 'react';
import css from 'components/FormComponent/FormComponent.module.css';
const Initial_State = { name: '', number: '' };
class FormComponent extends Component {
  state = {
    ...Initial_State,
  };
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ ...Initial_State });
  };
  render() {
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <label htmlFor="name" className={css.labelName}>Name:</label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={this.handleChange}
          value={this.state.name}
          required
        />
        <label htmlFor="number" className={css.labelNumber}>Number</label>
        <input
          type="tel"
          name="number"
          onChange={this.handleChange}
          value={this.state.number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button type="submit" className={css.formButton}>Add contact</button>
      </form>
    );
  }
}

export default FormComponent;
