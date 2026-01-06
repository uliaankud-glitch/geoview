import ReactMarkdown from "react-markdown";
import { FramedImage } from "@/components/FramedImage";
import { Post } from "../lib/posts.ts";



interface PostRendererProps {
  post: Post;
}

/**
 * Renders Markdown post content with custom components.
 * All <img> tags become framed image cards.
 */
export function PostRenderer({ post }: PostRendererProps) {
  return (
    <ReactMarkdown
      components={{
        img: ({ node, ...props }) => (
          <FramedImage
            src={props.src ?? ""}
            alt={props.alt ?? ""}
            caption={props.alt ?? ""}
            title={post.imageMeta?.title ?? "Visualization"}
            subtitle={post.imageMeta?.subtitle ?? "Satellite-derived data analysis"}
          />
        ),
        p: ({ node, children }) => (
          <p className="mb-6 leading-relaxed">{children}</p>
        ),
        h2: ({ node, children }) => (
          <h2 className="text-2xl font-semibold mt-10 mb-4">{children}</h2>
        ),
        h3: ({ node, children }) => (
          <h3 className="text-xl font-semibold mt-8 mb-3">{children}</h3>
        ),
      }}
    >
      {post.content}
    </ReactMarkdown>
  );
}
