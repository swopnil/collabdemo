import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

const Sheet = ({ children, open: controlledOpen, onOpenChange }) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (open) => {
    setUncontrolledOpen(open);
    onOpenChange?.(open);
  };

  return (
    <SheetContext.Provider value={{ isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
};

const SheetContext = React.createContext({});

const useSheet = () => {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error('Sheet components must be used within a Sheet provider');
  }
  return context;
};

const SheetTrigger = React.forwardRef(({ children, ...props }, ref) => {
  const { onOpenChange } = useSheet();
  return React.cloneElement(children, {
    ref,
    onClick: () => onOpenChange(true),
    ...props,
  });
});
SheetTrigger.displayName = 'SheetTrigger';

const SheetContent = React.forwardRef(({ 
  children, 
  className, 
  side = 'right',
  ...props 
}, ref) => {
  const { isOpen, onOpenChange } = useSheet();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Sheet */}
      <div
        ref={ref}
        className={cn(
          "fixed bg-white shadow-lg transition-transform duration-300 ease-in-out",
          side === 'right' && "right-0 top-0 h-full w-[400px] translate-x-0",
          side === 'left' && "left-0 top-0 h-full w-[400px] translate-x-0",
          side === 'top' && "top-0 left-0 w-full h-[400px] translate-y-0",
          side === 'bottom' && "bottom-0 left-0 w-full h-[400px] translate-y-0",
          className
        )}
        {...props}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div />
            <button
              className="rounded-full p-2 hover:bg-gray-100"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
});
SheetContent.displayName = 'SheetContent';

const SheetHeader = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col space-y-2", className)}
    {...props}
  />
);
SheetHeader.displayName = 'SheetHeader';

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
));
SheetTitle.displayName = 'SheetTitle';

const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-500", className)}
    {...props}
  />
));
SheetDescription.displayName = 'SheetDescription';

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
};