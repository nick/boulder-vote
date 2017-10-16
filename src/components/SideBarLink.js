import React from 'react';
import { Link } from 'react-router-dom'

const SideBarLink = (props) => {
    var active = props.location.pathname === props.href;
    return (
      <li className={`side-link${active ? ' active' : ''}`}>
        <span className="c">&#10095;</span>
        {active ? <b>{props.children}</b> :
          <Link to={props.href || '/'}>{props.children}</Link>
        }
      </li>
    )
}

export default SideBarLink;
