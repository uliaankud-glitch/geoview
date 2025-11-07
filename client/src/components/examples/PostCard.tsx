import { PostCard } from "../PostCard";
import urbanImage from "@assets/generated_images/Urban_inequality_satellite_view_ae811999.png";

export default function PostCardExample() {
  return (
    <div className="p-4 max-w-md">
      <PostCard
        id="urban-inequality"
        title="How satellite data reveals patterns of urban inequality"
        excerpt="Using remote sensing technology to understand socioeconomic disparities in metropolitan areas through spatial analysis."
        category="Geography"
        date="Nov 5, 2025"
        readTime="8 min read"
        image={urbanImage}
        tags={["Remote Sensing", "Urban Studies"]}
      />
    </div>
  );
}
