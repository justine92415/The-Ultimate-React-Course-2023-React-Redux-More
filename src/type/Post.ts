export interface Post {
  title: string;
  body: string;
}

export interface PostContextValue {
  posts: Post[];
  onAddPost: (p: Post) => void;
  onClearPosts: () => void;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
}
