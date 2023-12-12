import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const Menu = ({ children, content }) => {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center justify-center">
        {children}
      </PopoverTrigger>
      <PopoverContent>{content}</PopoverContent>
    </Popover>
  );
};
