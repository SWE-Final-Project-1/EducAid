import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export const SideSheet = ({ heading, sub, content, children, open }) => {
  return (
    <>
      <Sheet defaultOpen={open} open={open}>
        <SheetTrigger className="flex items-center justify-center">
          {children}
        </SheetTrigger>
        {open ? (
          <SheetContent className="sm:max-w-[500px]">
            <SheetHeader className={"mb-4"}>
              <SheetTitle className="text-[22px] border-b pb-2">
                {heading}
              </SheetTitle>
              <SheetDescription>{sub}</SheetDescription>
            </SheetHeader>
            {content}
          </SheetContent>
        ) : (
          <SheetContent>
            <SheetHeader className={"mb-4"}>
              <SheetTitle className="text-[22px] border-b pb-2">
                {heading}
              </SheetTitle>
              <SheetDescription>{sub}</SheetDescription>
            </SheetHeader>
            {content}
          </SheetContent>
        )}
      </Sheet>
    </>
  );
};
