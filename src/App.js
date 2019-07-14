import React, { Component } from "react"

class App extends Component {
  state = {
    computation: "0",
    allowZero: false,
    firstCalc: true,
    lastoperand: "", //for example in full comp "3+400-1200-500" lastoperand is 500
    newComp: false
  }

  computate = () => {
    const value = eval(this.state.computation)
    this.setState(prev => ({
      computation: value,
      allowZero: true,
      firstCalc: false,
      lastoperand: "",
      newComp: true
    }))
  }

  addToComp = e => {
    const value = e.target.innerHTML
    const operators = ["+", "*", "/", "-"]
    if (!isNaN(value)) {
      if (this.state.firstCalc && value === "0") return
      else if (this.state.newComp) {
        this.setState(prev => ({
          computation: value,
          allowZero: true,
          firstCalc: false,
          lastoperand: value,
          newComp: false
        }))
      } else {
        if (value === "0" && this.state.allowZero) {
          // "0" related calculations
          //const lastCalc = this.state.computation.split(/[+,\-,*,/]/).slice(-1)[0]
          const lastOperand = this.state.lastoperand
          if (lastOperand === "") {
            this.setState(prev => ({
              computation: prev.computation + value,
              allowZero: false,
              firstCalc: false,
              lastoperand: prev.lastoperand + value
            }))
          }
          //zero is added to current calc ex: 5000->50000
          else {
            this.setState(prev => ({
              computation: prev.firstCalc ? value : prev.computation + value,
              allowZero: true,
              firstCalc: false,
              lastoperand: prev.lastoperand + value
            }))
          }
        } else {
          //const lastCalc = this.state.computation.toString().split(/[+,\-,*,/]/).slice(-1)[0]
          const lastOperand = this.state.lastoperand
          if (lastOperand === "0") return
          this.setState(prev => ({
            computation: prev.firstCalc ? value : prev.computation + value,
            allowZero: true,
            firstCalc: false,
            lastoperand: prev.firstCalc ? value : prev.lastoperand + value
          }))
        }
      }
    } else if (operators.includes(value)) {
      //value is [+,-,*,/]
      if (this.state.computation[this.state.computation.length - 1] === ".")
        return
      else if (
        operators.includes(
          this.state.computation[this.state.computation.length - 1]
        )
      ) {
        //last element was operator then change the operators
        this.setState(prev => ({
          computation: prev.computation.toString().slice(0, -1) + value,
          allowZero: true,
          firstCalc: false,
          lastoperand: "",
          newComp: false
        }))
      } else if (this.state.firstCalc) return
      else {
        this.setState(prev => ({
          computation: prev.computation + value,
          allowZero: true,
          firstCalc: false,
          lastoperand: "",
          newComp: false
        }))
      }
    } else {
      // "."
      //const lastCalc = this.state.computation.toString().split(/[+,\-,*,/]/).slice(-1)[0] //to get last calculation after operator
      const lastOperand = this.state.lastoperand
      if (this.state.firstCalc) {
        this.setState({
          computation: "0.",
          allowZero: true,
          firstCalc: false,
          lastoperand: "0.",
          newComp: false
        })
      } else if (lastOperand.includes(".")) return
      else if (isNaN(this.state.computation[this.state.computation.length - 1]))
        return
      else {
        this.setState(prev => ({
          computation: prev.computation + ".",
          allowZero: true,
          lastoperand: prev.lastoperand + ".",
          newComp: false
        }))
      }
    }
  }

  clear = () => {
    this.setState(pre => ({
      computation: "0",
      firstCalc: true,
      allowZero: false,
      lastoperand: ""
    }))
  }
  render() {
    return (
      <div id="app">
        <div id="display">{this.state.computation}</div>
        <div id="calculator">
          <div className="element" id="clear" onClick={this.clear}>
            Clear
          </div>
          <div className="element" id="equals" onClick={this.computate}>
            =
          </div>
          <div className="element" id="seven" onClick={this.addToComp}>
            7
          </div>
          <div className="element" id="eight" onClick={this.addToComp}>
            8
          </div>
          <div className="element" id="nine" onClick={this.addToComp}>
            9
          </div>
          <div className="element" id="divide" onClick={this.addToComp}>
            /
          </div>
          <div className="element" id="four" onClick={this.addToComp}>
            4
          </div>
          <div className="element" id="five" onClick={this.addToComp}>
            5
          </div>
          <div className="element" id="six" onClick={this.addToComp}>
            6
          </div>
          <div className="element" id="multiply" onClick={this.addToComp}>
            *
          </div>
          <div className="element" id="one" onClick={this.addToComp}>
            1
          </div>
          <div className="element" id="two" onClick={this.addToComp}>
            2
          </div>
          <div className="element" id="three" onClick={this.addToComp}>
            3
          </div>
          <div className="element" id="subtract" onClick={this.addToComp}>
            -
          </div>
          <div className="element" id="zero" onClick={this.addToComp}>
            0
          </div>
          <div className="element" id="empty" />
          <div className="element" id="decimal" onClick={this.addToComp}>
            .
          </div>
          <div className="element" id="add" onClick={this.addToComp}>
            +
          </div>
        </div>
      </div>
    )
  }
}

export default App
