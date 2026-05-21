export interface SeoChecklistItem {
  id: string;
  text: string;
  status: "success" | "warning" | "error";
  detail: string;
}

export interface TableOfContentItem {
  text: string;
  level: number;
  id: string;
}

export interface SeoAnalysisResult {
  seoScore: number;
  readabilityScore: number;
  wordCount: number;
  fleschScore: number;
  characterCounts: {
    title: number;
    description: number;
  };
  seoChecklist: SeoChecklistItem[];
  readabilityChecklist: SeoChecklistItem[];
  tableOfContents: TableOfContentItem[];
}

export function extractSeoMetadata(content: string) {
  const defaultMeta = {
    rating_value: 4.8,
    rating_count: 125,
    focus_keyword: "",
    robots_meta: {
      index: true,
      follow: true,
      noarchive: false
    },
    custom_canonical: "",
    faqs: [] as { q: string; a: string }[]
  };

  if (!content) return { cleanContent: "", metadata: defaultMeta };

  const regex = /<script type="application\/json" id="web-build-reach-seo-metadata">([\s\S]*?)<\/script>/;
  const match = content.match(regex);

  if (match && match[1]) {
    try {
      const metadata = JSON.parse(match[1].trim());
      const cleanContent = content.replace(regex, "").trim();
      return {
        cleanContent,
        metadata: { ...defaultMeta, ...metadata }
      };
    } catch (e) {
      console.error("Error parsing SEO metadata", e);
    }
  }

  return { cleanContent: content, metadata: defaultMeta };
}

export function injectSeoMetadata(content: string, metadata: any) {
  const regex = /<script type="application\/json" id="web-build-reach-seo-metadata">([\s\S]*?)<\/script>/g;
  const cleanContent = content.replace(regex, "").trim();
  
  const scriptTag = `<script type="application/json" id="web-build-reach-seo-metadata">\n${JSON.stringify(metadata, null, 2)}\n</script>`;
  return `${cleanContent}\n${scriptTag}`;
}

// Syllable counter for Flesch Reading Ease
function countSyllablesInWord(word: string): number {
  word = word.toLowerCase().trim();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const syl = word.match(/[aeiouy]{1,2}/g);
  return syl ? syl.length : 1;
}

// Clean slug conversion
export function autoGenerateSlug(title: string): string {
  const stopWords = new Set([
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as", "at", 
    "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can", "did", "do", 
    "does", "doing", "for", "from", "further", "had", "has", "have", "having", "he", "her", "here", "him", 
    "his", "how", "i", "if", "in", "into", "is", "it", "its", "me", "more", "most", "my", "no", "nor", "not", 
    "of", "off", "on", "once", "only", "or", "other", "our", "out", "over", "own", "same", "she", "should", 
    "so", "some", "such", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", 
    "those", "through", "to", "too", "under", "until", "up", "very", "was", "we", "were", "what", "when", 
    "where", "which", "while", "who", "whom", "why", "with", "you", "your", "yours"
  ]);

  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .trim()
    .split(/\s+/)
    .filter(word => !stopWords.has(word))
    .join("-")
    .replace(/-+/g, "-");
}

