import React from 'react'
import { AppState } from '../../state/createStore';
import { connect } from "react-redux"
import './counter.scss'

interface CounterProps {
  count: number
  increment: () => void
}

const mapStateToProps = (state: AppState) => {
  return { count: state.count }
}

const mapDispatchToProps = dispatch => {
  return { increment: () => dispatch({ type: `INCREMENT`, value: 'hi' }) }
}

class Counter extends React.Component<CounterProps> {
  render(): JSX.Element {
    return (
      <div className='input-group mb-3 counter-wrapper'>
        <input type="text" className='form-control' value={this.props.count}/>
        <div className='input-group-append'>
        <button onClick={this.props.increment} className='btn btn-outline-secondary' type="button">Increment!</button>
        </div>
      </div>
    );
  }
}

export const ConnectedCounter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
