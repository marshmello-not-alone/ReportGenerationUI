import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useLocation,
  useRouteContext,
  useRouter,
} from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { logout } from "@/hooks/auth";

const navigation = [
  {
    name: "Dashboard",
    to: "/user/dashboard",
    title: "Welcome to the Dashboard",
    subtitle: "Here's a quick overview of your current reports and activities.",
  },
  {
    name: "Generate",
    to: "/user/generate",
    title: "Generate Report",
    subtitle: "Create new reports with our powerful generation tools.",
  },
  {
    name: "Reports",
    to: "/user/reports",
    title: "Report status & downloads",
    subtitle: "View, manage and download your completed reports.",
  },
  {
    name: "Analytics",
    to: "/user/analytics",
    title: "Analytics Overview",
    subtitle: "Analyze your report data, trends and performance metrics.",
  },
  {
    name: "Settings",
    to: "/user/settings",
    title: "Your Settings",
    subtitle: "Manage your account preferences and configuration options.",
  },
];

export const Route = createFileRoute("/user")({
  beforeLoad: async () => {
    const res = await fetch("/api/auth/profile", {
      credentials: "include",
    });

    if (!res.ok) {
      throw redirect({ to: "/login" });
    }

    const data = await res.json();

    return { user: data.user }; // Make this available in context
  },
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const location = useLocation();
  const { user } = useRouteContext({ from: "/user" });
  const currentPage = navigation.find((page) => page.to === location.pathname);
  const currentTitle = currentPage?.title || "Dashboard";
  const handleLogOut = async () => {
    await logout();
    router.navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-primary/80 px-2 sm:px-6 lg:px-30">
        <div className="flex h-20 items-center justify-between ">
          <div className="flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10 rounded-md px-3 py-2 text-base font-medium [&.active]:bg-primary-foreground/20 [&.active]:font-semibold [&.active]:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <ModeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="relative text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10"
              >
                <Bell className="size-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative ml-3 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10"
                  >
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name?.[0] ?? "?"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/">Your Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to="/user/settings">Settings</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={handleLogOut}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <Separator />
        <header>
          <div className="mx-auto max-w-8xl pt-6 pb-20">
            <h1 className="text-3xl  font-medium text-primary-foreground">
              {currentTitle}
            </h1>
            <h3 className="mt-2 text-lg text-primary-foreground/80">
              {currentPage?.subtitle}
            </h3>
          </div>
        </header>
      </nav>

      <main className="bg-content-bg flex-1">
        <Outlet />
      </main>
    </div>
  );
}
