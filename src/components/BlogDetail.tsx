import { useEffect, useRef, useState } from 'react'
import { useBlog, useDeleteBlog } from '@/hooks/useBlogs'
import { Badge } from './ui/badge'
import { Skeleton } from './ui/skeleton'
import { Calendar, AlertCircle, Clock, User, Share2, ThumbsUp, Check, Trash2, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog'

interface BlogDetailProps {
    blogId: string
    onDelete?: () => void
}

export function BlogDetail({ blogId, onDelete }: BlogDetailProps) {
    const { data: blog, isLoading, error } = useBlog(blogId)
    const { mutate: deleteBlog, isPending: isDeleting } = useDeleteBlog()
    const articleRef = useRef<HTMLDivElement>(null)
    const [liked, setLiked] = useState(false)
    const [shared, setShared] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    // Smooth scroll to top when blog changes
    useEffect(() => {
        if (articleRef.current) {
            articleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [blogId])

    const handleShare = async () => {
        if (!blog) return

        const shareData = {
            title: blog.title,
            text: blog.description,
            url: window.location.href,
        }

        try {
            // Try using native Web Share API first
            if (navigator.share) {
                await navigator.share(shareData)
                setShared(true)
                setTimeout(() => setShared(false), 2000)
            } else {
                // Fallback: Copy link to clipboard
                await navigator.clipboard.writeText(window.location.href)
                setShared(true)
                setTimeout(() => setShared(false), 2000)
            }
        } catch (error) {
            // User cancelled share or error occurred
            console.log('Share cancelled or failed:', error)
        }
    }

    const handleLike = () => {
        setLiked(!liked)
    }

    const handleDelete = () => {
        setShowDeleteDialog(true)
    }

    const confirmDelete = () => {
        if (!blog) return

        deleteBlog(blogId, {
            onSuccess: () => {
                setShowDeleteDialog(false)
                onDelete?.()
            },
            onError: (error) => {
                alert(`Failed to delete blog: ${error.message}`)
                setShowDeleteDialog(false)
            },
        })
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }).format(date)
    }

    const calculateReadTime = (content: string) => {
        const wordsPerMinute = 200
        const wordCount = content.split(/\s+/).length
        const minutes = Math.ceil(wordCount / wordsPerMinute)
        return `${minutes} min read`
    }

    const categoryColors: Record<string, string> = {
        FINANCE: 'bg-blue-100 text-blue-700 border-blue-200',
        TECH: 'bg-purple-100 text-purple-700 border-purple-200',
        CAREER: 'bg-green-100 text-green-700 border-green-200',
        EDUCATION: 'bg-orange-100 text-orange-700 border-orange-200',
        REGULATIONS: 'bg-red-100 text-red-700 border-red-200',
        LIFESTYLE: 'bg-pink-100 text-pink-700 border-pink-200',
    }

    if (isLoading) {
        return (
            <div className="space-y-6 animate-pulse">
                <Skeleton className="h-64 w-full rounded-xl shimmer" />
                <Skeleton className="h-12 w-3/4 shimmer" />
                <div className="flex gap-3">
                    <Skeleton className="h-6 w-20 shimmer" />
                    <Skeleton className="h-6 w-20 shimmer" />
                </div>
                <Skeleton className="h-20 w-full shimmer" />
                <div className="space-y-3">
                    <Skeleton className="h-4 w-full shimmer" />
                    <Skeleton className="h-4 w-full shimmer" />
                    <Skeleton className="h-4 w-3/4 shimmer" />
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="mb-4 p-4 rounded-full bg-destructive/10">
                    <AlertCircle className="h-12 w-12 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Failed to load blog</h3>
                <p className="text-sm text-muted-foreground">
                    {error instanceof Error ? error.message : 'An error occurred'}
                </p>
            </div>
        )
    }

    if (!blog) {
        return null
    }

    return (
        <>
            <article ref={articleRef} className="space-y-8 animate-in fade-in duration-500">
                {/* Cover Image with gradient overlay */}
                {blog.coverImage && (
                    <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-2xl group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                        <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/1200x400/667eea/ffffff?text=Blog+Cover'
                            }}
                        />
                    </div>
                )}

                {/* Title */}
                <h1 className="text-5xl font-bold tracking-tight leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    {blog.title}
                </h1>

                {/* Metadata */}
                <div className="flex items-center gap-6 flex-wrap pb-6 border-b">
                    <div className="flex flex-wrap gap-2">
                        {blog.category.map((cat) => (
                            <Badge
                                key={cat}
                                className={cn(
                                    "text-xs font-medium border px-3 py-1",
                                    categoryColors[cat] || "bg-gray-100 text-gray-700 border-gray-200"
                                )}
                            >
                                {cat}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5 font-medium text-foreground">
                            <User className="h-4 w-4" />
                            {blog.author}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {formatDate(blog.date)}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            {calculateReadTime(blog.content)}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="relative">
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary to-accent rounded-full"></div>
                    <p className="text-xl text-muted-foreground leading-relaxed pl-6 italic">
                        {blog.description}
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                    {blog.content.split('\n\n').map((paragraph, idx) => (
                        <p
                            key={idx}
                            className="mb-6 leading-relaxed text-foreground/90"
                            style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Social Actions */}
                <div className="flex items-center gap-3 pt-6 border-t">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLike}
                        className={cn(
                            "gap-2 transition-all duration-300",
                            liked && "bg-red-50 border-red-300 text-red-600 hover:bg-red-100 hover:text-red-700"
                        )}
                    >
                        <ThumbsUp className={cn(
                            "h-4 w-4 transition-all duration-300",
                            liked && "fill-current"
                        )} />
                        {liked ? "Liked" : "Like"}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShare}
                        className="gap-2 transition-all duration-300"
                    >
                        {shared ? (
                            <>
                                <Check className="h-4 w-4 text-green-600" />
                                <span className="text-green-600">Shared!</span>
                            </>
                        ) : (
                            <>
                                <Share2 className="h-4 w-4" />
                                Share
                            </>
                        )}
                    </Button>
                    <div className="flex-1" />
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-300"
                    >
                        <Trash2 className="h-4 w-4" />
                        {isDeleting ? 'Deleting...' : 'Delete Blog'}
                    </Button>
                </div>
            </article>

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                                <AlertTriangle className="h-6 w-6 text-destructive" />
                            </div>
                            <DialogTitle className="text-xl">Delete Blog Post?</DialogTitle>
                        </div>
                        <DialogDescription className="text-base pt-2">
                            Are you sure you want to delete <span className="font-semibold text-foreground">"{blog?.title}"</span>?
                            This action cannot be undone and will permanently remove this blog post.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0 mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setShowDeleteDialog(false)}
                            disabled={isDeleting}
                            className="sm:mr-2"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={isDeleting}
                            className="gap-2"
                        >
                            {isDeleting ? (
                                <>
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
