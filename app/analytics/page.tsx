import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CitationGraph } from "@/components/citation-graph"
import { TopPapersChart } from "@/components/top-papers-chart"

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <SidebarInset>
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Analytics</h1>

          <Tabs defaultValue="citations">
            <TabsList className="mb-6">
              <TabsTrigger value="citations">Citation Network</TabsTrigger>
              <TabsTrigger value="trends">Research Trends</TabsTrigger>
              <TabsTrigger value="authors">Top Authors</TabsTrigger>
            </TabsList>

            <TabsContent value="citations">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Citation Network</CardTitle>
                    <CardDescription>Interactive visualization of paper citations and relationships</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[500px]">
                    <CitationGraph />
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Most Cited Papers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <TopPapersChart />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Citation Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <MetricItem label="Total Papers" value="1,245" />
                        <MetricItem label="Total Citations" value="28,567" />
                        <MetricItem label="Average Citations" value="22.9" />
                        <MetricItem label="h-index" value="42" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trends">
              <Card>
                <CardHeader>
                  <CardTitle>Research Trends</CardTitle>
                  <CardDescription>Emerging topics and research areas based on publication volume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px] flex items-center justify-center text-gray-500">
                    Research trends visualization will appear here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="authors">
              <Card>
                <CardHeader>
                  <CardTitle>Top Authors</CardTitle>
                  <CardDescription>Most influential authors by citation count</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px] flex items-center justify-center text-gray-500">
                    Author analytics will appear here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </div>
  )
}

function MetricItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600 dark:text-gray-400">{label}</span>
      <span className="text-xl font-semibold">{value}</span>
    </div>
  )
}

