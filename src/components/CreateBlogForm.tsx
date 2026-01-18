import { useState } from 'react'
import { useCreateBlog } from '@/hooks/useBlogs'
import { CreateBlogInput } from '@/types/blog'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { X, Loader2 } from 'lucide-react'

interface CreateBlogFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CreateBlogForm({ open, onOpenChange }: CreateBlogFormProps) {
    const [formData, setFormData] = useState<CreateBlogInput>({
        title: '',
        author: '',
        category: [],
        description: '',
        coverImage: '',
        content: '',
    })
    const [categoryInput, setCategoryInput] = useState('')

    const { mutate: createBlog, isPending } = useCreateBlog()

    const handleAddCategory = () => {
        if (categoryInput.trim() && !formData.category.includes(categoryInput.toUpperCase())) {
            setFormData({
                ...formData,
                category: [...formData.category, categoryInput.toUpperCase()],
            })
            setCategoryInput('')
        }
    }

    const handleRemoveCategory = (cat: string) => {
        setFormData({
            ...formData,
            category: formData.category.filter((c) => c !== cat),
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title || !formData.author || !formData.description || !formData.content) {
            alert('Please fill in all required fields')
            return
        }

        createBlog(formData, {
            onSuccess: () => {
                setFormData({
                    title: '',
                    author: '',
                    category: [],
                    description: '',
                    coverImage: '',
                    content: '',
                })
                onOpenChange(false)
            },
            onError: (error) => {
                alert(`Failed to create blog: ${error.message}`)
            },
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Blog</DialogTitle>
                </DialogHeader>
                <DialogClose onClick={() => onOpenChange(false)} />

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">
                            Title <span className="text-destructive">*</span>
                        </label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter blog title"
                            required
                        />
                    </div>

                    {/* Author */}
                    <div className="space-y-2">
                        <label htmlFor="author" className="text-sm font-medium">
                            Author <span className="text-destructive">*</span>
                        </label>
                        <Input
                            id="author"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            placeholder="Enter author name"
                            required
                        />
                    </div>

                    {/* Categories */}
                    <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-medium">
                            Categories
                        </label>
                        <div className="flex gap-2">
                            <Input
                                id="category"
                                value={categoryInput}
                                onChange={(e) => setCategoryInput(e.target.value)}
                                placeholder="Add category (e.g., TECH, FINANCE)"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        handleAddCategory()
                                    }
                                }}
                            />
                            <Button type="button" onClick={handleAddCategory} variant="secondary">
                                Add
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.category.map((cat) => (
                                <Badge key={cat} className="gap-1">
                                    {cat}
                                    <X
                                        className="h-3 w-3 cursor-pointer"
                                        onClick={() => handleRemoveCategory(cat)}
                                    />
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">
                            Description <span className="text-destructive">*</span>
                        </label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Brief description of the blog"
                            rows={2}
                            required
                        />
                    </div>

                    {/* Cover Image URL */}
                    <div className="space-y-2">
                        <label htmlFor="coverImage" className="text-sm font-medium">
                            Cover Image URL
                        </label>
                        <Input
                            id="coverImage"
                            type="url"
                            value={formData.coverImage}
                            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <label htmlFor="content" className="text-sm font-medium">
                            Content <span className="text-destructive">*</span>
                        </label>
                        <Textarea
                            id="content"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Write your blog content here... Use double line breaks for new paragraphs."
                            rows={8}
                            required
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isPending ? 'Creating...' : 'Create Blog'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
