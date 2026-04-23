"use client";

import { useState } from "react";

interface Reservation {
  id: number;
  branchSlug: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  date: string;
  time: string;
  guestCount: number;
  status: string;
  notes: string | null;
  isWalkIn: boolean;
  createdAt: string;
}

interface ReservationCardProps {
  reservation: Reservation;
  onUpdate: () => void;
  isAdmin: boolean;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  confirmed: "bg-green-500/20 text-green-300 border-green-500/30",
  rejected: "bg-red-500/20 text-red-300 border-red-500/30",
  "no-show": "bg-gray-500/20 text-gray-300 border-gray-500/30",
  completed: "bg-blue-500/20 text-blue-300 border-blue-500/30",
};

const statusActions: Record<string, { label: string; next: string }[]> = {
  pending: [
    { label: "Confirm", next: "confirmed" },
    { label: "Reject", next: "rejected" },
  ],
  confirmed: [
    { label: "Completed", next: "completed" },
    { label: "No-Show", next: "no-show" },
  ],
  rejected: [{ label: "Reopen", next: "pending" }],
  "no-show": [{ label: "Reopen", next: "pending" }],
  completed: [],
};

export function ReservationCard({ reservation, onUpdate, isAdmin }: ReservationCardProps) {
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState(reservation.notes || "");
  const [updating, setUpdating] = useState(false);

  async function updateStatus(status: string) {
    setUpdating(true);
    await fetch(`/api/reservations/${reservation.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setUpdating(false);
    onUpdate();
  }

  async function saveNotes() {
    await fetch(`/api/reservations/${reservation.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });
    setShowNotes(false);
    onUpdate();
  }

  async function deleteReservation() {
    if (!confirm("Delete this reservation?")) return;
    await fetch(`/api/reservations/${reservation.id}`, { method: "DELETE" });
    onUpdate();
  }

  const actions = statusActions[reservation.status] || [];

  return (
    <div className="bg-[#0d2a0d] border border-[#166534]/15 rounded-lg p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-[#faf8f5] font-medium text-sm">
              {reservation.customerName}
            </h3>
            {reservation.isWalkIn && (
              <span className="text-[10px] px-1.5 py-0.5 bg-[#166534]/20 text-[#22c55e] rounded">
                Walk-in
              </span>
            )}
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded border ${
                statusColors[reservation.status] || statusColors.pending
              }`}
            >
              {reservation.status}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-[#faf8f5]/50">
            <span>{reservation.time}</span>
            <span>{reservation.guestCount} guests</span>
            <span className="capitalize">{reservation.branchSlug}</span>
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-[#faf8f5]/40">
            <a href={`tel:${reservation.customerPhone}`} className="hover:text-[#22c55e]">
              {reservation.customerPhone}
            </a>
            {reservation.customerEmail && (
              <span>{reservation.customerEmail}</span>
            )}
          </div>
          {reservation.notes && !showNotes && (
            <p className="text-xs text-[#faf8f5]/40 mt-1 italic">
              {reservation.notes}
            </p>
          )}
        </div>

        <div className="text-right shrink-0">
          <p className="text-xs text-[#faf8f5]/50">{reservation.date}</p>
        </div>
      </div>

      {showNotes && (
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes..."
            className="flex-1 px-2 py-1 bg-[#081408] border border-[#166534]/20 rounded text-xs text-[#faf8f5] focus:outline-none focus:border-[#22c55e]/40"
          />
          <button
            onClick={saveNotes}
            className="px-2 py-1 text-xs bg-[#166534]/20 text-[#22c55e] rounded hover:bg-[#166534]/30"
          >
            Save
          </button>
          <button
            onClick={() => setShowNotes(false)}
            className="px-2 py-1 text-xs text-[#faf8f5]/40 hover:text-[#faf8f5]/60"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 mt-3 flex-wrap">
        {actions.map((action) => (
          <button
            key={action.next}
            onClick={() => updateStatus(action.next)}
            disabled={updating}
            className="px-2.5 py-1 text-xs bg-[#faf8f5]/5 text-[#faf8f5]/70 rounded hover:bg-[#faf8f5]/10 hover:text-[#faf8f5] transition-colors disabled:opacity-50"
          >
            {action.label}
          </button>
        ))}
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="px-2.5 py-1 text-xs text-[#faf8f5]/40 hover:text-[#faf8f5]/60 transition-colors"
        >
          Notes
        </button>
        {isAdmin && (
          <button
            onClick={deleteReservation}
            className="px-2.5 py-1 text-xs text-red-400/60 hover:text-red-400 transition-colors ml-auto"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
