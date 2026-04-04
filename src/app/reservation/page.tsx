import { Metadata } from "next";
import { Suspense } from "react";
import { ReservationsClient } from "./ReservationsClient";

export const metadata: Metadata = {
  title: "Reservation | Turquaz",
  description: "Reserve a table at your preferred Turquaz location.",
};

export default function ReservationPage() {
  return (
    <Suspense>
      <ReservationsClient />
    </Suspense>
  );
}
