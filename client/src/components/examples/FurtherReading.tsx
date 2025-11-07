import { FurtherReading } from "../FurtherReading";

export default function FurtherReadingExample() {
  const sampleLinks = [
    {
      title: "NASA Earth Observatory",
      description: "Explore satellite images and scientific information about our home planet",
      url: "https://earthobservatory.nasa.gov",
      type: "article" as const
    },
    {
      title: "Landsat Data Archive",
      description: "Free access to Landsat satellite imagery spanning over 50 years",
      url: "https://earthexplorer.usgs.gov",
      type: "dataset" as const
    },
    {
      title: "QGIS Geographic Information System",
      description: "Open source tool for geospatial analysis and map creation",
      url: "https://qgis.org",
      type: "tool" as const
    },
    {
      title: "Remote Sensing and GIS Course",
      description: "Free online course covering fundamentals of remote sensing technology",
      url: "https://example.com/course",
      type: "course" as const
    }
  ];

  return (
    <div className="p-4">
      <FurtherReading links={sampleLinks} />
    </div>
  );
}
