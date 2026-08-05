"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/ui/FormField";
import CoverImageUpload from "./CoverImageUpload";
import { GENRES } from "@/lib/genreConstants";
import { apiClient } from "@/lib/apiClient.client";
import toast from "react-hot-toast";

const emptyForm = {
  title: "",
  description: "",
  content: "",
  genre: "",
  price: "",
  coverImage: "",
};

export default function EbookForm({ initialValues, ebookId, mode = "add" }) {
  const router = useRouter();
  const [form, setForm] = useState(initialValues || emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.content.trim()) newErrors.content = "Ebook content is required";
    if (!form.genre) newErrors.genre = "Please select a genre";
    if (!form.price || Number(form.price) <= 0)
      newErrors.price = "Enter a valid price";
    if (!form.coverImage) newErrors.coverImage = "Cover image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = { ...form, price: Number(form.price) };

      if (mode === "edit") {
        await apiClient.patch(`/ebooks/${ebookId}`, payload);
        toast.success("Ebook updated successfully!");
      } else {
        await apiClient.post("/ebooks", payload);
        toast.success("Ebook published successfully!");
      }

      router.push("/dashboard/writer");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField label="Cover Image" error={errors.coverImage}>
        <CoverImageUpload
          value={form.coverImage}
          onChange={(url) => setForm({ ...form, coverImage: url })}
        />
      </FormField>

      <FormField label="Title" error={errors.title}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="The title of your ebook"
          className="w-full rounded-lg border border-parchment-300 px-3 py-2.5 font-body text-sm text-ink-900 focus:border-gold-500 focus:outline-none dark:border-ink-700 dark:bg-ink-800 dark:text-parchment-100"
        />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Genre" error={errors.genre}>
          <select
            name="genre"
            value={form.genre}
            onChange={handleChange}
            className="w-full rounded-lg border border-parchment-300 px-3 py-2.5 font-body text-sm text-ink-900 focus:border-gold-500 focus:outline-none dark:border-ink-700 dark:bg-ink-800 dark:text-parchment-100"
          >
            <option value="">Select a genre</option>
            {GENRES.map((g) => (
              <option key={g.name} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Price (USD)" error={errors.price}>
          <input
            name="price"
            type="number"
            min="0.5"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            placeholder="e.g. 9.99"
            className="w-full rounded-lg border border-parchment-300 px-3 py-2.5 font-body text-sm text-ink-900 focus:border-gold-500 focus:outline-none dark:border-ink-700 dark:bg-ink-800 dark:text-parchment-100"
          />
        </FormField>
      </div>

      <FormField label="Description (public preview)" error={errors.description}>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="A short teaser shown to everyone before purchase"
          className="w-full resize-none rounded-lg border border-parchment-300 px-3 py-2.5 font-body text-sm text-ink-900 focus:border-gold-500 focus:outline-none dark:border-ink-700 dark:bg-ink-800 dark:text-parchment-100"
        />
      </FormField>

      <FormField label="Full Content (unlocked after purchase)" error={errors.content}>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows={10}
          placeholder="Paste or write the full ebook content here"
          className="w-full resize-y rounded-lg border border-parchment-300 px-3 py-2.5 font-body text-sm text-ink-900 focus:border-gold-500 focus:outline-none dark:border-ink-700 dark:bg-ink-800 dark:text-parchment-100"
        />
      </FormField>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="cursor-pointer rounded-lg bg-gold-600 px-6 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-gold-700 disabled:opacity-60"
        >
          {submitting
            ? mode === "edit"
              ? "Saving changes..."
              : "Publishing..."
            : mode === "edit"
            ? "Save Changes"
            : "Publish Ebook"}
        </button>
      </div>
    </form>
  );
}