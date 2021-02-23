import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import key from './config';

class InputForm extends Component {
  constructor() {
    super();
    this.state = {
      stock: 'AAPL',
      amount: '1000',
      date: '2020-10-26',
      value: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();

    try {
      const past = await axios.get(
        `https://api.marketstack.com/v1/eod/${this.state.date}?access_key=${key.MARKETSTACK}&symbols=${this.state.stock}`
      );
      const cur = await axios.get(
        `https://api.marketstack.com/v1/eod/latest?access_key=${key.MARKETSTACK}&symbols=${this.state.stock}`
      );
      const pastPrice = past.data.data[0].adj_close; //price at searched date
      const curPrice = cur.data.data[0].adj_close; //today price
      const prevBought = parseInt(this.state.amount) / pastPrice; //shares bought at past price
      const newValue = Math.round(prevBought * curPrice);
      this.setState({ ...this.state, value: newValue });
    } catch (error) {
      alert('enter valid stock');
      console.log(error);
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { stock, date, amount } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <form id='form'>
        <div className='body'>
          <div className='container'>
            <label htmlFor='stock'>
              Stonk:
              <input name='stock' onChange={handleChange} value={stock} />
            </label>
            <label htmlFor='amount'>
              Amount:
              <input name='amount' onChange={handleChange} value={amount} />
            </label>
            <label htmlFor='date'>
              Date:
              <input
                name='date'
                type='date'
                onChange={handleChange}
                value={date}
              />
            </label>
          </div>
          <div className='submit'>
            <button type='button' onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
        <div>
          {this.state.value ? (
            <h1>
              If you had listened to your gut, you would now have $
              {this.state.value}
            </h1>
          ) : (
            <div></div>
          )}
        </div>
      </form>
    );
  }
}

export default InputForm;
