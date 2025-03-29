"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth";
import { selectIsAuthenticated, selectCurrentUser } from "@/lib/slices/authSlice";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  MessageSquare,
  Library,
  BarChart2,
  FolderOpen,
  Tag,
  Star,
  Clock,
  User2,
  // Settings,
  LogOut,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AppSidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const [mounted, setMounted] = useState(false);

  const [collections] = useState([
    { name: "AI & Machine Learning", count: 42 },
    { name: "Genomics", count: 18 },
    { name: "Climate Science", count: 24 },
    { name: "Quantum Computing", count: 13 },
  ]);

  const [tags] = useState([
    { name: "Read Later", count: 15 },
    { name: "Important", count: 8 },
    { name: "To Cite", count: 12 },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout(router.push));
  };

  if (!mounted) return null;

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.image} />
            <AvatarFallback className="bg-blue-600 text-white font-bold">
              {user?.firstName?.[0] || 'U'}
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold text-lg">ResearchAI</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/chat"} tooltip="Chat">
                  <Link href="/chat">
                    <MessageSquare />
                    <span>Chat</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/library"} tooltip="Library">
                  <Link href="/library">
                    <Library />
                    <span>Library</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/analytics"} tooltip="Analytics">
                  <Link href="/analytics">
                    <BarChart2 />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/chat"} tooltip="Chat">
                  <Link href="/">
                    <MessageSquare />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Collections</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus size={16} />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {collections.map((collection) => (
                <SidebarMenuItem key={collection.name}>
                  <SidebarMenuButton>
                    <FolderOpen size={18} />
                    <span>{collection.name}</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>{collection.count}</SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tags</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus size={16} />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {tags.map((tag) => (
                <SidebarMenuItem key={tag.name}>
                  <SidebarMenuButton>
                    <Tag size={18} />
                    <span>{tag.name}</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>{tag.count}</SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>History</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Star size={18} />
                  <span>Favorites</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Clock size={18} />
                  <span>Recent</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/profile">
                <User2 size={18} />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Settings size={18} />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem> */}
        </SidebarMenu>

        <div className="flex items-center justify-between p-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </Button>
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function SidebarMenuBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 px-1.5 text-xs font-medium text-blue-800 dark:text-blue-200">
      {children}
    </div>
  );
}

function SidebarGroupAction({ children }: { children: React.ReactNode }) {
  return (
    <button className="ml-auto flex h-6 w-6 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
      {children}
    </button>
  );
}