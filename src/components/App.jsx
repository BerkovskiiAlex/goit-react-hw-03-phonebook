import React from 'react';
import 'modern-normalize';
import { Input } from './Input/Input';
import { ContactsList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const dataOfState = JSON.parse(localStorage.getItem('localContacts'));
    if (dataOfState && dataOfState.length) {
      this.setState({ contacts: dataOfState });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
      window.localStorage.setItem(
        'localContacts',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  handleAddContact = (name, number) => {
    const newContact = { id: nanoid(), name, number };

    if (this.state.contacts.some(contact => contact.name === name)) {
      toast(`${name} is already in contacts`, { autoClose: 4000 });
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    if (filter === '') {
      return contacts;
    } else {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
  };

  handleSetFilter = event => {
    const { value } = event.target;
    this.setState({ filter: value });
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const filteredContacts = this.filterContacts();
    return (
      <section>
        <ToastContainer />
        <Input onSubmit={this.handleAddContact} />
        <ContactsList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
        <Filter
          onFilterChange={this.handleSetFilter}
          filter={this.state.filter}
        />
      </section>
    );
  }
}
