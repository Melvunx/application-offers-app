import { getRequiredUser } from "@/src/lib/auth-session";
import { User } from "better-auth";
import {
  ChartColumnIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Navbar } from "./Navbar";

export async function Header() {
  const user = await getRequiredUser();

  return (
    <div className="flex w-full">
      <Navbar />
      <UserMenu user={user as User} />
    </div>
  );
}

function UserMenu({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <Avatar>
            {user.image ? (
              <AvatarImage src={user.image} alt={`image-${user.name}`} />
            ) : (
              <AvatarFallback>
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          {user.name} <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <SettingsIcon />
            <Link href="/settings">Paramètres</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserIcon />
            <Link href="/settings/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ChartColumnIcon />
            <Link href="/settings/stats">Les stats</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <form
          // action={async () => {
          //   "use server";

          //   await auth.api.signOut({
          //     headers: await headers(),
          //   });

          //   redirect("/auth/login");
          // }}
          >
            <Button type="submit" variant="destructive" className="w-full flex">
              <LogOutIcon />
              Se déconnecter
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
