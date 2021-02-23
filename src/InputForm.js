import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import key from './config';

class InputForm extends Component {
  constructor() {
    super();
    this.state = {
      stock: '',
      date: '',
      amount: '',
      value: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const today = moment().format('YYYY-MM-DD');
      const { data } = await axios.get(
        `http://api.marketstack.com/v1/eod?access_key=${key.MARKETSTACK}&symbols=${this.state.stock}&date_from=${this.state.date}&date_to=${today}`
      );
      const curPrice = data.data.shift().adj_close; //today price
      const pastPrice = data.data.pop().adj_close; //price at searched date
      const prevBought = parseInt(this.state.amount) / pastPrice; //shares bought at past price
      const newValue = Math.round(prevBought * curPrice);
      this.setState({ ...this.state, value: newValue });
      //console.log(newValue);
      console.log(data);
    } catch (error) {
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
          <div classname='container'>
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
