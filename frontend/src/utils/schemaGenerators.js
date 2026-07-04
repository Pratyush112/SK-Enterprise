const BASE_URL = 'https://www.skenterprisesluicegate.com';

/**
 * Generates structured data for an industrial product or part
 */
export const generateProductSchema = (item, type = 'product') => {
  if (!item) return null;

  const name = item.Name || item.item || 'Industrial Sluice Gate / Valve';
  const description = item.Application || `Precision-engineered ${name} manufactured by SK Enterprise in Howrah, West Bengal to IS, BS, and AWWA standards.`;
  const image = item.Image || item.image || item.product_image || `${BASE_URL}/sk-logo.png`;
  const id = item._id || item.id || 'std';
  const url = `${BASE_URL}/${type === 'product' ? 'products' : 'parts'}/${id}`;

  const additionalProperties = [];

  if (item.Standard || item.IS) {
    additionalProperties.push({
      "@type": "PropertyValue",
      "name": "Standard Compliance",
      "value": item.Standard || item.IS
    });
  }
  if (item.Water || item.Water_Head) {
    additionalProperties.push({
      "@type": "PropertyValue",
      "name": "Water Head Pressure",
      "value": item.Water || item.Water_Head
    });
  }
  if (item.Sealing) {
    additionalProperties.push({
      "@type": "PropertyValue",
      "name": "Sealing Mechanism",
      "value": item.Sealing
    });
  }
  if (item.Materials_of_construction || item.Materials || item.grade) {
    additionalProperties.push({
      "@type": "PropertyValue",
      "name": "Materials of Construction",
      "value": item.Materials_of_construction || item.Materials || item.grade
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "image": image.startsWith('http') ? image : `${BASE_URL}${image}`,
    "description": description,
    "sku": `SK-${type === 'product' ? 'SLU' : 'PRT'}-${id.toString().slice(-6).toUpperCase()}`,
    "brand": {
      "@type": "Brand",
      "name": "SK Enterprise"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "SK Enterprise",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Howrah",
        "addressRegion": "West Bengal",
        "addressCountry": "IN"
      }
    },
    "additionalProperty": additionalProperties,
    "offers": {
      "@type": "AggregateOffer",
      "url": url,
      "priceCurrency": "INR",
      "priceRange": "$$$",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "SK Enterprise"
      }
    }
  };
};

/**
 * Generates ItemList / CollectionPage schema for catalogs
 */
export const generateCatalogSchema = (items = [], title = "Products Catalog", path = "/products") => {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${title} | SK Enterprise`,
    "description": "Explore SK Enterprise's production-grade catalog of Cast Iron Sluice Gates, MS/SS Penstocks, Flap Gates, and Industrial Valves.",
    "url": `${BASE_URL}${path}`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": items.slice(0, 20).map((item, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "url": `${BASE_URL}${path}/${item._id || item.id || idx}`,
        "name": item.Name || item.item || `Industrial Valve Item ${idx + 1}`
      }))
    }
  };
};

/**
 * Generates FAQPage schema for technical engineering Q&As
 */
export const generateFAQSchema = (faqs = []) => {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question || f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer || f.a
      }
    }))
  };
};
