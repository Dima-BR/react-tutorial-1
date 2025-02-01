import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import { NavLink } from "react-router-dom";
import { counterContext } from './../../contexts/counterContext';
import { useContext } from 'react';

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};
export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const {counter} = useContext(counterContext);

  const menuItems = [
    "Products",
    "Categories",
    "Servises",
    "My Settings",
  ];
  return (
    <>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="pr-3  sm:flex" justify="start">
          <NavbarBrand>
            <AcmeLogo />
            <NavLink to="/"> 
            <p className="font-bold text-inherit">ACME <span className="text-green-700">{counter}</span></p>
            </NavLink>
          </NavbarBrand>
        </NavbarContent>

       
        
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
            <NavLink color="foreground" to={item === "Home" ? "/" : `/${item.toLowerCase()}`} >
              {item}
            </NavLink>
          </NavbarItem>
          ))}
        </NavbarContent>


        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <NavLink to="/login">Login</NavLink>
          </NavbarItem>
          <NavbarItem>
            <Button  color="warning" variant="flat">
              <NavLink to="/register"> Sign Up</NavLink>
             
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`} onClick={() => setIsMenuOpen(false)}>
              <NavLink
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                size="lg"
              >
                {item}
              </NavLink>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
