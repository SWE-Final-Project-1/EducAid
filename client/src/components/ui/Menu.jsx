import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const Menu = ({ children }) => {
  return (
    <Popover >
      <PopoverTrigger className="flex items-center justify-center">{children}</PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  );
};
