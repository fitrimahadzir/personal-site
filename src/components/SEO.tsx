import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  name?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title = 'Fitri Mahadzir | Graphic Designer & Web Developer',
  description = 'Portfolio of Fitri Mahadzir, a Graphic Designer and Web Developer focused on crafting strong visuals, engaging digital experiences, and modern frontend development.',
  type = 'website',
  name = 'Fitri Mahadzir',
  image = 'https://fitrimahadzir.my/assets/profile.webp',
  url = 'https://fitrimahadzir.my',
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Facebook / Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
