import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: 0,
      operatorsNum: {
        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9,
        "zero": 0,
        "decimal": "."
      },
      operatorsSign: [
        "divide",
        "multiply",
        "add",
        "subtract",
        "equal"
      ],
      lastOperator: null,
      numEnter: null,
      needNewDisplay: false,
      lastType: null
    }
  }

  onButtonClicked = (value) => {
    const { operatorsNum,
      lastOperator,
      numEnter,
      display,
      operatorsSign,
      needNewDisplay,
      lastType } = this.state
    // input
    if (Object.keys(operatorsNum).includes(value)) {
      if (display === 0) {
        this.setState({
          display: display + operatorsNum[value],
          lastType: operatorsNum[value]
        })
      } else {
        if (needNewDisplay) {
          if (value === "decimal") {
            this.setState({
              display: "0" + operatorsNum[value],
              needNewDisplay: false,
              lastType: operatorsNum[value]
            })
          } else {
            this.setState({
              display: operatorsNum[value],
              needNewDisplay: false,
              lastType: operatorsNum[value]
            })
          }
        } else {
          let isFloat = Number(display) == display && Number(display) % 1 !== 0
          let isContainDecimal = () => {
            if (!Number(display) == display) {
              return true
            }
            return false
          }
          if (!isFloat && !isContainDecimal() || value !== "decimal") {
            this.setState({
              display: display + operatorsNum[value],
              lastType: operatorsNum[value]
            })
          } else {
            this.setState({
              lastType: value
            })
          }
        }
      }
    }
    // sign
    else if (operatorsSign.includes(value)) {
      if (operatorsSign.includes(lastType)) {
        if (value !== "equal") {
          this.setState({
            numEnter: display,
            lastOperator: value,
            needNewDisplay: true
          })
        } else {
          this.setState({
            numEnter: null,
            lastOperator: value,
            needNewDisplay: true
          })
        }
      } else {
        if (numEnter === null) {
          this.setState({
            numEnter: Number(display),
            needNewDisplay: true,
            lastOperator: value,
            lastType: value
          })
        } else {
          if (value !== "equal") {
            this.setState({
              display: this.operateResult(numEnter, Number(display), lastOperator),
              needNewDisplay: true,
              numEnter: this.operateResult(numEnter, Number(display), lastOperator),
              lastType: value
            })
          } else {
            this.setState({
              display: this.operateResult(numEnter, Number(display), lastOperator),
              numEnter: null,
              lastType: value,
              needNewDisplay: true
            })
          }
        }
      }
    } else if (value === "clear") {
      this.setState({
        display: 0,
        lastOperator: null,
        numEnter: null,
        needNewDisplay: false,
        lastType: null
      })
    }
  }

  operateResult = (valueOne, valueTwo, operatorsSign) => {
    if (operatorsSign === "add") {
      return valueOne + valueTwo
    } else if (operatorsSign === "subtract") {
      return valueOne - valueTwo
    } else if (operatorsSign === "multiply") {
      return valueOne * valueTwo
    } else if (operatorsSign === "divide") {
      if (valueTwo !== 0) {
        return valueOne / valueTwo
      }
    } else {
      return NaN
    }
  }
  render() {
    const { display } = this.state
    return (
      <div className="App">
        <div className="calculator">
          <div id="display"><span>{display}</span></div>
          <div className="pad-area">
            <div className="red-area" id="clear" onClick={() => this.onButtonClicked("clear")}><span>AC</span></div>
            <div className="light-grey-area" id="divide" onClick={() => this.onButtonClicked("divide")}><span>/</span></div>
            <div className="light-grey-area" id="multiply" onClick={() => this.onButtonClicked("multiply")}><span>X</span></div>
            <div className="dark-grey-area" id="seven" onClick={() => this.onButtonClicked("seven")}><span>7</span></div>
            <div className="dark-grey-area" id="eight" onClick={() => this.onButtonClicked("eight")}><span>8</span></div>
            <div className="dark-grey-area" id="nine" onClick={() => this.onButtonClicked("nine")}><span>9</span></div>
            <div className="light-grey-area" id="subtract" onClick={() => this.onButtonClicked("subtract")}><span>-</span></div>
            <div className="dark-grey-area" id="four" onClick={() => this.onButtonClicked("four")}><span>4</span></div>
            <div className="dark-grey-area" id="five" onClick={() => this.onButtonClicked("five")}><span>5</span></div>
            <div className="dark-grey-area" id="six" onClick={() => this.onButtonClicked("six")}><span>6</span></div>
            <div className="light-grey-area" id="add" onClick={() => this.onButtonClicked("add")}><span>+</span></div>
            <div className="dark-grey-area" id="one" onClick={() => this.onButtonClicked("one")}><span>1</span></div>
            <div className="dark-grey-area" id="two" onClick={() => this.onButtonClicked("two")}><span>2</span></div>
            <div className="dark-grey-area" id="three" onClick={() => this.onButtonClicked("three")}><span>3</span></div>
            <div className="blue-area" id="equals" onClick={() => this.onButtonClicked("equal")}><span>=</span></div>
            <div className="dark-grey-area" id="zero" onClick={() => this.onButtonClicked("zero")}><span>0</span></div>
            <div className="dark-grey-area" id="decimal" onClick={() => this.onButtonClicked("decimal")}><span>.</span></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
