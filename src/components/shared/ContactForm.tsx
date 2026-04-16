"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { MagneticButton } from "../animations/MagneticButton";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simulate API call for now (Phase 5 will connect this to backend)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form data:", data);
    setSuccess(true);
    setIsSubmitting(false);
    reset();
    
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div className="flex flex-col">
        <label htmlFor="name" className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] mb-2">Full Name</label>
        <input
          id="name"
          {...register("name")}
          className="bg-transparent border-b border-[var(--color-gold-900)] py-3 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors"
          placeholder="Jane Doe"
        />
        {errors.name && <span className="text-red-400 text-xs mt-2">{errors.name.message}</span>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] mb-2">Email Address</label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="bg-transparent border-b border-[var(--color-gold-900)] py-3 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors"
          placeholder="jane@example.com"
        />
        {errors.email && <span className="text-red-400 text-xs mt-2">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="message" className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] mb-2">Message</label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          className="bg-transparent border-b border-[var(--color-gold-900)] py-3 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors resize-none"
          placeholder="Inquire about a piece, exhibitions, or commissions..."
        />
        {errors.message && <span className="text-red-400 text-xs mt-2">{errors.message.message}</span>}
      </div>

      <div className="pt-6">
        <MagneticButton
          className={`w-full py-4 text-sm tracking-widest uppercase font-semibold transition-colors duration-300 ${
            success 
              ? "bg-green-800 text-white border border-green-700" 
              : "bg-[var(--color-gold-400)] hover:bg-[var(--color-gold-300)] text-[#000]"
          }`}
        >
          {isSubmitting ? "Sending..." : success ? "Message Sent!" : "Send Message"}
        </MagneticButton>
      </div>
    </form>
  );
}
