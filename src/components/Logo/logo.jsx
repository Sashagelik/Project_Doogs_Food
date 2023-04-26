import React from 'react'
import { Link } from 'react-router-dom';
import './styles.css';
import logoSrc from './logo.svg'

export default function Logo({ className, href, ...props }) {
  const hrefValue = href ? href : null;
  return (
    hrefValue
      ? <Link to={{ pathname: hrefValue }} className={className ? className : "logo"}>
        <img src={logoSrc} alt="Логотип компании" className='logo__pic' />
      </Link>
      : <a href='#' className={className ? className : "logo"}>
        <img src={logoSrc} alt="Логотип компании" className='logo__pic' />
      </a>
  )
};


