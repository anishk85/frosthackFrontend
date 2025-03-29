import { ReactNode } from "react"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

const icons: Record<string, ReactNode> = {
  Search: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mb-4 text-blue-600 dark:text-blue-400">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </svg>
  ),
  Mic: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mb-4 text-blue-600 dark:text-blue-400">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" x2="12" y1="19" y2="22"></line>
    </svg>
  ),
  BarChart: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mb-4 text-blue-600 dark:text-blue-400">
      <line x1="12" x2="12" y1="20" y2="10"></line>
      <line x1="18" x2="18" y1="20" y2="4"></line>
      <line x1="6" x2="6" y1="20" y2="16"></line>
    </svg>
  )
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center text-center">
        {icons[icon]}
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  )
}