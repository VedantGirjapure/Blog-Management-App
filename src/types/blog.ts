export interface Blog {
    id: string
    title: string
    author: string
    category: string[]
    description: string
    date: string
    coverImage: string
    content: string
}

export interface CreateBlogInput {
    title: string
    author: string
    category: string[]
    description: string
    coverImage: string
    content: string
}
