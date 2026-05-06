import React from 'react';
import { Helmet } from 'react-helmet-async';

const DEFAULT_OG_IMAGE = 'https://www.skenterprize.com/sk-logo.png';

export default function SEO({ title, description, name, type, image, url }) {
  const ogImage = image || DEFAULT_OG_IMAGE;
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      
      {/* End standard metadata tags */}
      
      {/* Facebook tags */}
      <meta property='og:type' content={type} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={ogImage} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:image:type' content='image/png' />
      {url && <meta property='og:url' content={url} />}
      {/* End Facebook tags */}
      
      {/* Twitter tags */}
      <meta name='twitter:creator' content={name} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={ogImage} />
      {/* End Twitter tags */}
      
      {/* Canonical URL setup */}
      {url && <link rel="canonical" href={url} />}
    </Helmet>
  );
}
