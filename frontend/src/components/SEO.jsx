import React from 'react';
import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://www.skenterprisesluicegate.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/sk-logo.png`;

export default function SEO({ title, description, name, type = 'website', image, url, schema }) {
  const ogImage = image || DEFAULT_OG_IMAGE;
  const absoluteUrl = url 
    ? (url.startsWith('http') ? url : `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`) 
    : BASE_URL;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      
      {/* Facebook / Open Graph tags */}
      <meta property='og:type' content={type} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={ogImage} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:image:type' content='image/png' />
      <meta property='og:url' content={absoluteUrl} />
      
      {/* Twitter tags */}
      <meta name='twitter:creator' content={name || 'SK Enterprise'} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={ogImage} />
      
      {/* Canonical URL setup */}
      <link rel="canonical" href={absoluteUrl} />

      {/* Dynamic JSON-LD Schema injection */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
