import { References } from "../References";

export default function ReferencesExample() {
  const sampleReferences = [
    {
      id: 1,
      authors: "Smith, J., & Johnson, M.",
      year: 2024,
      title: "Remote Sensing Applications in Urban Planning",
      publication: "Journal of Geographic Information Science, 45(2), 123-145",
      url: "https://example.com/paper1"
    },
    {
      id: 2,
      authors: "Chen, L., Wang, X., & Lee, K.",
      year: 2023,
      title: "Satellite Data Analysis for Climate Pattern Detection",
      publication: "Environmental Remote Sensing Review, 12(4), 567-589"
    },
    {
      id: 3,
      authors: "Rodriguez, A.",
      year: 2024,
      title: "Machine Learning in Geospatial Analysis",
      publication: "Computational Geography Quarterly, 8(1), 23-47",
      url: "https://example.com/paper3"
    }
  ];

  return (
    <div className="p-4">
      <References references={sampleReferences} />
    </div>
  );
}
