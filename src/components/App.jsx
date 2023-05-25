import React, { Component } from 'react';
import FormComponent from 'components/FormComponent/FormComponent';
import ListComponent from './ListComponent/ListComponent';
import Filter from 'components/Filter/Filter';
import Notiflix from 'notiflix';

import { nanoid } from 'nanoid';
const INITIAL_STATE = {
  contacts: [],
  filter: '',
};
export default class App extends Component {
  state = {
    ...INITIAL_STATE,
  };
  submitForm = ({ name, number }) => {
    if (this.findContackt(name).length) {
      Notiflix.Notify.failure(`${name} is already in contacts.`);
    } else {
      const id = nanoid();
      this.setState(prevSt => {
        return {
          contacts: [...prevSt.contacts, { id, name, number }],
        };
      });
    }
  };
  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };
  findContackt = name => {
    const alignContact = name.toLowerCase();

    return this.state.contacts.filter(el => {
      return el.name.toLowerCase().includes(alignContact);
    });
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== contactId),
    }));
  };
  componentDidMount() {
    try {
      const contactsList = localStorage.getItem('contacks');
      if (contactsList) {
        this.setState({ contacts: contactsList });
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacks', JSON.stringify(this.state.contacts));
    }
  }
  render() {
    const filterContackt = this.findContackt(this.state.filter);

    return (
      <div className="container">
        <h1>Phonebook</h1>
        <FormComponent onSubmit={this.submitForm}></FormComponent>
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter}></Filter>

        {filterContackt.length > 0 && (
          <ListComponent
            contacts={filterContackt}
            onDeleteContact={this.deleteContact}
          ></ListComponent>
        )}
      </div>
    );
  }
}

export { App };
