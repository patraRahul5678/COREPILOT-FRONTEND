import React, { useEffect } from 'react';

export default function PageMeta({ date, title, description, image, url }) {
  const iso = date ? new Date(date).toISOString() : new Date().toISOString();
  const human = new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    // last-updated meta
    let meta = document.querySelector('meta[name="last-updated"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'last-updated';
      document.head.appendChild(meta);
    }
    meta.content = iso;

    // title
    if (title) {
      document.title = `${title} · CorePilot`;
    }

    // Provide reasonable defaults for common meta tags (description, open graph, twitter)
    const defaults = {
      description: 'CorePilot — AI-powered engineering copilots for PRs, tickets and decisions.',
      image: '/corepilot.png',
      url: window.location.href,
    };

    const setMeta = (attrName, value, attr = 'name') => {
      if (!value) return;
      let node = document.querySelector(`meta[${attr}="${attrName}"]`);
      if (!node) {
        node = document.createElement('meta');
        node.setAttribute(attr, attrName);
        document.head.appendChild(node);
      }
      node.content = value;
    };

    // description: priority — passed prop -> existing meta -> default
    const existingDesc = document.querySelector('meta[name="description"]')?.content;
    const desc = description || existingDesc || defaults.description;
    setMeta('description', desc);

    // Open Graph
    const resolvedImage = (image || defaults.image);
    const absoluteImage = resolvedImage.startsWith('/') ? `${window.location.origin}${resolvedImage}` : resolvedImage;
    setMeta('og:title', title ? `${title} · CorePilot` : 'CorePilot', 'property');
    setMeta('og:description', desc, 'property');
    setMeta('og:image', absoluteImage, 'property');
    setMeta('og:url', url || defaults.url, 'property');

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title ? `${title} · CorePilot` : 'CorePilot');
    setMeta('twitter:description', desc);
    setMeta('twitter:image', absoluteImage);

    // Favicon: load image, crop transparent padding and scale up to make the visible logo fill the favicon.
    if (absoluteImage) {
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = absoluteImage;
        img.onload = () => {
          try {
            const w = img.naturalWidth;
            const h = img.naturalHeight;
            const tmp = document.createElement('canvas');
            tmp.width = w;
            tmp.height = h;
            const tctx = tmp.getContext('2d');
            tctx.drawImage(img, 0, 0, w, h);
            const data = tctx.getImageData(0, 0, w, h).data;
            // find bounding box of non-transparent pixels
            let minX = w, minY = h, maxX = 0, maxY = 0;
            for (let y = 0; y < h; y++) {
              for (let x = 0; x < w; x++) {
                const a = data[(y * w + x) * 4 + 3];
                if (a > 16) { // visible pixel
                  if (x < minX) minX = x;
                  if (y < minY) minY = y;
                  if (x > maxX) maxX = x;
                  if (y > maxY) maxY = y;
                }
              }
            }
            // if no visible pixels found, fallback to original image
            if (minX > maxX || minY > maxY) {
              setFavicon(absoluteImage);
              return;
            }

            const pad = Math.max(4, Math.floor(Math.min(w, h) * 0.05));
            minX = Math.max(0, minX - pad);
            minY = Math.max(0, minY - pad);
            maxX = Math.min(w - 1, maxX + pad);
            maxY = Math.min(h - 1, maxY + pad);

            const cropW = maxX - minX + 1;
            const cropH = maxY - minY + 1;

            // create canvas for favicon at 128x128 (sufficient for high-DPI)
            const size = 128;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            // fill transparent background
            ctx.clearRect(0, 0, size, size);
            // compute scale to cover as much area as possible while preserving aspect
            const scale = Math.min(size / cropW, size / cropH) * 0.98;
            const drawW = cropW * scale;
            const drawH = cropH * scale;
            const dx = (size - drawW) / 2;
            const dy = (size - drawH) / 2;
            ctx.drawImage(tmp, minX, minY, cropW, cropH, dx, dy, drawW, drawH);

            const dataUrl = canvas.toDataURL('image/png');
            setFavicon(dataUrl);
          } catch (err) {
            // fallback to absoluteImage
            setFavicon(absoluteImage);
          }
        };
        img.onerror = () => setFavicon(absoluteImage);

        function setFavicon(href) {
          let link = document.querySelector('link[rel="icon"]');
          if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
          }
          link.href = href;
        }
      } catch (e) {
        // ignore and use absoluteImage directly
        let link = document.querySelector('link[rel="icon"]');
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.head.appendChild(link);
        }
        link.href = absoluteImage;
      }
    }

    return () => {
      // keep meta as latest (do not remove)
    };
  }, [iso, title, description, image, url]);
  // Do not render visible UI — only update meta and title. Keep visual labels out of the frontend.
  return null;
}
