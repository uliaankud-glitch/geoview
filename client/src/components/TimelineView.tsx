import { posts, TopicCategory } from "@/lib/posts";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";

const topicColors: Record<TopicCategory, string> = {
  environment: "#10b981",
  economics: "#f59e0b",
  sociology: "#8b5cf6",
  psychology: "#ec4899",
  history: "#6366f1",
  technology: "#06b6d4"
};

const sparklineCache = new Map<string, number[]>();

const generateSparklineData = (postId: string, start: number, end?: number): number[] => {
  if (sparklineCache.has(postId)) {
    return sparklineCache.get(postId)!;
  }
  const yearSpan = (end || new Date().getFullYear()) - start;
  const points = Math.min(Math.max(yearSpan / 5, 5), 12);
  const data = Array.from({ length: points }, () => Math.random() * 100);
  sparklineCache.set(postId, data);
  return data;
};

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="w-full h-12" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        opacity="0.6"
      />
      <polyline
        points={`0,100 ${points} 100,100`}
        fill={color}
        opacity="0.1"
      />
    </svg>
  );
}

export function TimelineView() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const sortedPosts = [...posts]
    .filter(post => post.timePeriod)
    .sort((a, b) => (a.timePeriod?.start || 0) - (b.timePeriod?.start || 0));

  const timelineYears = sortedPosts.map(p => p.timePeriod?.start || 0);
  const minYear = Math.min(...timelineYears);
  const maxYear = Math.max(...timelineYears);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(progress);

      const centerX = scrollLeft + clientWidth / 2;

      cardRefs.current.forEach((card, postId) => {
        const rect = card.getBoundingClientRect();
        const scrollRect = scrollRef.current!.getBoundingClientRect();
        const cardCenter = rect.left - scrollRect.left + scrollLeft + rect.width / 2;
        const distance = Math.abs(centerX - cardCenter);
        
        if (distance < clientWidth / 3) {
          const post = sortedPosts.find(p => p.id === postId);
          if (post?.timePeriod?.start) {
            setActiveYear(post.timePeriod.start);
          }
        }
      });
    };

    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => scrollEl.removeEventListener('scroll', handleScroll);
    }
  }, [sortedPosts]);

  const jumpToSection = (index: number) => {
    const card = Array.from(cardRefs.current.values())[index];
    if (card && scrollRef.current) {
      const scrollRect = scrollRef.current.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const scrollLeft = card.offsetLeft - (scrollRect.width / 2) + (cardRect.width / 2);
      scrollRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-slate-50 dark:bg-[#1A1A1A]">
      {/* Subtle depth gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100/40 via-transparent to-slate-200/30 dark:from-transparent dark:via-transparent dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 dark:to-black/20" />
      </div>
      
      {/* Floating date counter */}
      {activeYear && (
        <div 
          className="fixed top-24 right-8 z-50 bg-white/95 dark:bg-[#222222] backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-lg px-6 py-4"
          style={{
            animation: 'fadeIn 0.3s ease-in-out',
            boxShadow: 'none'
          }}
          data-testid="floating-date-counter"
        >
          <div className="text-xs text-slate-600 dark:text-[#9CA3AF] mb-1 uppercase tracking-wider">Current Period</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-[#F3F4F6]">{activeYear}</div>
        </div>
      )}

      <div ref={scrollRef} className="relative overflow-x-auto pb-12 pt-8 scrollbar-thin">
        <div className="flex gap-8 min-w-max px-8 relative">
          {/* Timeline connector line */}
          <svg 
            className="absolute top-12 left-0 w-full h-2 pointer-events-none"
            style={{ minWidth: '100%' }}
          >
            <defs>
              <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#cbd5e1', stopOpacity: 0.3 }} className="dark:hidden" />
                <stop offset="100%" style={{ stopColor: '#334155', stopOpacity: 0.8 }} className="dark:hidden" />
                <stop offset="0%" style={{ stopColor: '#4B5563', stopOpacity: 0.4 }} className="hidden dark:inline" />
                <stop offset="100%" style={{ stopColor: '#9CA3AF', stopOpacity: 0.6 }} className="hidden dark:inline" />
              </linearGradient>
              <filter id="timelineGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <line
              x1="0"
              y1="1"
              x2="100%"
              y2="1"
              stroke="url(#timelineGradient)"
              strokeWidth="2"
              strokeDasharray="8,4"
              filter="url(#timelineGlow)"
            />
          </svg>

          {sortedPosts.map((post, index) => {
            const topicColor = post.topicCategory ? topicColors[post.topicCategory] : topicColors.technology;
            const isOlder = index < sortedPosts.length / 2;
            const depthOpacity = isOlder ? 0.7 : 1;
            const shadowStrength = isOlder ? 'shadow-sm' : 'shadow-lg';
            const sparklineData = generateSparklineData(
              post.id,
              post.timePeriod?.start || 2000,
              post.timePeriod?.end
            );

            return (
              <div 
                key={post.id} 
                className="relative"
                ref={(el) => {
                  if (el) cardRefs.current.set(post.id, el);
                }}
              >
                <div className="flex flex-col items-center w-96" style={{ opacity: depthOpacity }}>
                  {/* Year node */}
                  <div 
                    className="flex items-center justify-center w-20 h-20 rounded-full bg-white dark:bg-[#222222] border-2 z-10 transition-all duration-300"
                    style={{
                      borderColor: topicColor,
                      transform: activeYear === post.timePeriod?.start ? 'scale(1.15)' : 'scale(1)',
                      boxShadow: activeYear === post.timePeriod?.start 
                        ? `0 0 24px ${topicColor}60, 0 0 12px ${topicColor}30` 
                        : `0 0 8px ${topicColor}20`
                    }}
                  >
                    <div className="text-center">
                      <div className="text-xs font-semibold text-slate-700 dark:text-[#E5E7EB]">
                        {post.timePeriod?.start}
                      </div>
                      {post.timePeriod?.end && (
                        <div className="text-[10px] text-slate-600 dark:text-[#9CA3AF]">
                          -{post.timePeriod.end}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Connector to card */}
                  <svg className="w-1 h-8" viewBox="0 0 4 32">
                    <line
                      x1="2"
                      y1="0"
                      x2="2"
                      y2="32"
                      stroke={topicColor}
                      strokeWidth="2"
                      strokeDasharray="4,2"
                      opacity="0.4"
                    />
                  </svg>
                  
                  <Link href={`/post/${post.id}`}>
                    <Card 
                      className={`w-96 h-[480px] flex flex-col hover-elevate cursor-pointer overflow-hidden transition-all duration-300 bg-white dark:bg-[#222222] border border-slate-200 dark:border-slate-700/30`}
                      data-testid={`timeline-post-${post.id}`}
                      style={{
                        borderTop: `2px solid ${topicColor}`,
                        boxShadow: `0 4px 16px rgba(0, 0, 0, 0.1), 0 0 24px ${topicColor}15`
                      }}
                    >
                      {/* Category color strip */}
                      <div 
                        className="h-1 w-full" 
                        style={{ backgroundColor: topicColor }}
                      />

                      <div className="h-40 w-full overflow-hidden relative flex-shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover"
                        />
                        {/* Mini sparkline overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                          <Sparkline data={sparklineData} color="#ffffff" />
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <div className="mb-3 flex items-center gap-2 flex-wrap">
                          <Badge 
                            variant="secondary" 
                            className="text-xs"
                            style={{
                              backgroundColor: `${topicColor}15`,
                              color: topicColor,
                              borderColor: `${topicColor}30`
                            }}
                          >
                            {post.category}
                          </Badge>
                          {post.timePeriod && (
                            <Badge variant="outline" className="text-xs">
                              {post.timePeriod.era}
                            </Badge>
                          )}
                        </div>

                        <h3 className="font-semibold mb-2 leading-tight text-base text-slate-900 dark:text-[#F3F4F6] line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-sm mb-4 line-clamp-3 text-slate-600 dark:text-[#D1D5DB] flex-1">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-[#9CA3AF] mt-auto">
                          {post.geoLocation && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{post.geoLocation.name}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>

                {/* Curved connector between cards */}
                {index < sortedPosts.length - 1 && (
                  <svg 
                    className="absolute top-12 left-full w-8 h-4 pointer-events-none"
                    style={{ zIndex: 5 }}
                  >
                    <defs>
                      <filter id={`connectorGlow-${index}`}>
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <path
                      d="M 0 2 Q 16 2 32 2"
                      fill="none"
                      stroke={topicColor}
                      strokeWidth="2"
                      strokeDasharray="4,3"
                      opacity="0.5"
                      filter={`url(#connectorGlow-${index})`}
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mini overview bar */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-white/95 dark:bg-[#222222]/95 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-full px-4 py-2 flex items-center gap-2"
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
        >
          {sortedPosts.map((post, index) => {
            const topicColor = post.topicCategory ? topicColors[post.topicCategory] : topicColors.technology;
            const isActive = activeYear === post.timePeriod?.start;
            
            return (
              <button
                key={post.id}
                onClick={() => jumpToSection(index)}
                className="group relative transition-all duration-200"
                style={{
                  width: isActive ? '32px' : '8px',
                  height: '8px',
                  backgroundColor: isActive ? topicColor : '#cbd5e1',
                  borderRadius: '4px',
                  opacity: isActive ? 1 : 0.5
                }}
                title={`${post.timePeriod?.start} - ${post.timePeriod?.era}`}
                aria-label={`Jump to ${post.timePeriod?.start} - ${post.timePeriod?.era}`}
                data-testid={`overview-dot-${index}`}
              >
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {post.timePeriod?.start}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: hsl(var(--muted));
          border-radius: 4px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: hsl(var(--muted-foreground) / 0.3);
          border-radius: 4px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--muted-foreground) / 0.5);
        }
      `}</style>
    </div>
  );
}
