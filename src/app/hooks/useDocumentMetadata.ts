import { useEffect } from "react";

interface MetadataOptions {
  image?: string;
  type?: string;
  keywords?: string;
  canonical?: string;
  robots?: string;
  publisher?: string;
}

export function useDocumentMetadata(title: string, description: string, options?: MetadataOptions) {
  useEffect(() => {
    if (title) {
      document.title = title;
      
      // Update OG Title
      let ogTitle = document.querySelector("meta[property='og:title']");
      if (ogTitle) {
        ogTitle.setAttribute("content", title);
      } else {
        ogTitle = document.createElement("meta");
        ogTitle.setAttribute("property", "og:title");
        ogTitle.setAttribute("content", title);
        document.head.appendChild(ogTitle);
      }
    }

    if (description) {
      // Update standard description
      let metaDescription = document.querySelector("meta[name='description']");
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      } else {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        metaDescription.setAttribute("content", description);
        document.head.appendChild(metaDescription);
      }

      // Update OG Description
      let ogDescription = document.querySelector("meta[property='og:description']");
      if (ogDescription) {
        ogDescription.setAttribute("content", description);
      } else {
        ogDescription = document.createElement("meta");
        ogDescription.setAttribute("property", "og:description");
        ogDescription.setAttribute("content", description);
        document.head.appendChild(ogDescription);
      }
    }

    // Update standard Keywords meta
    if (options?.keywords) {
      let metaKeywords = document.querySelector("meta[name='keywords']");
      if (metaKeywords) {
        metaKeywords.setAttribute("content", options.keywords);
      } else {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        metaKeywords.setAttribute("content", options.keywords);
        document.head.appendChild(metaKeywords);
      }
    }

    // Update OG Image
    if (options?.image) {
      let ogImage = document.querySelector("meta[property='og:image']");
      if (ogImage) {
        ogImage.setAttribute("content", options.image);
      } else {
        ogImage = document.createElement("meta");
        ogImage.setAttribute("property", "og:image");
        ogImage.setAttribute("content", options.image);
        document.head.appendChild(ogImage);
      }
    }

    // Update OG Type
    const type = options?.type || "website";
    let ogType = document.querySelector("meta[property='og:type']");
    if (ogType) {
      ogType.setAttribute("content", type);
    } else {
      ogType = document.createElement("meta");
      ogType.setAttribute("property", "og:type");
      ogType.setAttribute("content", type);
      document.head.appendChild(ogType);
    }

    // Update Robots Tag
    const robots = options?.robots || "index, follow";
    let metaRobots = document.querySelector("meta[name='robots']");
    if (metaRobots) {
      metaRobots.setAttribute("content", robots);
    } else {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      metaRobots.setAttribute("content", robots);
      document.head.appendChild(metaRobots);
    }

    // Update Publisher Tag
    const publisher = options?.publisher || "WeBuildReach";
    let metaPublisher = document.querySelector("meta[name='publisher']");
    if (metaPublisher) {
      metaPublisher.setAttribute("content", publisher);
    } else {
      metaPublisher = document.createElement("meta");
      metaPublisher.setAttribute("name", "publisher");
      metaPublisher.setAttribute("content", publisher);
      document.head.appendChild(metaPublisher);
    }

    // Update Canonical Link Tag
    const canonical = options?.canonical || (typeof window !== "undefined" ? window.location.origin + window.location.pathname : "");
    if (canonical) {
      let linkCanonical = document.querySelector("link[rel='canonical']");
      if (linkCanonical) {
        linkCanonical.setAttribute("href", canonical);
      } else {
        linkCanonical = document.createElement("link");
        linkCanonical.setAttribute("rel", "canonical");
        linkCanonical.setAttribute("href", canonical);
        document.head.appendChild(linkCanonical);
      }
    }

    // Ensure HTML lang attribute is set
    if (typeof document !== "undefined" && document.documentElement) {
      document.documentElement.setAttribute("lang", "en");
    }
  }, [title, description, options?.image, options?.type, options?.keywords, options?.canonical, options?.robots, options?.publisher]);
}
