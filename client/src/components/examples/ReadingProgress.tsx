import { ReadingProgress } from "../ReadingProgress";

export default function ReadingProgressExample() {
  return (
    <div>
      <ReadingProgress />
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">Sample Article</h1>
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} className="mb-4 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        ))}
      </div>
    </div>
  );
}
