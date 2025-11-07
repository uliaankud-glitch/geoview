import { useRoute, Link } from "wouter";
import { getPostById } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { DataVisualization } from "@/components/DataVisualization";
import { InteractiveMap } from "@/components/InteractiveMap";
import { ReadingProgress } from "@/components/ReadingProgress";
import { References } from "@/components/References";
import { FurtherReading } from "@/components/FurtherReading";
import { ThenNowSwipe } from "@/components/ThenNowSwipe";
import { SplitLensExplorer } from "@/components/SplitLensExplorer";

export default function Post() {
  const [, params] = useRoute("/post/:id");
  const post = params?.id ? getPostById(params.id) : undefined;

  if (!post) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="mb-4 text-4xl font-bold">Post not found</h1>
        <Link href="/">
          <a>
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ReadingProgress />
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background" />
      </div>

      <article className="container mx-auto max-w-4xl px-4 -mt-32 relative z-10">
        <div className="mb-8">
          <Link href="/">
            <Button variant="secondary" size="sm" className="mb-6 backdrop-blur-sm bg-background/80" data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="default" data-testid="badge-category">
              {post.category}
            </Badge>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl" data-testid="text-post-title">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <span className="font-medium text-foreground">{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none font-serif" data-testid="content-post">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {post.id === "urban-inequality" && (
          <div className="my-16">
            <DataVisualization postId={post.id} />
          </div>
        )}

        {post.id === "trade-routes" && (
          <div className="my-16">
            <InteractiveMap postId={post.id} />
          </div>
        )}

        {post.beforeAfter && (
          <ThenNowSwipe data={post.beforeAfter} />
        )}

        {post.splitLens && (
          <SplitLensExplorer postId={post.id} />
        )}

        {post.references && post.references.length > 0 && (
          <References references={post.references} />
        )}

        {post.furtherReading && post.furtherReading.length > 0 && (
          <FurtherReading links={post.furtherReading} />
        )}
      </article>
    </div>
  );
}
