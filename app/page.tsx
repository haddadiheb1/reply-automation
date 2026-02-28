"use client";

import { useState } from "react";

type FormData = {
  name: string;
  storeName: string;
  instagramPage: string;
  phone: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Le nom est requis.";
  if (!data.storeName.trim())
    errors.storeName = "Le nom de la boutique est requis.";
  if (!data.instagramPage.trim())
    errors.instagramPage = "La page Instagram est requise.";
  if (!data.phone.trim()) {
    errors.phone = "Le numéro WhatsApp est requis.";
  } else if (!/^[2945]\d{7}$/.test(data.phone.trim())) {
    errors.phone = "Numéro invalide. Utilisez un numéro Ooredoo, Tunisie Telecom ou Orange (8 chiffres).";
  }
  return errors;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    storeName: "",
    instagramPage: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/user-beta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.name,
          store_name: formData.storeName,
          instagram_page: formData.instagramPage,
          whatsapp_number: formData.phone,
        }),
      });

      if (!response.ok) {
        const responseData = (await response.json()) as { error?: string };
        setSubmitError(responseData.error ?? "Une erreur est survenue.");
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Impossible d'envoyer le formulaire pour le moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () =>
    document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" });

  const inputCls = (err: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-slate-900 placeholder-slate-400 text-sm transition-colors outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 ${
      err ? "border-rose-300 bg-rose-50" : "border-slate-200 bg-white hover:border-slate-300"
    }`;

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-orange-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 py-28 text-center">
          <span className="inline-flex items-center gap-2 bg-orange-500/15 text-orange-300 border border-orange-500/25 text-sm font-semibold px-4 py-1.5 rounded-full mb-8">
            Lancement en Tunisie
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
            Arrêtez de perdre des ventes
            <br className="hidden sm:block" />
            {" dans vos "}
            <span className="text-orange-400">commentaires</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Répondez automatiquement aux commentaires «&nbsp;Prix&nbsp;?&nbsp;» et envoyez des DM
            qui transforment les visiteurs en vraies commandes — sans recruter un community manager.
          </p>
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold text-base sm:text-lg px-8 py-4 rounded-full shadow-lg shadow-orange-500/25 transition-all duration-200 hover:scale-105 cursor-pointer"
          >
            👉 Rejoindre la Bêta 
          </button>
          <p className="mt-5 text-slate-500 text-sm">Lancement d&apos;abord en Tunisie</p>
        </div>
      </section>

      {/* ── PROBLEM ─────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block bg-red-100 text-red-600 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
              Le problème
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Chaque jour, vous perdez de l&apos;argent
              <br className="hidden sm:block" /> dans les commentaires.
            </h2>
          </div>

          {/* Step 1 — The setup */}
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-start gap-4">
              <span className="text-3xl flex-shrink-0">📣</span>
              <div>
                <p className="font-bold text-slate-900 text-lg mb-1">Vous lancez des publicités</p>
                <p className="text-slate-500 text-sm leading-relaxed">Vous investissez votre budget, vos posts tournent, le trafic arrive.</p>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-start gap-4">
              <span className="text-3xl flex-shrink-0">💬</span>
              <div>
                <p className="font-bold text-slate-900 text-lg mb-1">100+ commentaires débarquent</p>
                <p className="text-slate-500 text-sm leading-relaxed">Des centaines de personnes réagissent et posent des questions.</p>
              </div>
            </div>
          </div>

          {/* Step 2 — Comment types */}
          <div className="bg-slate-800 rounded-3xl p-8 mb-4">
            <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-5">Ce que vos clients écrivent</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { msg: "« Prix ? »", sub: "La question #1" },
                { msg: "« Combien ? »", sub: "Variante fréquente" },
                { msg: "« Détails ? »", sub: "Intérêt fort" },
                { msg: "« DM moi »", sub: "Prêt à acheter" },
              ].map(({ msg, sub }) => (
                <div key={msg} className="bg-white/[0.08] border border-white/[0.08] rounded-xl p-4 text-center">
                  <p className="font-bold text-white text-base mb-1">{msg}</p>
                  <p className="text-slate-400 text-xs">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3 — What goes wrong */}
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            {[
              { icon: "⏱️", title: "Vous répondez trop lentement", body: "Le temps de voir le commentaire, le client a déjà scrollé vers un concurrent." },
              { icon: "👁️‍🗨️", title: "Votre équipe rate des messages", body: "Avec 100+ comments par post, aucun humain ne peut tout suivre manuellement." },
              { icon: "🌙", title: "Vous n'êtes pas disponible 24h/24", body: "Les clients commentent la nuit, le weekend, pendant vos heures de repos." },
              { icon: "✍️", title: "Vous répondez manuellement", body: "Copier-coller les prix, envoyer les DM un par un… c'est du temps volé à votre vrai travail : faire grandir votre boutique." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="border border-slate-200 bg-slate-50 rounded-2xl p-6">
                <span className="text-2xl mb-3 block">{icon}</span>
                <p className="font-bold text-slate-900 mb-2 leading-snug">{title}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <div className="bg-slate-900 rounded-2xl p-8 text-center">
            <p className="text-white font-extrabold text-xl sm:text-2xl mb-2">
              Résultat&nbsp;? Ces clients achètent chez quelqu&apos;un d&apos;autre.
            </p>
            <p className="text-slate-400 text-base">
              👉 Commentaires sans réponse&nbsp;= Argent laissé sur la table.
            </p>
          </div>

        </div>
      </section>

      {/* ── AGITATION ───────────────────────────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-200 py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block bg-slate-200 text-slate-600 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
            Faites le calcul
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-14 text-slate-900">
            Combien perdez-vous réellement&nbsp;?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { number: "200", label: "commentaires par publication" },
              { number: "20 %", label: "demandent le prix" },
              { number: "10 %", label: "prêts à acheter" },
            ].map(({ number, label }) => (
              <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <p className="text-4xl font-extrabold text-orange-500 mb-2">{number}</p>
                <p className="text-sm text-slate-500">{label}</p>
              </div>
            ))}
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-xl mx-auto shadow-sm">
            <p className="text-xl font-bold text-slate-900 mb-2">
              Vous ignorez littéralement des acheteurs confirmés.
            </p>
            <p className="text-slate-500 mb-4">Ce n&apos;est pas un problème de marketing.</p>
            <p className="text-2xl font-extrabold text-orange-500">
              C&apos;est un problème de système.
            </p>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
            La solution
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
            Transformez chaque «&nbsp;Prix&nbsp;?&nbsp;» en lead
            <br className="hidden sm:block" /> automatiquement.
          </h2>
          <p className="text-slate-500 text-lg mb-14">Voici comment ça marche&nbsp;:</p>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { step: "1", title: "Un client commente « Prix\u00a0? »", desc: "Sur Instagram ou Facebook" },
              { step: "2", title: "Notre système répond instantanément", desc: "En quelques secondes" },
              { step: "3", title: "Il reçoit un DM prêt à commander", desc: "Conversion automatique" },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left">
                <div className="w-11 h-11 rounded-full bg-orange-500 text-white font-extrabold text-lg flex items-center justify-center mb-4">
                  {step}
                </div>
                <p className="font-bold text-slate-900 mb-1">{title}</p>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {["Aucun délai.", "Aucun commentaire manqué.", "Aucun copier-coller manuel."].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-semibold px-4 py-2 rounded-full">
                ✓ {t}
              </span>
            ))}
          </div>
          <p className="text-slate-500 font-medium text-sm">
            Fonctionne 24h/24 et 7j/7 sur Instagram &amp; Facebook.
          </p>
        </div>
      </section>



      {/* ── SOCIAL PROOF ────────────────────────────────────────── */}
      <section className="bg-slate-900 py-24">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <span className="inline-block bg-orange-500/20 text-orange-300 border border-orange-500/25 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full">
            🇹🇳 Conçu pour les e-commerces tunisiens
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Construit spécialement pour les boutiques tunisiennes
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Nous avons analysé des centaines de publicités avec 500+ commentaires et aucune réponse.
          </p>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Les boutiques perdent des milliers de dinars par mois.
          </p>
          <div className="inline-block bg-orange-500 text-white font-extrabold text-xl px-8 py-4 rounded-2xl">
            Nous allons changer ça. Bêta limitée à 20 boutiques.
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-lg mx-auto px-6 text-center">
          <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
            Offre Bêta Exclusive
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-10">
            Une offre que vous ne reverrez pas
          </h2>
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-lg shadow-slate-100">
            <p className="text-slate-400 line-through text-lg mb-2">Prix futur : 139 DT/mois</p>
            <div className="flex items-end justify-center gap-2 mb-3">
              <span className="text-6xl font-extrabold text-slate-900">89</span>
              <div className="text-left pb-2">
                <p className="text-orange-500 font-bold text-lg">DT</p>
                <p className="text-slate-400 text-sm">/mois</p>
              </div>
            </div>
            <span className="inline-block bg-amber-100 text-amber-700 font-bold text-sm px-4 py-1.5 rounded-full mb-6">
              🔒 Verrouillé à vie
            </span>
            <div className="border-t border-slate-100 pt-6 mb-6">
              <p className="text-slate-500 text-sm leading-relaxed">
                Uniquement pour les 20 premières boutiques. Nous voulons des retours
                de vrais vendeurs avant le lancement public.
              </p>
            </div>
            <button
              onClick={scrollToForm}
              className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold text-base py-4 rounded-full shadow-lg shadow-orange-200 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              👉 Réserver Ma Place
            </button>
            <p className="mt-3 text-slate-400 text-xs">Seulement 20 places disponibles</p>
          </div>
        </div>
      </section>

      {/* ── FORM CTA ────────────────────────────────────────────── */}
      <section id="form-section" className="bg-slate-50 py-24">
        <div className="max-w-xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
              Rejoindre la bêta
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
              Prêt à arrêter de perdre des ventes&nbsp;?
            </h2>
            <p className="text-slate-500 text-lg">
              Rejoignez la liste de la bêta privée ci-dessous.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white border-2 border-emerald-400 rounded-3xl p-10 text-center shadow-xl shadow-emerald-50">
              <p className="text-5xl mb-4">✅</p>
              <p className="text-2xl font-extrabold text-slate-900 mb-2">Votre place est réservée !</p>
              <p className="text-slate-500 max-w-sm mx-auto">
                Nous allons contacter personnellement les boutiques sélectionnées.
                Restez à l&apos;écoute !
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-md shadow-slate-100 border border-slate-100 p-8">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">Nom complet</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={inputCls(!!errors.name)}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Store Name */}
                  <div>
                    <label htmlFor="storeName" className="block text-sm font-semibold text-slate-700 mb-1.5">Nom de la boutique</label>
                    <input
                      id="storeName"
                      type="text"
                      placeholder="Nom de votre boutique en ligne"
                      value={formData.storeName}
                      onChange={(e) => handleChange("storeName", e.target.value)}
                      className={inputCls(!!errors.storeName)}
                    />
                    {errors.storeName && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.storeName}</p>
                    )}
                  </div>

                  {/* Instagram Page */}
                  <div>
                    <label htmlFor="instagramPage" className="block text-sm font-semibold text-slate-700 mb-1.5">Page Instagram</label>
                    <input
                      id="instagramPage"
                      type="text"
                      placeholder="@votreboutique"
                      value={formData.instagramPage}
                      onChange={(e) => handleChange("instagramPage", e.target.value)}
                      className={inputCls(!!errors.instagramPage)}
                    />
                    {errors.instagramPage && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.instagramPage}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1.5">Numéro WhatsApp</label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+216 XX XXX XXX"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className={inputCls(!!errors.phone)}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 hover:bg-orange-400 disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-bold text-base py-4 rounded-full shadow-lg shadow-orange-200 transition-all duration-200 hover:scale-[1.02] mt-2 cursor-pointer"
                  >
                    {isSubmitting ? "Envoi en cours..." : "👉 Réserver Ma Place"}
                  </button>
                  {submitError && (
                    <p className="text-xs text-center text-red-500">{submitError}</p>
                  )}
                  <p className="text-xs text-center text-slate-400 pt-1">
                    Nous allons contacter personnellement les boutiques sélectionnées.
                  </p>
                </form>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-slate-500 text-center text-sm py-8">
        <p>© 2026 ReplyAutomation — Conçu pour les e-commerces tunisiens 🇹🇳</p>
      </footer>
    </div>
  );
}
