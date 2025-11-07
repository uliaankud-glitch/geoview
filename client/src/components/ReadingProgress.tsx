import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = (scrollTop / documentHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercentage)));
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-150"
          style={{ width: `${progress}%` }}
          data-testid="progress-bar"
        />
      </div>
      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex items-center gap-2 rounded-full bg-card border px-4 py-2 text-sm shadow-lg">
          <span className="text-muted-foreground">Read:</span>
          <span className="font-semibold" data-testid="text-progress-percentage">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </>
  );
}
