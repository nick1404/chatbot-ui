'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="burger-menu" ref={menuRef}>
      <button onClick={toggleMenu} className="burger-button">
        &#9776;
      </button>
      {isOpen && (
        <div className="menu-content">
          <Link href="/">Home</Link>
          <a href="/tables/deployments">Deployments</a>
          <a href="/tables/products">Products</a>
          <a href="/tables/licenses">Licenses</a>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;