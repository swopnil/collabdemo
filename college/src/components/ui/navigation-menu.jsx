import React from 'react';
import { cn } from '../../lib/utils';

export const NavigationMenu = ({ children, className, ...props }) => (
  <nav className={cn("relative z-10", className)} {...props}>
    {children}
  </nav>
);

export const NavigationMenuList = ({ children, className, ...props }) => (
  <ul className={cn("flex space-x-4", className)} {...props}>
    {children}
  </ul>
);

export const NavigationMenuItem = ({ children, className, ...props }) => (
  <li className={className} {...props}>
    {children}
  </li>
);

export const NavigationMenuLink = React.forwardRef(({ className, children, ...props }, ref) => (
  
    ref={ref}
    className={cn(
      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100",
      className
    )}
    {...props}
  >
    {children}
  </a>
));
NavigationMenuLink.displayName = "NavigationMenuLink";