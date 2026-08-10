import Script from "next/script";

interface LocalSchemaProps {
  businessName: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone: string;
  logoUrl: string;
  openingHours: string[]; // e.g., ["Mo-Fr 09:00-17:00"]
  url?: string;
}

export function LocalSchema({ 
  businessName, 
  address, 
  telephone, 
  logoUrl, 
  openingHours,
  url = "https://www.brollam.com"
}: LocalSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": businessName,
    "image": logoUrl,
    "url": url,
    "telephone": telephone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      "postalCode": address.postalCode,
      "addressCountry": address.addressCountry
    },
    "openingHoursSpecification": openingHours.map(hours => {
      // Basic parsing assuming format like "Mo-Fr 09:00-17:00"
      const [days, time] = hours.split(' ');
      const [opens, closes] = time ? time.split('-') : ["", ""];
      
      return {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": days.split('-').map(d => `https://schema.org/${d}`),
        "opens": opens,
        "closes": closes
      };
    })
  };

  return (
    <Script
      id="local-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
