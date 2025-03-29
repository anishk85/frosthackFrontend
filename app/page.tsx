import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 p-4">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-700 dark:text-blue-400">Research Paper Chatbot</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Your AI-powered research assistant for academic papers
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button asChild size="lg" className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700">
            <Link href="/login">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/signup">Create Account</Link>
          </Button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
        <FeatureCard
          title="Natural Language Queries"
          description="Ask questions in plain English and get citation-backed answers from academic papers."
          icon="Search"
        />
        <FeatureCard
          title="Multi-Modal Interaction"
          description="Interact with your research using text or voice commands for a seamless experience."
          icon="Mic"
        />
        <FeatureCard
          title="Citation Analytics"
          description="Visualize connections between papers with interactive knowledge graphs."
          icon="BarChart"
        />
      </div>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  const icons = {
    Search: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 mb-4 text-blue-600 dark:text-blue-400"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
    ),
    Mic: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 mb-4 text-blue-600 dark:text-blue-400"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" x2="12" y1="19" y2="22"></line>
      </svg>
    ),
    BarChart: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 mb-4 text-blue-600 dark:text-blue-400"
      >
        <line x1="12" x2="12" y1="20" y2="10"></line>
        <line x1="18" x2="18" y1="20" y2="4"></line>
        <line x1="6" x2="6" y1="20" y2="16"></line>
      </svg>
    ),
  }

  return (
    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center text-center">
        {icons[icon as keyof typeof icons]}
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  )
}

