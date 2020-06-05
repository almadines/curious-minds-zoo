import React from 'react';
import { Link } from 'gatsby';
// import "./layout.scss"
import containerStyles from './layout.module.scss';

export class Layout extends React.Component {
  render(): JSX.Element {
    return (
      <div className={`layout-wrapper ${containerStyles.container}`}>
        <div className='layout-side-nav'>
          <h3 className='display-4'>Nav:</h3>
          <ul className="list-unstyled">
            <li><Link to='/'>Main page</Link></li>
            <li><Link to='/sub-page/'>Sub page</Link></li>
          </ul>
        </div>
        <div className='layout-main-content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}





