import { AppSidebar } from "@/components/app-sidebar"
import { ChatInterface } from "@/components/chat-interface"
import { SidebarInset } from "@/components/ui/sidebar"

export default function ChatPage() {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <SidebarInset>
        <ChatInterface />
      </SidebarInset>
    </div>
  )
}

