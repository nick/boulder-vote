import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Tabs extends Component {
    render() {
        return (
          <ul className="nav nav-tabs" style={this.props.style}>
            {this.props.children.filter(c => c).map((tab, idx) =>
              <li key={idx} className="nav-item">
                <NavLink
                  to={tab.props.href}
                  exact
                  className="nav-link"
                  children={tab.props.children}
                />
              </li>
            )}
          </ul>
        )
    }
}

export class Tab extends Component {}