export function analyzeSeo(params: {
  title: string;
  seoTitle: string;
  description: string;
  contentHtml: string;
  metaKeywords: string;
  slug: string;
  imageUrl?: string;
  imageAlt?: string;
}): SeoAnalysisResult {
  const { title, seoTitle, description, contentHtml, metaKeywords, slug, imageUrl, imageAlt } = params;
  
  const seoChecklist: SeoChecklistItem[] = [];
  const readabilityChecklist: SeoChecklistItem[] = [];
  const tableOfContents: TableOfContentItem[] = [];

  let seoScore = 100;
  let readabilityScore = 100;

  const keywordsList = metaKeywords
    ? metaKeywords.split(",").map(k => k.trim().toLowerCase()).filter(k => k.length > 0)
    : [];

  // 1. Text extraction & structural nodes
  let plainText = "";
  let h1sCount = 0;
  const h2s: string[] = [];
  const h3s: string[] = [];
  let imageCount = 0;
  let missingAlts = 0;
  let hasKeywordInAlts = false;
  let outboundCount = 0;
  let internalCount = 0;
  const paragraphs: string[] = [];

  if (contentHtml) {
    if (typeof window !== "undefined" && window.document) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(contentHtml, "text/html");
      plainText = doc.body.textContent || doc.body.innerText || "";
      
      h1sCount = doc.querySelectorAll("h1").length;
      
      // Parse headings for TOC & analyses
      doc.querySelectorAll("h2, h3").forEach((heading, idx) => {
        const text = heading.textContent || "";
        const tag = heading.tagName.toLowerCase();
        const level = tag === "h2" ? 2 : 3;
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `heading-${idx}`;
        
        tableOfContents.push({ text, level, id });
        
        if (tag === "h2") h2s.push(text.toLowerCase());
        if (tag === "h3") h3s.push(text.toLowerCase());
      });

      // Images
      const images = doc.querySelectorAll("img");
      imageCount = images.length;
      if (imageUrl) {
        imageCount += 1;
        if (!imageAlt || !imageAlt.trim()) {
          missingAlts++;
        } else if (keywordsList.length > 0) {
          const coverAltLower = imageAlt.toLowerCase();
          const matchesAny = keywordsList.some(k => coverAltLower.includes(k));
          if (matchesAny) {
            hasKeywordInAlts = true;
          }
        }
      }
      images.forEach(img => {
        const alt = img.getAttribute("alt") || "";
        if (!alt.trim()) {
          missingAlts++;
        } else if (keywordsList.length > 0) {
          const altLower = alt.toLowerCase();
          const matchesAny = keywordsList.some(k => altLower.includes(k));
          if (matchesAny) {
            hasKeywordInAlts = true;
          }
        }
      });

      // Links
      const links = doc.querySelectorAll("a");
      links.forEach(link => {
        const href = link.getAttribute("href") || "";
        if (href.startsWith("http") && !href.includes("webuildreach.com")) {
          outboundCount++;
        } else if (href.startsWith("/") || href.includes("webuildreach.com")) {
          internalCount++;
        }
      });

      // Paragraphs
      doc.querySelectorAll("p").forEach(p => {
        const txt = (p.textContent || "").trim();
        if (txt) paragraphs.push(txt);
      });
    } else {
      // Fallback
      plainText = contentHtml.replace(/<[^>]*>/g, " ");
      h1sCount = (contentHtml.match(/<h1/g) || []).length;
      imageCount = (contentHtml.match(/<img/g) || []).length;
      if (imageUrl) {
        imageCount += 1;
      }
    }
  }

  const words = plainText.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  // Enhance sentence count estimation for lists, headings, and paragraph blocks
  let textForSentences = plainText;
  if (contentHtml && typeof window !== "undefined" && window.document) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(contentHtml, "text/html");
    doc.querySelectorAll("h1, h2, h3, p, li, div").forEach(el => {
      const text = (el.textContent || "").trim();
      if (text && !text.match(/[.!?]$/)) {
        el.textContent = text + ".";
      }
    });
    textForSentences = doc.body.textContent || doc.body.innerText || "";
  }

  const sentences = textForSentences.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceCount = sentences.length;

  // Title / Excerpt Length
  const titleLen = seoTitle ? seoTitle.length : title.length;
  const descLen = description ? description.length : 0;

  // --- A. META KEYWORD CHECKS (Only run if keywords are set, otherwise subtract points) ---
  if (keywordsList.length === 0) {
    seoScore -= 15;
    seoChecklist.push({
      id: "keywords-missing",
      text: "Meta Keywords are missing",
      status: "error",
      detail: "Add comma-separated meta keywords in the input field to index search relevance topics."
    });
  } else {
    const seoTitleLower = seoTitle.toLowerCase();
    const titleLower = title.toLowerCase();
    const descLower = description.toLowerCase();

    // 1. Title Match
    const matchesTitle = keywordsList.filter(k => seoTitleLower.includes(k) || titleLower.includes(k));
    if (matchesTitle.length > 0) {
      seoChecklist.push({
        id: "keywords-title",
        text: `Keywords in Title (${matchesTitle.length}/${keywordsList.length})`,
        status: "success",
        detail: `Found target keywords in title: ${matchesTitle.join(", ")}.`
      });
    } else {
      seoScore -= 8;
      seoChecklist.push({
        id: "keywords-title",
        text: "No keywords in Title",
        status: "warning",
        detail: "Include one or more of your meta keywords in the blog Title."
      });
    }

    // 2. Meta Description Match
    const matchesDesc = keywordsList.filter(k => descLower.includes(k));
    if (matchesDesc.length > 0) {
      seoChecklist.push({
        id: "keywords-desc",
        text: `Keywords in Meta Description (${matchesDesc.length}/${keywordsList.length})`,
        status: "success",
        detail: `Found target keywords in meta description: ${matchesDesc.join(", ")}.`
      });
    } else {
      seoScore -= 8;
      seoChecklist.push({
        id: "keywords-desc",
        text: "No keywords in Meta Description",
        status: "warning",
        detail: "Ensure your meta description mentions at least one meta keyword."
      });
    }

    // 3. First Paragraph Check (inspects Title and first 300 characters of clean content text)
    const introText = (title + " " + plainText.slice(0, 300)).toLowerCase();
    const matchesIntro = keywordsList.filter(k => introText.includes(k));
    if (matchesIntro.length > 0) {
      seoChecklist.push({
        id: "keywords-intro",
        text: `Keywords in Intro Text (${matchesIntro.length}/${keywordsList.length})`,
        status: "success",
        detail: `Keywords present in the introduction text: ${matchesIntro.join(", ")}.`
      });
    } else {
      seoScore -= 5;
      seoChecklist.push({
        id: "keywords-intro",
        text: "No keywords in Intro Text",
        status: "warning",
        detail: "Introduce at least one keyword in the opening section/first 50 words of your blog."
      });
    }

    // 4. URL Slug Check
    const slugLower = slug ? slug.toLowerCase().replace(/-/g, " ") : "";
    const matchesSlug = keywordsList.filter(k => slugLower.includes(k));
    if (matchesSlug.length > 0) {
      seoChecklist.push({
        id: "keywords-slug",
        text: `Keywords in URL Slug (${matchesSlug.length}/${keywordsList.length})`,
        status: "success",
        detail: `Target keywords matched in slug: ${matchesSlug.join(", ")}.`
      });
    } else {
      seoScore -= 5;
      seoChecklist.push({
        id: "keywords-slug",
        text: "No keywords in URL Slug",
        status: "warning",
        detail: "Include one of your primary meta keywords inside the slug path."
      });
    }

    // 5. Image ALT Keyword Match
    if (imageCount > 0) {
      if (hasKeywordInAlts) {
        seoChecklist.push({
          id: "image-alt-keyword",
          text: "Keywords in Image ALT attributes",
          status: "success",
          detail: "Target keywords found in image ALT tag descriptions."
        });
      } else {
        seoScore -= 5;
        seoChecklist.push({
          id: "image-alt-keyword",
          text: "No keywords in Image Alts",
          status: "warning",
          detail: "Add meta keywords to image ALT tags to optimize image crawling relevance."
        });
      }
    }
  }

  // --- B. CONTENT & GENERAL SEO CHECKS (Run always) ---

  // 1. Content Word Count Length Check
  if (wordCount < 300) {
    seoScore -= 15;
    seoChecklist.push({
      id: "wordcount",
      text: `Word count too low (${wordCount} words)`,
      status: "error",
      detail: "Aim for at least 300 words to provide helpful search content."
    });
  } else if (wordCount < 600) {
    seoScore -= 5;
    seoChecklist.push({
      id: "wordcount",
      text: `Good word count (${wordCount} words)`,
      status: "warning",
      detail: "Good content length, but posts above 600 words rank higher."
    });
  } else {
    seoChecklist.push({
      id: "wordcount",
      text: `Excellent word count (${wordCount} words)`,
      status: "success",
      detail: "Your post content length is optimal for crawl rankings."
    });
  }

  // 2. Title Length Rating
  if (titleLen >= 40 && titleLen <= 60) {
    seoChecklist.push({
      id: "title-length",
      text: "SEO Title length is optimal",
      status: "success",
      detail: `Your title is ${titleLen} characters. Ideal length is 40-60 characters.`
    });
  } else {
    seoScore -= 8;
    seoChecklist.push({
      id: "title-length",
      text: titleLen < 40 ? "Title is too short" : "Title is too long",
      status: "warning",
      detail: `SEO Title is ${titleLen} characters (aim for 40-60).`
    });
  }

  // 3. Description Length Rating
  if (descLen === 0) {
    seoScore -= 15;
    seoChecklist.push({
      id: "desc-missing",
      text: "Meta Description is missing",
      status: "error",
      detail: "Provide a meta excerpt / description to stand out in search snippets."
    });
  } else if (descLen >= 120 && descLen <= 160) {
    seoChecklist.push({
      id: "desc-length",
      text: "Meta Description length is optimal",
      status: "success",
      detail: `Meta Description is ${descLen} characters. Ideal is 120-160.`
    });
  } else {
    seoScore -= 8;
    seoChecklist.push({
      id: "desc-length",
      text: descLen < 120 ? "Description is too short" : "Description is too long",
      status: "warning",
      detail: `Meta Description is ${descLen} characters (aim for 120-160).`
    });
  }

  // 4. URL Slug check
  if (!slug) {
    seoScore -= 10;
    seoChecklist.push({
      id: "slug-missing",
      text: "URL Slug path is missing",
      status: "error",
      detail: "Define the URL endpoint slug path for this blog."
    });
  } else if (slug.length > 80) {
    seoScore -= 5;
    seoChecklist.push({
      id: "slug-length",
      text: "URL Slug is too long",
      status: "warning",
      detail: "Keep your slug short and readable (under 80 characters)."
    });
  } else {
    seoChecklist.push({
      id: "slug-length",
      text: "URL Slug format is good",
      status: "success",
      detail: `Slug endpoint /blogs/${slug} is clean and structured.`
    });
  }

  // 5. Links Analysis
  if (internalCount > 0) {
    seoChecklist.push({
      id: "links-internal",
      text: "Internal links found",
      status: "success",
      detail: `Found ${internalCount} internal linking targets.`
    });
  } else {
    seoScore -= 10;
    seoChecklist.push({
      id: "links-internal",
      text: "No internal links found",
      status: "warning",
      detail: "Link to other service or service-booking pages to pass domain credit."
    });
  }

  if (outboundCount > 0) {
    seoChecklist.push({
      id: "links-external",
      text: "Outbound links found",
      status: "success",
      detail: `Found ${outboundCount} external reference links.`
    });
  } else {
    seoScore -= 5;
    seoChecklist.push({
      id: "links-external",
      text: "No outbound links found",
      status: "warning",
      detail: "Link to external authoritative sources to backup content facts."
    });
  }

  // 6. Image Count & Alts Checks
  if (imageCount === 0) {
    seoScore -= 10;
    seoChecklist.push({
      id: "images-missing",
      text: "No images present",
      status: "warning",
      detail: "Add at least one visual element or cover image to improve click interactions."
    });
  } else {
    if (missingAlts > 0) {
      seoScore -= 5;
      seoChecklist.push({
        id: "image-alt-missing",
        text: `${missingAlts} images missing alt text`,
        status: "warning",
        detail: "All images should have alt text to support screen readers and image search."
      });
    } else {
      seoChecklist.push({
        id: "image-alt-missing",
        text: "All image alt tags optimized",
        status: "success",
        detail: "All images have Alt descriptions configured."
      });
    }
  }

  // --- C. READABILITY CRITERIA CHECKS (Run always) ---
  let fleschScore = 100;
  if (wordCount > 0 && sentenceCount > 0) {
    let syllables = 0;
    words.forEach(w => { syllables += countSyllablesInWord(w); });
    fleschScore = 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllables / wordCount);
    fleschScore = Math.max(0, Math.min(100, fleschScore));
  }

  if (fleschScore >= 60) {
    readabilityChecklist.push({
      id: "r-flesch",
      text: `Flesch Reading Ease: ${fleschScore.toFixed(0)}`,
      status: "success",
      detail: "Easy to read. Standard readable text for general readers."
    });
  } else if (fleschScore >= 30) {
    readabilityScore -= 15;
    readabilityChecklist.push({
      id: "r-flesch",
      text: `Flesch Reading Ease: ${fleschScore.toFixed(0)}`,
      status: "warning",
      detail: "Difficult to read. Try using shorter words and simpler sentences."
    });
  } else {
    readabilityScore -= 30;
    readabilityChecklist.push({
      id: "r-flesch",
      text: `Flesch Reading Ease: ${fleschScore.toFixed(0)}`,
      status: "error",
      detail: "Extremely complex. Break down paragraphs and simplify vocabulary."
    });
  }

  // 2. Sentence Length Check
  const longSentences = sentences.filter(s => s.trim().split(/\s+/).length > 20);
  const longSentenceRatio = sentences.length > 0 ? (longSentences.length / sentences.length) * 100 : 0;
  if (longSentenceRatio <= 25) {
    readabilityChecklist.push({
      id: "r-sentence-len",
      text: "Sentence length is ideal",
      status: "success",
      detail: `Only ${longSentenceRatio.toFixed(0)}% of sentences are longer than 20 words.`
    });
  } else {
    readabilityScore -= 15;
    readabilityChecklist.push({
      id: "r-sentence-len",
      text: "Sentences are too long",
      status: "warning",
      detail: `${longSentenceRatio.toFixed(0)}% of sentences are over 20 words. Split them.`
    });
  }

  // 3. Paragraph Length Check
  const longParagraphs = paragraphs.filter(p => p.split(/\s+/).length > 150);
  if (longParagraphs.length === 0) {
    readabilityChecklist.push({
      id: "r-paragraph-len",
      text: "Paragraph length is ideal",
      status: "success",
      detail: "All paragraphs are under 150 words."
    });
  } else {
    readabilityScore -= 15;
    readabilityChecklist.push({
      id: "r-paragraph-len",
      text: "Paragraphs are too long",
      status: "warning",
      detail: `${longParagraphs.length} paragraph(s) exceed 150 words. Shorten paragraphs.`
    });
  }

  // 4. Heading Structure H1 tags check
  if (h1sCount === 1) {
    readabilityChecklist.push({
      id: "r-h1-single",
      text: "Heading structure is correct",
      status: "success",
      detail: "Exactly one H1 tag is present."
    });
  } else {
    readabilityScore -= 20;
    readabilityChecklist.push({
      id: "r-h1-single",
      text: h1sCount > 1 ? "Multiple H1 headings" : "No H1 heading in content",
      status: "error",
      detail: `Found ${h1sCount} H1 tags. Use exactly one H1 tag for the title.`
    });
  }

  // 5. Heading Structure Subheadings count
  if (h2s.length > 0 || h3s.length > 0) {
    readabilityChecklist.push({
      id: "r-subheading-presence",
      text: "Subheading distribution is good",
      status: "success",
      detail: `Found ${h2s.length} H2(s) and ${h3s.length} H3(s) subheadings.`
    });
  } else {
    readabilityScore -= 10;
    readabilityChecklist.push({
      id: "r-subheading-presence",
      text: "No subheadings used",
      status: "warning",
      detail: "Break your text into sections using H2 and H3 subheadings."
    });
  }

  return {
    seoScore: Math.max(0, seoScore),
    readabilityScore: Math.max(0, readabilityScore),
    wordCount,
    fleschScore,
    characterCounts: { title: titleLen, description: descLen },
    seoChecklist,
    readabilityChecklist,
    tableOfContents
  };
}
