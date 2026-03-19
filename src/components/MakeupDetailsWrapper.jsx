import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import MakeupDetails from "./MakeupDetails";

const MakeupDetailsWrapper = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/makeup.json")
      .then((res) => res.json())
      .then((json) => {
        const found = json.data.find((p) => p.slug === slug);
        setProduct(found);
        setLoading(false);
      });
  }, [slug]);

  if (loading)
    return (
      <div className="pt-32 text-center h-screen">
        Loading Makeup Details...
      </div>
    );
  if (!product)
    return (
      <div className="pt-32 text-center h-screen text-red-500">
        Makeup Product Not Found!
      </div>
    );

  return <MakeupDetails product={product} />;
};

export default MakeupDetailsWrapper;
