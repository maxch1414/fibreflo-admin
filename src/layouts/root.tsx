import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignInButton,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Icons } from "@/components/Icons";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider navigate={navigate} publishableKey={PUBLISHABLE_KEY}>
      <header className="sticky top-0 flex h-20 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden w-full gap-4 text-lg font-medium md:flex md:items-center">
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Icons.logo style={{ width: "80px", height: "80px" }} />
              <span className="sr-only">FibreFlo Admin</span>
            </Link>
          </div>
          <div className="flex w-full gap-20">
            <Link
              to="/engineers"
              className="ml-12 text-muted-foreground transition-colors hover:text-foreground"
            >
              Engineers
            </Link>
            <Link
              to="/timesheets"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Timesheets
            </Link>
            <Link
              to="/workitems"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Work Items
            </Link>
          </div>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Icons.logo style={{ width: "80px", height: "80px" }} />
                <span className="sr-only">FibreFlo Admin</span>
              </Link>
              <Link to="/engineers" className="hover:text-foreground">
                Engineers
              </Link>
              <Link
                to="/timesheets"
                className="text-muted-foreground hover:text-foreground"
              >
                Timesheets
              </Link>
              <Link
                to="/workitems"
                className="text-muted-foreground hover:text-foreground"
              >
                Work Items
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full md:w-[33%] justify-end items-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton redirectUrl="/" />
          </SignedOut>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </ClerkProvider>
  );
}
