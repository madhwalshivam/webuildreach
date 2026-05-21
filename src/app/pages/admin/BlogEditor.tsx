import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { supabase } from "../../../lib/supabase";
import { uploadToR2 } from "../../../lib/r2";
import { 
  ArrowLeft, Save, Upload, Loader2, X, Plus, Trash2,
  CheckCircle2, AlertTriangle, XCircle, Zap, Search, Award, Sparkles, Star, 
  Laptop, Smartphone, Share2, FileText, ChevronRight, Eye, RefreshCw
} from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "sonner";
import { extractSeoMetadata, injectSeoMetadata, analyzeSeo, autoGenerateSlug } from "../../utils/seoAnalyzer";

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!id);
  const [uploading, setUploading] = useState(false);
  
  // Sidebar config
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [socialPlatform, setSocialPlatform] = useState<"fb" | "tw">("fb");

  // Form values
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    image_url: "",
    canonical_url: "",
    color: "#5A45FD",
    category: "Technology",
    author: "WeBuildReach Team",
  });

  // SEO/Schema meta values
  const [seoData, setSeoData] = useState({
    rating_value: 4.8,
    rating_count: 125,
    meta_keywords: "",
    image_alt: "",
    robots_meta: {
      index: true,
      follow: true,
      noarchive: false
    },
    custom_canonical: "",
    faqs: [] as { q: string; a: string }[]
  });

  // AI Assistant simulated state
  const [aiSuggestions, setAiSuggestions] = useState<{
    titles: string[];
    descriptions: string[];
    keywords: string[];
  }>({
    titles: [],
    descriptions: [],
    keywords: []
  });
  const [generatingAi, setGeneratingAi] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) {
        const { cleanContent, metadata } = extractSeoMetadata(data.content);
        setFormData({
          title: data.title || "",
          slug: data.slug || "",
          description: data.description || "",
          content: cleanContent,
          image_url: data.image_url || "",
          canonical_url: data.canonical_url || "",
          color: data.color || "#5A45FD",
          category: data.category || "Technology",
          author: data.author || "WeBuildReach Team",
        });
        setSeoData({
          rating_value: metadata.rating_value ?? 4.8,
          rating_count: metadata.rating_count ?? 125,
          meta_keywords: metadata.meta_keywords ?? "",
          image_alt: metadata.image_alt ?? "",
          robots_meta: metadata.robots_meta ?? { index: true, follow: true, noarchive: false },
          custom_canonical: metadata.custom_canonical ?? "",
          faqs: metadata.faqs ?? []
        });
      }
    } catch (error: any) {
      toast.error("Error fetching blog: " + error.message);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      
      // Auto slug only for draft posts
      if (name === "title" && !id) {
        const generatedSlug = autoGenerateSlug(value);
        newData.slug = generatedSlug;
        newData.canonical_url = `https://webuildreach.com/blogs/${generatedSlug}`;
      }

      if (name === "slug" && value) {
        newData.canonical_url = `https://webuildreach.com/blogs/${value}`;
      }
      
      return newData;
    });
  };

  const handleSeoChange = (name: string, value: any) => {
    setSeoData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToR2(file);
      setFormData((prev) => ({ ...prev, image_url: url }));
      toast.success("Cover image uploaded!");
    } catch (error: any) {
      toast.error("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Add/remove/edit FAQs
  const addFaq = () => {
    setSeoData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { q: "", a: "" }]
    }));
  };

  const removeFaq = (index: number) => {
    setSeoData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, idx) => idx !== index)
    }));
  };

  const updateFaq = (index: number, field: "q" | "a", val: string) => {
    setSeoData(prev => {
      const copy = [...prev.faqs];
      copy[index] = { ...copy[index], [field]: val };
      return { ...prev, faqs: copy };
    });
  };

  // Quick internal link injection helper
  const insertInternalLink = (url: string, anchorText: string) => {
    const linkHtml = ` <a href="${url}" class="text-[#5A45FD] font-semibold hover:underline" target="_blank">${anchorText}</a> `;
    setFormData(prev => ({
      ...prev,
      content: prev.content + linkHtml
    }));
    toast.success(`Inserted link: ${anchorText}`);
  };

  // AI assistant handlers
  const generateAiTitle = () => {
    const firstKeyword = seoData.meta_keywords
      ? seoData.meta_keywords.split(",")[0].trim()
      : "";
    if (!firstKeyword) {
      toast.error("Enter meta keywords first!");
      return;
    }
    setGeneratingAi("title");
    setTimeout(() => {
      const suggestions = [
        `How to Master ${firstKeyword}: A Step-by-Step SEO Guide`,
        `10 Proven Tips for Optimizing ${firstKeyword} in 2026`,
        `Why ${firstKeyword} is the Key to Scaling Your Business`,
      ];
      setAiSuggestions(prev => ({ ...prev, titles: suggestions }));
      setGeneratingAi(null);
      toast.success("AI generated 3 title options!");
    }, 1200);
  };

  const generateAiDesc = () => {
    const firstKeyword = seoData.meta_keywords
      ? seoData.meta_keywords.split(",")[0].trim()
      : "";
    if (!firstKeyword) {
      toast.error("Enter meta keywords first!");
      return;
    }
    setGeneratingAi("desc");
    setTimeout(() => {
      const suggestions = [
        `Discover how to scale your reach with our expert guide to ${firstKeyword}. Learn step-by-step optimization techniques, image SEO, and internal linking strategies.`,
        `Want more conversions? Check out these 10 industry secrets for optimizing ${firstKeyword} on search engines to achieve massive organic ranking boosts.`,
      ];
      setAiSuggestions(prev => ({ ...prev, descriptions: suggestions }));
      setGeneratingAi(null);
      toast.success("AI generated 2 meta descriptions!");
    }, 1200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image_url) {
      toast.error("Featured image is required!");
      return;
    }

    setLoading(true);

    // Save metadata block structured tags
    const combinedContent = injectSeoMetadata(formData.content, seoData);
    const postData = {
      ...formData,
      content: combinedContent
    };

    try {
      if (id) {
        const { error } = await supabase
          .from("blogs")
          .update(postData)
          .eq("id", id);
        if (error) throw error;
        toast.success("Blog saved successfully");
      } else {
        const { error } = await supabase.from("blogs").insert([postData]);
        if (error) throw error;
        toast.success("Blog created successfully");
      }
      navigate("/admin");
    } catch (error: any) {
      toast.error("Failed saving blog: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Real-time analysis output
  const report = analyzeSeo({
    title: formData.title,
    seoTitle: formData.title, // using title as SEO Title target
    description: formData.description,
    contentHtml: formData.content,
    metaKeywords: seoData.meta_keywords,
    slug: formData.slug,
    imageUrl: formData.image_url,
    imageAlt: seoData.image_alt
  });

  const getScoreColorText = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 50) return "text-amber-450";
    return "text-red-400";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-emerald-500/10 border-emerald-500/20";
    if (score >= 50) return "bg-amber-500/10 border-amber-500/20";
    return "bg-red-500/10 border-red-500/20";
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#070611] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070611] text-white p-4 md:p-8 selection:bg-primary/30">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/admin")}
              className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                SEO Publisher Workspace 
              </h1>
              <p className="text-slate-550 text-xs">Write content, build schema markups, and review search criteria side-by-side.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:bg-primary/40 text-white px-8 py-3.5 rounded-xl font-extrabold transition-all cursor-pointer shadow-lg shadow-primary/25 text-xs uppercase tracking-wider"
            >
              {loading ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
              {id ? "Save Post" : "Publish Live"}
            </button>
          </div>
        </div>

        {/* Dynamic Split Layout: LEFT Editor vs RIGHT Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE (70% - lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Featured Image upload block */}
            <div className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl space-y-3">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Featured Cover Image</label>
              
              {formData.image_url ? (
                <div className="relative group rounded-xl overflow-hidden aspect-video bg-slate-900 border border-white/10 max-h-[300px]">
                  <img src={formData.image_url} alt="Cover Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image_url: "" }))}
                    className="absolute top-3 right-3 p-2 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700 cursor-pointer shadow-md"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-video max-h-[200px] rounded-xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition-all">
                  {uploading ? (
                    <Loader2 className="animate-spin text-primary" />
                  ) : (
                    <>
                      <Upload className="text-slate-500 mb-2" size={24} />
                      <span className="text-xs text-slate-400 font-bold">Upload cover image to Cloudflare R2</span>
                      <span className="text-[10px] text-slate-550 mt-1">Accepts PNG, JPG, WEBP formats</span>
                    </>
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                </label>
              )}
              
              <input
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary placeholder-slate-600 font-semibold"
                placeholder="Or paste direct image URL address..."
              />

              <div className="pt-2 border-t border-white/5">
                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Featured Image Alt Text</label>
                <input
                  type="text"
                  value={seoData.image_alt || ""}
                  onChange={(e) => handleSeoChange("image_alt", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary placeholder-slate-600 font-semibold text-slate-200"
                  placeholder="Alt text describing image (e.g. SEO company in Lucknow)"
                />
              </div>
            </div>

            {/* Main Content Fields */}
            <div className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl space-y-6">
              
              {/* Title & Slug */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Blog Title</label>
                    <span className={`text-[10px] font-bold ${formData.title.length >= 40 && formData.title.length <= 60 ? "text-emerald-450" : "text-amber-450"}`}>
                      {formData.title.length} characters (aim for 40-60)
                    </span>
                  </div>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary text-xl font-bold placeholder-slate-700"
                    placeholder="Enter an informative blog headline..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">URL Slug</label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary text-slate-300 font-semibold"
                      placeholder="how-to-do-seo"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Canonical Link</label>
                    <input
                      type="text"
                      name="canonical_url"
                      value={formData.canonical_url}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary text-slate-300 font-semibold"
                      placeholder="https://webuildreach.com/blogs/..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Meta Keywords (comma-separated)</label>
                    <input
                      type="text"
                      value={seoData.meta_keywords || ""}
                      onChange={(e) => handleSeoChange("meta_keywords", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary text-slate-300 font-semibold"
                      placeholder="seo, agency, digital marketing"
                    />
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Meta Excerpt / Description</label>
                  <span className={`text-[10px] font-bold ${formData.description.length >= 120 && formData.description.length <= 160 ? "text-emerald-450" : "text-amber-450"}`}>
                    {formData.description.length} characters (aim for 120-160)
                  </span>
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-sm leading-relaxed"
                  placeholder="Summary text displayed in Google search results snippets..."
                />
              </div>

              {/* Body Content Editor */}
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Article Content</label>
                <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10 min-h-[400px]">
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                    placeholder="Start writing article sections. Use Heading 2 and Heading 3 to structure content..."
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link", "image", "code-block"],
                        ["clean"],
                      ],
                    }}
                  />
                </div>
              </div>

            </div>

            {/* Left Side: Table of Contents Preview */}
            <div className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl space-y-4">
              <h3 className="font-extrabold text-sm flex items-center gap-2 text-slate-200">
                <FileText size={16} className="text-primary" /> Table of Contents Map
              </h3>
              <p className="text-xs text-slate-500">Auto-generated structure based on H2 and H3 tags used inside your content.</p>
              
              {report.tableOfContents.length > 0 ? (
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-2">
                  {report.tableOfContents.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 text-xs font-semibold ${
                        item.level === 2 ? "text-slate-350 pl-0" : "text-slate-500 pl-4"
                      }`}
                    >
                      <ChevronRight size={10} className="text-primary shrink-0" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-dashed border-white/10 rounded-xl p-6 text-center text-xs text-slate-500 font-semibold bg-white/[0.01]">
                  No heading structures found. Use H2 and H3 formats in the editor block to map out a Table of Contents outline.
                </div>
              )}
            </div>

            {/* Left Side: FAQ Schema Builder */}
            <div className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <div>
                  <h3 className="font-extrabold text-sm flex items-center gap-2 text-slate-200">
                    <Star size={16} className="text-amber-500" /> FAQ Builder & Schema Link
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Write FAQs that sync directly into structured search bot data.</p>
                </div>
                <button
                  type="button"
                  onClick={addFaq}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-[10px] font-black uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border border-white/5"
                >
                  <Plus size={12} /> Add FAQ
                </button>
              </div>

              {seoData.faqs.length > 0 ? (
                <div className="space-y-4">
                  {seoData.faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-3 relative group">
                      <button
                        type="button"
                        onClick={() => removeFaq(idx)}
                        className="absolute top-3 right-3 p-1.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                      >
                        <Trash2 size={12} />
                      </button>
                      
                      <div>
                        <span className="block text-[9px] font-black uppercase text-slate-500 tracking-wider mb-1">Question {idx + 1}</span>
                        <input
                          type="text"
                          placeholder="What is this service about?..."
                          value={faq.q}
                          onChange={(e) => updateFaq(idx, "q", e.target.value)}
                          className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary text-slate-200"
                        />
                      </div>
                      
                      <div>
                        <span className="block text-[9px] font-black uppercase text-slate-500 tracking-wider mb-1">Answer</span>
                        <textarea
                          placeholder="Provide details..."
                          value={faq.a}
                          onChange={(e) => updateFaq(idx, "a", e.target.value)}
                          rows={2}
                          className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-2 focus:outline-none focus:border-primary text-xs text-slate-400 leading-relaxed"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-dashed border-white/10 rounded-xl p-6 text-center text-xs text-slate-500 font-semibold bg-white/[0.01]">
                  No FAQs built yet. Add QA panels to support search schema index cards.
                </div>
              )}
            </div>

            {/* Left Side: Advanced Schema & Technical Controls */}
            <div className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl space-y-6">
              <div>
                <h3 className="font-extrabold text-sm text-slate-250">Technical SEO Controls</h3>
                <p className="text-xs text-slate-500 mt-0.5">Control indexing parameters and search engine robots mapping directly.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Robots meta toggles */}
                <div className="bg-white/[0.01] border border-white/5 rounded-xl p-4 space-y-3">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Robots Meta Directives</span>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 text-xs font-semibold text-slate-350 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={seoData.robots_meta.index}
                        onChange={(e) => handleSeoChange("robots_meta", { ...seoData.robots_meta, index: e.target.checked })}
                        className="rounded border-white/10 bg-slate-950 text-primary focus:ring-primary h-4 w-4"
                      />
                      <span>Allow Search Engines to Index (index)</span>
                    </label>
                    <label className="flex items-center gap-3 text-xs font-semibold text-slate-350 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={seoData.robots_meta.follow}
                        onChange={(e) => handleSeoChange("robots_meta", { ...seoData.robots_meta, follow: e.target.checked })}
                        className="rounded border-white/10 bg-slate-950 text-primary focus:ring-primary h-4 w-4"
                      />
                      <span>Follow links in article (follow)</span>
                    </label>
                    <label className="flex items-center gap-3 text-xs font-semibold text-slate-350 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={seoData.robots_meta.noarchive}
                        onChange={(e) => handleSeoChange("robots_meta", { ...seoData.robots_meta, noarchive: e.target.checked })}
                        className="rounded border-white/10 bg-slate-950 text-primary focus:ring-primary h-4 w-4"
                      />
                      <span>Prevent cached copies archive (noarchive)</span>
                    </label>
                  </div>
                </div>

                {/* Rating score inputs */}
                <div className="bg-white/[0.01] border border-white/5 rounded-xl p-4 space-y-4">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Aggregate Rating Schema Settings</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[9px] font-bold text-slate-500 mb-1.5">Rating Value (1-5)</span>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        value={seoData.rating_value}
                        onChange={(e) => handleSeoChange("rating_value", parseFloat(e.target.value) || 4.8)}
                        className="w-full bg-slate-950 border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-center font-bold"
                      />
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold text-slate-500 mb-1.5">Rating Count</span>
                      <input
                        type="number"
                        value={seoData.rating_count}
                        onChange={(e) => handleSeoChange("rating_count", parseInt(e.target.value) || 10)}
                        className="w-full bg-slate-950 border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-center font-bold"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR (30% - lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            
            {/* Live SEO Score Gauge */}
            <div className={`p-6 border rounded-2xl flex flex-col items-center justify-center text-center ${getScoreBg(report.seoScore)}`}>
              <Award className={getScoreColorText(report.seoScore)} size={24} />
              <h2 className="text-sm font-black uppercase tracking-widest mt-2">SEO optimization Score</h2>
              
              <div className="relative flex items-center justify-center my-4">
                <div className={`w-24 h-24 rounded-full border-4 border-dashed flex flex-col items-center justify-center ${
                  report.seoScore >= 80 ? "border-emerald-500/40" :
                  report.seoScore >= 50 ? "border-amber-500/40" : "border-red-500/40"
                }`}>
                  <span className="text-3xl font-black">{report.seoScore}</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">/ 100</span>
                </div>
              </div>

              <div className="flex gap-4 text-xs font-semibold text-slate-400 mt-2">
                <span>Words: <strong className="text-white">{report.wordCount}</strong></span>
                <span>•</span>
                <span>Flesch Score: <strong className="text-white">{report.fleschScore.toFixed(0)}</strong></span>
              </div>
            </div>

            {/* AI Assistant configuration */}
            <div className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl space-y-4">
              {/* AI suggestion options */}
              <div className="space-y-2">
                <span className="block text-[9px] font-black uppercase tracking-widest text-slate-500">AI Assistance Actions</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={generateAiTitle}
                    disabled={generatingAi !== null}
                    className="flex-1 px-3 py-2 bg-primary/10 border border-primary/20 hover:bg-primary/20 text-[10px] font-black uppercase tracking-wide rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all"
                  >
                    {generatingAi === "title" ? <Loader2 className="animate-spin" size={10} /> : <Sparkles size={10} />}
                    Suggest Titles
                  </button>
                  <button
                    type="button"
                    onClick={generateAiDesc}
                    disabled={generatingAi !== null}
                    className="flex-1 px-3 py-2 bg-primary/10 border border-primary/20 hover:bg-primary/20 text-[10px] font-black uppercase tracking-wide rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all"
                  >
                    {generatingAi === "desc" ? <Loader2 className="animate-spin" size={10} /> : <Sparkles size={10} />}
                    Suggest Excerpt
                  </button>
                </div>

                {/* AI generated options list */}
                {aiSuggestions.titles.length > 0 && (
                  <div className="bg-black/30 border border-white/5 rounded-xl p-3 mt-2 space-y-2">
                    <span className="block text-[9px] font-bold text-slate-500">Suggested H1 Options:</span>
                    {aiSuggestions.titles.map((titleOpt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, title: titleOpt }));
                          toast.success("Applied H1 title suggestion!");
                        }}
                        className="w-full text-left text-xs bg-white/5 border border-white/10 hover:border-primary rounded px-2.5 py-1.5 text-slate-300 font-semibold truncate cursor-pointer transition-colors block"
                      >
                        {titleOpt}
                      </button>
                    ))}
                  </div>
                )}
                {aiSuggestions.descriptions.length > 0 && (
                  <div className="bg-black/30 border border-white/5 rounded-xl p-3 mt-2 space-y-2">
                    <span className="block text-[9px] font-bold text-slate-500">Suggested Description Options:</span>
                    {aiSuggestions.descriptions.map((descOpt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, description: descOpt }));
                          toast.success("Applied description suggestion!");
                        }}
                        className="w-full text-left text-xs bg-white/5 border border-white/10 hover:border-primary rounded p-2 text-slate-350 font-medium cursor-pointer transition-colors block text-pretty"
                      >
                        {descOpt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Google SERP preview snippet */}
            <div className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-xs font-bold flex items-center gap-1.5 text-slate-200">
                  <Laptop size={14} className="text-primary" /> Google SERP Snippet Preview
                </span>
                
                {/* Switcher */}
                <div className="flex bg-slate-950 rounded-lg p-0.5 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("desktop")}
                    className={`p-1 rounded cursor-pointer ${previewDevice === "desktop" ? "bg-white/10 text-white" : "text-slate-500"}`}
                  >
                    <Laptop size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("mobile")}
                    className={`p-1 rounded cursor-pointer ${previewDevice === "mobile" ? "bg-white/10 text-white" : "text-slate-500"}`}
                  >
                    <Smartphone size={12} />
                  </button>
                </div>
              </div>

              {/* SERP Preview layout */}
              <div className={`bg-slate-950 border border-white/10 rounded-xl p-4 space-y-1.5 text-left select-none ${
                previewDevice === "mobile" ? "max-w-[320px] mx-auto border-dashed" : "w-full"
              }`}>
                <p className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                  https://webuildreach.com <span className="text-slate-600 font-bold">› blogs › {formData.slug || "post-url"}</span>
                </p>
                <h4 className="text-sm font-bold text-sky-400 hover:underline cursor-pointer leading-snug line-clamp-1">
                  {formData.title || "Post Title Preview..."}
                </h4>
                
                {seoData.rating_value && (
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                    <span className="flex text-amber-400 tracking-tighter">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const starNum = i + 1;
                        if (seoData.rating_value >= starNum) {
                          return <span key={i}>★</span>;
                        } else if (seoData.rating_value > i) {
                          return <span key={i}>★</span>;
                        } else {
                          return <span key={i} className="text-slate-700">★</span>;
                        }
                      })}
                    </span>
                    <span>
                      Rating: {seoData.rating_value} · ‎{seoData.rating_count} reviews
                    </span>
                  </div>
                )}

                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                  {formData.description || "Provide meta excerpt parameters..."}
                </p>
              </div>
            </div>

            {/* Social Share Cards preview */}
            <div className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-xs font-bold flex items-center gap-1.5 text-slate-200">
                  <Share2 size={14} className="text-primary" /> Social Share Preview
                </span>
                
                <div className="flex bg-slate-950 rounded-lg p-0.5 border border-white/10 text-[9px] font-black uppercase">
                  <button
                    type="button"
                    onClick={() => setSocialPlatform("fb")}
                    className={`px-2 py-1 rounded cursor-pointer ${socialPlatform === "fb" ? "bg-white/10 text-white" : "text-slate-500"}`}
                  >
                    Facebook
                  </button>
                  <button
                    type="button"
                    onClick={() => setSocialPlatform("tw")}
                    className={`px-2 py-1 rounded cursor-pointer ${socialPlatform === "tw" ? "bg-white/10 text-white" : "text-slate-500"}`}
                  >
                    Twitter / X
                  </button>
                </div>
              </div>

              {/* Social Preview card details */}
              <div className="bg-slate-950 border border-white/10 rounded-xl overflow-hidden text-left">
                {formData.image_url ? (
                  <div className="aspect-video bg-slate-900 overflow-hidden border-b border-white/5">
                    <img src={formData.image_url} alt="Social Card" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="aspect-video bg-slate-900 border-b border-white/5 flex items-center justify-center text-[10px] text-slate-600 font-bold">
                    No image uploaded yet
                  </div>
                )}
                
                <div className="p-3 space-y-1.5">
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">
                    {socialPlatform === "fb" ? "webuildreach.com" : "@webuildreach"}
                  </p>
                  <h4 className="text-xs font-bold text-slate-200 line-clamp-1">
                    {formData.title || "Social title..."}
                  </h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                    {formData.description || "Social share description info goes here..."}
                  </p>
                </div>
              </div>
            </div>

            {/* Keyword Analysis Checklist */}
            <div className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl space-y-4">
              <h3 className="font-extrabold text-sm text-slate-200 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" /> Focus Keyword Checks
              </h3>
              
              <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                {report.seoChecklist.map((item) => (
                  <div key={item.id} className="flex gap-2.5 items-start text-xs leading-tight">
                    {item.status === "success" && <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />}
                    {item.status === "warning" && <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />}
                    {item.status === "error" && <XCircle size={14} className="text-red-500 mt-0.5 shrink-0" />}
                    <div>
                      <p className="font-bold text-slate-200">{item.text}</p>
                      <p className="text-[10px] text-slate-550 mt-0.5 font-medium leading-normal">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Readability Checks */}
            <div className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl space-y-4">
              <h3 className="font-extrabold text-sm text-slate-200 flex items-center gap-2">
                <FileText size={16} className="text-primary" /> Readability checks
              </h3>
              
              <div className="space-y-3.5 max-h-[250px] overflow-y-auto pr-1">
                {report.readabilityChecklist.map((item) => (
                  <div key={item.id} className="flex gap-2.5 items-start text-xs leading-tight">
                    {item.status === "success" && <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />}
                    {item.status === "warning" && <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />}
                    {item.status === "error" && <XCircle size={14} className="text-red-500 mt-0.5 shrink-0" />}
                    <div>
                      <p className="font-bold text-slate-200">{item.text}</p>
                      <p className="text-[10px] text-slate-550 mt-0.5 font-medium leading-normal">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal link suggestions */}
            <div className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl space-y-4">
              <h3 className="font-extrabold text-sm text-slate-200 flex items-center gap-2">
                <Plus size={16} className="text-[#5A45FD]" /> Internal Linking Targets
              </h3>
              <p className="text-[10px] text-slate-500">Insert key services link paths dynamically into editor context to improve crawler ranks.</p>

              <div className="space-y-2">
                {[
                  { label: "Link: Digital Marketing services", url: "/services/seo", anchor: "advanced digital marketing and SEO services" },
                  { label: "Link: About page", url: "/about", anchor: "learn about WeBuildReach professional agency" },
                  { label: "Link: Contacts booking page", url: "/contact", anchor: "schedule a free diagnostic consultation session" }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => insertInternalLink(item.url, item.anchor)}
                    className="w-full text-left text-xs bg-white/5 border border-white/10 hover:border-[#5A45FD] p-2.5 rounded-xl cursor-pointer hover:bg-[#5A45FD]/5 transition-all text-slate-300 font-semibold block"
                  >
                    <span className="block text-[9px] text-[#5A45FD] font-bold">{item.label}</span>
                    <span className="block text-[10px] text-slate-500 font-medium italic mt-0.5">Auto-anchor: "{item.anchor}"</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        .ql-container {
          min-height: 350px;
          font-size: 1.1rem;
          color: white !important;
          border: none !important;
          background: transparent;
        }
        .ql-editor {
          min-height: 350px;
          color: white !important;
        }
        .ql-editor.ql-blank::before {
          color: rgba(255,255,255,0.3) !important;
          font-style: normal;
        }
        .ql-toolbar {
          border: none !important;
          border-bottom: 1px solid rgba(255,255,255,0.1) !important;
          background: rgba(255,255,255,0.03);
        }
        .ql-snow .ql-stroke { stroke: #94a3b8 !important; }
        .ql-snow .ql-fill { fill: #94a3b8 !important; }
        .ql-snow .ql-picker { color: #94a3b8 !important; }
        .ql-snow .ql-picker-options {
          background-color: #0D0B22 !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
        }
      `}</style>
    </div>
  );
}
