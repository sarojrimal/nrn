import { useState, FormEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const CATEGORIES: Record<string, { label: string; fee: string; pay: string }> = {
  main: { label: "Main Team", fee: "GBP 300", pay: "https://pay.sumup.com/b2c/X5AQP1T7OS" },
  veterans: { label: "Veterans Team", fee: "GBP 200", pay: "https://pay.sumup.com/b2c/X9296KG4HR" },
  womens: { label: "Women's Team", fee: "GBP 150", pay: "https://pay.sumup.com/b2c/X1ZJXFROOB" },
};

export default function Register() {
  const router = useRouter();
  const categoryKey = typeof router.query.category === "string" && CATEGORIES[router.query.category]
    ? router.query.category
    : "main";
  const cat = CATEGORIES[categoryKey];

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("category", categoryKey);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      setStatus("success");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <Head>
        <title>Team Registration — NRNA Youth UK</title>
      </Head>

      <header className="reg-header">
        <Link href="/">NRNA Youth UK</Link>
      </header>

      <div className="reg-wrap">
        <Link className="back-link" href="/#events">&larr; Back to event details</Link>
        <div className="eyebrow">3rd NRNA Cup &amp; Nepali Festival</div>
        <h1>{cat.label} Registration</h1>
        <div className="fee-line">Entry fee: {cat.fee}</div>

        <div className="pay-box">
          <h3>Step 1 — Pay the entry fee</h3>
          <p>Click below to pay via SumUp. Once paid, take a screenshot of the confirmation and come back to attach it in the form below.</p>
          <a className="pay-btn" href={cat.pay} target="_blank" rel="noopener noreferrer">Pay Entry Fee</a>
        </div>

        {status === "success" ? (
          <div className="form-message success">
            Thanks — your registration has been submitted. We&apos;ll be in touch by email to confirm.
          </div>
        ) : (
          <form className="reg-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="teamName">Team Name</label>
              <input type="text" id="teamName" name="teamName" required />
            </div>
            <div>
              <label htmlFor="contactName">Captain / Contact Name</label>
              <input type="text" id="contactName" name="contactName" required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div>
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" required />
            </div>
            <div>
              <label htmlFor="players">Number of Players</label>
              <input type="number" id="players" name="players" min={1} />
            </div>
            <div className="file-field">
              <label htmlFor="screenshot">Payment Screenshot</label>
              <input type="file" id="screenshot" name="screenshot" accept="image/*,.pdf" required />
              <p>Upload a screenshot or PDF confirmation of your SumUp payment (max 8MB).</p>
            </div>
            <div>
              <label htmlFor="notes">Notes (optional)</label>
              <textarea id="notes" name="notes" rows={3}></textarea>
            </div>

            {status === "error" && (
              <div className="form-message error">{errorMsg}</div>
            )}

            <button type="submit" className="submit-btn" disabled={status === "submitting"}>
              {status === "submitting" ? "Submitting…" : "Submit Registration"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
