import { CategoryNav } from "../CategoryNav";
import { useState } from "react";

export default function CategoryNavExample() {
  const [selected, setSelected] = useState("All");
  
  return (
    <div className="p-4">
      <CategoryNav selectedCategory={selected} onCategoryChange={setSelected} />
    </div>
  );
}
