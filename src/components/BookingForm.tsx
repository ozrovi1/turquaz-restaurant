"use client";

import { useState } from "react";

interface BookingFormProps {
  branchSlug: string;
  branchName: string;
  onBack?: () => void;
}

export function BookingForm({ branchSlug, branchName, onBack }: BookingFormProps) {
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    date: "",
    time: "",
    guestCount: "2",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const timeSlots: string[] = [];
  for (let h = 12; h <= 22; h++) {
    timeSlots.push(`${String(h).padStart(2, "0")}:00`);
    timeSlots.push(`${String(h).padStart(2, "0")}:30`);
  }

  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branchSlug,
          ...form,
          guestCount: Number(form.guestCount),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to submit booking");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-medium text-[#faf8f5] mb-2">Booking Received!</h2>
        <p className="text-[#faf8f5]/60 text-sm mb-1">
          Thank you, {form.customerName}. Your reservation at <span className="text-[#22c55e]">{branchName}</span> is pending confirmation.
        </p>
        <p className="text-[#faf8f5]/40 text-xs mb-6">
          {form.date} at {form.time} &middot; {form.guestCount} guests
        </p>
        <p className="text-[#faf8f5]/40 text-xs mb-6">
          We&apos;ll confirm your reservation shortly. For urgent changes, please call us directly.
        </p>
        {onBack ? (
          <button
            onClick={() => {
              setSuccess(false);
              setForm({ customerName: "", customerPhone: "", customerEmail: "", date: "", time: "", guestCount: "2" });
              onBack();
            }}
            className="text-sm text-[#22c55e] hover:text-[#4ade80] transition-colors"
          >
            &larr; Back to Locations
          </button>
        ) : (
          <button
            onClick={() => {
              setSuccess(false);
              setForm({ customerName: "", customerPhone: "", customerEmail: "", date: "", time: "", guestCount: "2" });
            }}
            className="text-sm text-[#22c55e] hover:text-[#4ade80] transition-colors"
          >
            Make Another Reservation
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {onBack && (
        <button
          onClick={onBack}
          className="text-sm text-[#faf8f5]/50 hover:text-[#faf8f5]/70 mb-4 transition-colors"
        >
          &larr; Choose another location
        </button>
      )}

      <h2 className="text-lg font-medium text-[#faf8f5] mb-1">
        Reserve at <span className="text-[#22c55e]">{branchName}</span>
      </h2>
      <p className="text-[#faf8f5]/50 text-xs mb-6">
        Fill in your details and we&apos;ll confirm your table.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-900/30 border border-red-500/30 text-red-300 text-sm px-3 py-2 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm text-[#faf8f5]/70 mb-1">Name *</label>
          <input
            type="text"
            value={form.customerName}
            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
            className="w-full px-3 py-2.5 bg-[#0d2a0d] border border-[#166534]/30 rounded text-[#faf8f5] text-sm focus:outline-none focus:border-[#22c55e]/50 transition-colors"
            placeholder="Your full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-[#faf8f5]/70 mb-1">Phone *</label>
          <input
            type="tel"
            value={form.customerPhone}
            onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
            className="w-full px-3 py-2.5 bg-[#0d2a0d] border border-[#166534]/30 rounded text-[#faf8f5] text-sm focus:outline-none focus:border-[#22c55e]/50 transition-colors"
            placeholder="+44 7XXX XXX XXX"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-[#faf8f5]/70 mb-1">Email</label>
          <input
            type="email"
            value={form.customerEmail}
            onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
            className="w-full px-3 py-2.5 bg-[#0d2a0d] border border-[#166534]/30 rounded text-[#faf8f5] text-sm focus:outline-none focus:border-[#22c55e]/50 transition-colors"
            placeholder="your@email.com (optional)"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-[#faf8f5]/70 mb-1">Date *</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              min={today}
              className="w-full px-3 py-2.5 bg-[#0d2a0d] border border-[#166534]/30 rounded text-[#faf8f5] text-sm focus:outline-none focus:border-[#22c55e]/50 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[#faf8f5]/70 mb-1">Time *</label>
            <select
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="booking-select w-full pl-3 pr-10 py-2.5 bg-[#0a1f0a]/80 border border-[#166534]/25 rounded-lg text-[#faf8f5] text-sm placeholder:text-[#faf8f5]/40 focus:outline-none focus:border-[#22c55e]/60 focus:ring-1 focus:ring-[#22c55e]/20 transition-all duration-200"
              required
            >
              <option value="">Select time</option>
              {timeSlots.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-[#faf8f5]/70 mb-1">Guests *</label>
          <select
            value={form.guestCount}
            onChange={(e) => setForm({ ...form, guestCount: e.target.value })}
            className="booking-select w-full pl-3 pr-10 py-2.5 bg-[#0a1f0a]/80 border border-[#166534]/25 rounded-lg text-[#faf8f5] text-sm placeholder:text-[#faf8f5]/40 focus:outline-none focus:border-[#22c55e]/60 focus:ring-1 focus:ring-[#22c55e]/20 transition-all duration-200"
            required
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-[#166534] text-[#faf8f5] font-medium rounded hover:bg-[#22c55e] hover:text-[#0a1f0a] transition-colors disabled:opacity-50 text-sm"
        >
          {submitting ? "Submitting..." : "Reserve Table"}
        </button>
      </form>
    </div>
  );
}
