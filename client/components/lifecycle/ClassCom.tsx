"use client";
import React, { Component } from "react";

export default class ClassCom extends Component {
  constructor(props: any) {
    super(props);
    console.log("constructor");
    this.state = {
      count: 0,
      
    };
     this.myRef = React.createRef();
  }

  componentDidMount(): void {
    console.log("componentDidMount called");
  this.myRef.current.innerHTML = `<h1 class="text-green-500">Hi asik</h1>`;

    this.myRef.current.classList.add("text-7xl", "text-rose-600", "font-bold")
  }
  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    console.log("componentDidUpdate", { prevProps, prevState, snapshot });
  }
  componentWillUnmount(): void {
    console.log("componentWillUnmount called");
  }
  increase() {
    this.setState({ count: this.state.count + 1 });
  }
 
  
  
  render() {
    console.log("first render");
    
    console.log(this.myRef);
    return (
      <div className="text-white">
        <h1 ref={this.myRef} className="text-4xl">{this.state.count}</h1>
        <button onClick={() => this.increase()} className="btn bg-white">
          Click Me
        </button>
      </div>
    );
  }
}
