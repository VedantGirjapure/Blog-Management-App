import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Header } from '@/components/Header'
import { BlogList } from '@/components/BlogList'
import { BlogDetail } from '@/components/BlogDetail'
import { CreateBlogForm } from '@/components/CreateBlogForm'
import { Footer } from '@/components/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'
import type { Blog } from '@/types/blog'
import { FileText, Sparkles } from 'lucide-react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
})

function BlogApp() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onCreateClick={() => setIsCreateDialogOpen(true)} />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-background border-b overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        <div className="container mx-auto px-6 py-12 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Professional Blog Platform
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Insights for <span className="gradient-text">Chartered Accountants</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Stay updated with career growth, industry news, and professional development
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-12 flex-1 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Left Panel - Blog List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold">Latest Articles</h2>
            </div>
            <div className="min-h-[600px] max-h-[800px] overflow-y-auto pr-2 space-y-4 custom-scrollbar smooth-scroll">
              <BlogList
                selectedBlogId={selectedBlog?.id || null}
                onSelectBlog={setSelectedBlog}
              />
            </div>
          </div>

          {/* Right Panel - Blog Detail */}
          <div className="lg:col-span-5">
            {selectedBlog ? (
              <div className="min-h-[600px] max-h-[800px] overflow-y-auto pr-4 custom-scrollbar smooth-scroll">
                <BlogDetail blogId={selectedBlog.id} onDelete={() => setSelectedBlog(null)} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[600px] text-center p-12 rounded-2xl border-2 border-dashed bg-gradient-to-br from-muted/50 to-background">
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-full">
                    <FileText className="h-16 w-16 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">No Article Selected</h3>
                <p className="text-muted-foreground max-w-md text-lg">
                  Choose an article from the list to read its full content, or create a new article to get started.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />

      {/* Create Blog Dialog */}
      <CreateBlogForm
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogApp />
    </QueryClientProvider>
  )
}

export default App
