import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de Confidentialité — Fly Reply",
  description:
    "Découvrez comment Fly Reply collecte, utilise et protège vos données personnelles.",
};

const LAST_UPDATED = "1er mars 2026";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* Header */}
      <header className="bg-slate-900 text-white py-14 px-6 text-center">
        <Link
          href="/"
          className="inline-block text-orange-400 text-sm font-semibold mb-6 hover:text-orange-300 transition-colors"
        >
          ← Retour à l&apos;accueil
        </Link>
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-3">
          Politique de Confidentialité
        </h1>
        <p className="text-slate-400 text-sm">Dernière mise à jour : {LAST_UPDATED}</p>
      </header>

      {/* Body */}
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-14 text-slate-700 leading-relaxed">

        {/* 1. Introduction */}
        <Section id="introduction" title="1. Introduction">
          <p>
            Bienvenue sur <strong>Fly Reply</strong> («&nbsp;nous&nbsp;», «&nbsp;notre&nbsp;»,
            «&nbsp;la Plateforme&nbsp;»). Fly Reply est un service SaaS qui aide les propriétaires
            de boutiques en ligne à répondre automatiquement aux commentaires et aux messages
            privés reçus sur leurs actifs Meta (pages Facebook et comptes professionnels
            Instagram) lors de campagnes publicitaires ou de publications organiques.
          </p>
          <p className="mt-4">
            La présente Politique de Confidentialité explique quelles données nous collectons,
            pourquoi nous les collectons, comment nous les utilisons et quels sont vos droits.
            Elle s&apos;applique à tous les utilisateurs de la Plateforme.
          </p>
          <p className="mt-4">
            En utilisant Fly Reply, vous acceptez les pratiques décrites dans cette politique.
            Si vous n&apos;acceptez pas ces pratiques, vous ne devez pas utiliser la Plateforme.
          </p>
        </Section>

        {/* 2. Responsable du traitement */}
        <Section id="controller" title="2. Responsable du traitement">
          <p>
            Le responsable du traitement de vos données personnelles est&nbsp;:
          </p>
          <div className="mt-4 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-sm space-y-1">
            <p><strong>Société&nbsp;:</strong> FlyReply</p>
            <p><strong>Pays&nbsp;:</strong> Tunisie</p>
            <p>
              <strong>Contact&nbsp;:</strong>{" "}
              <a
                href="mailto:privacy@flyreply.com"
                className="text-orange-500 hover:underline"
              >
                privacy@flyreply.com
              </a>
            </p>
          </div>
        </Section>

        {/* 3. Données collectées */}
        <Section id="data-collected" title="3. Données collectées">
          <p>Nous collectons deux catégories de données&nbsp;:</p>

          <h3 className="font-bold text-slate-900 mt-6 mb-2">
            3.1 Données collectées lors de l&apos;inscription à la bêta
          </h3>
          <p>
            Lorsque vous remplissez le formulaire d&apos;accès anticipé, nous enregistrons&nbsp;:
          </p>
          <ul className="mt-3 space-y-2 list-none">
            {[
              ["Nom complet", "full_name", "Identification de votre compte"],
              ["Nom de la boutique", "store_name", "Personnalisation et unicité du compte"],
              ["Page Instagram", "instagram_page", "Connexion à votre actif Meta"],
              ["Numéro WhatsApp", "whatsapp_number", "Contact direct et coordination bêta"],
            ].map(([label, field, purpose]) => (
              <li key={field} className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm">
                <span className="font-semibold text-slate-900">{label}</span>
                <code className="ml-2 text-xs bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">{field}</code>
                <span className="text-slate-500"> — {purpose}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-bold text-slate-900 mt-8 mb-2">
            3.2 Données collectées par l&apos;intégration Meta
          </h3>
          <p>
            Lorsque vous connectez votre compte Meta à Fly Reply, nous accédons aux
            données suivantes via l&apos;API Meta Graph, <strong>uniquement dans le cadre
            des permissions que vous nous accordez explicitement</strong>&nbsp;:
          </p>
          <ul className="mt-4 space-y-2 list-disc list-inside text-sm">
            <li>Identifiants et noms de vos Pages Facebook connectées</li>
            <li>Commentaires publics sur vos publications</li>
            <li>Messages privés entrants sur vos Pages Facebook</li>
            <li>Messages privés entrants sur vos comptes Instagram</li>
            <li>Commentaires sur vos publications Instagram</li>
            <li>Informations de base sur votre compte Instagram (identifiant, nom d&apos;utilisateur)</li>
            <li>Métadonnées de gestion de vos Pages (ex.&nbsp;: statut, configuration)</li>
          </ul>
          <p className="mt-4 text-sm text-slate-500">
            Nous n&apos;accédons jamais à vos données personnelles Facebook au-delà de ce
            qui est strictement nécessaire pour fournir le service.
          </p>
        </Section>

        {/* 4. Permissions Meta */}
        <Section id="meta-permissions" title="4. Permissions Meta API requises">
          <p>
            Fly Reply fonctionne via l&apos;<strong>API Meta Graph</strong>. Pour que le service
            opère correctement, vous devez autoriser les permissions suivantes lors de la
            connexion de votre compte Meta. Voici leur rôle précis&nbsp;:
          </p>
          <div className="mt-6 space-y-4">
            {[
              {
                perm: "pages_show_list",
                label: "Lister vos Pages",
                desc: "Permet à Fly Reply de détecter les Pages Facebook associées à votre compte afin que vous puissiez choisir celles à connecter.",
              },
              {
                perm: "pages_read_engagement",
                label: "Lire les interactions",
                desc: "Permet de lire les commentaires publiés sur vos publications pour identifier les messages nécessitant une réponse automatique.",
              },
              {
                perm: "pages_manage_engagement",
                label: "Gérer les interactions",
                desc: "Permet à Fly Reply de publier une réponse automatique sous les commentaires de vos Pages Facebook en votre nom.",
              },
              {
                perm: "pages_messaging",
                label: "Messages Facebook",
                desc: "Permet d'envoyer des messages privés (DM) automatiques aux personnes qui commentent ou contactent votre Page Facebook.",
              },
              {
                perm: "pages_manage_metadata",
                label: "Métadonnées des Pages",
                desc: "Permet de lire et gérer les paramètres de configuration de votre Page nécessaires au bon fonctionnement du service.",
              },
              {
                perm: "instagram_basic",
                label: "Accès de base Instagram",
                desc: "Fournit l'accès aux informations de base de votre compte Instagram professionnel (ID et nom d'utilisateur) pour l'initialisation de la connexion.",
              },
              {
                perm: "instagram_manage_comments",
                label: "Commentaires Instagram",
                desc: "Permet de lire les commentaires sur vos publications Instagram et d'y répondre automatiquement.",
              },
              {
                perm: "instagram_manage_messages",
                label: "Messages Instagram",
                desc: "Permet d'envoyer des DM automatiques aux personnes qui vous contactent ou commentent sur votre compte Instagram professionnel.",
              },
            ].map(({ perm, label, desc }) => (
              <div key={perm} className="border border-slate-200 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <code className="shrink-0 text-xs bg-orange-50 text-orange-700 border border-orange-200 px-2.5 py-1 rounded-lg font-mono mt-0.5">
                    {perm}
                  </code>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{label}</p>
                    <p className="text-slate-500 text-sm mt-1">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Vous pouvez révoquer ces permissions à tout moment depuis les paramètres
            de sécurité de votre compte Meta. La révocation désactivera les fonctions
            correspondantes dans Fly Reply.
          </p>
        </Section>

        {/* 5. Finalités */}
        <Section id="purposes" title="5. Finalités du traitement">
          <ul className="space-y-3 list-none text-sm">
            {[
              ["Fournir le service", "Répondre automatiquement aux commentaires et messages sur vos actifs Meta connectés."],
              ["Gestion de la bêta", "Sélectionner, contacter et onboarder les participants à notre programme bêta privé."],
              ["Amélioration du produit", "Analyser les performances des réponses automatiques pour améliorer les algorithmes du service."],
              ["Communication", "Vous contacter via WhatsApp pour les notifications du service, les mises à jour importantes et le support."],
              ["Sécurité et conformité", "Détecter et prévenir les abus, fraudes ou violations des conditions d'utilisation Meta."],
            ].map(([title, desc]) => (
              <li key={title as string} className="flex gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                <span><strong className="text-slate-900">{title} — </strong>{desc}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* 6. Base légale */}
        <Section id="legal-basis" title="6. Base légale du traitement">
          <p>Conformément aux principes RGPD et à la législation tunisienne applicable&nbsp;:</p>
          <ul className="mt-4 space-y-3 text-sm list-none">
            {[
              ["Consentement", "Accord explicite lors du remplissage du formulaire bêta et lors de l'autorisation des permissions Meta."],
              ["Exécution du contrat", "Traitement nécessaire à la fourniture du service demandé (réponses automatiques, gestion des messages)."],
              ["Intérêt légitime", "Amélioration du service, sécurité de la plateforme et prévention des abus."],
            ].map(([basis, desc]) => (
              <li key={basis as string} className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3">
                <p className="font-semibold text-slate-900">{basis}</p>
                <p className="text-slate-500 mt-1">{desc}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* 7. Partage des données */}
        <Section id="data-sharing" title="7. Partage et sous-traitants">
          <p>
            Nous ne vendons jamais vos données personnelles à des tiers. Nous pouvons
            partager vos données uniquement avec les sous-traitants suivants, dans le strict
            cadre de la fourniture du service&nbsp;:
          </p>
          <div className="mt-5 space-y-3 text-sm">
            {[
              ["Meta (Facebook / Instagram)", "Plateforme tierce sur laquelle opère le service via l'API Graph. Soumis à la politique de confidentialité de Meta."],
            ].map(([name, desc]) => (
              <div key={name as string} className="flex gap-3 border border-slate-200 rounded-xl px-5 py-3">
                <span className="font-semibold text-slate-900 shrink-0">{name}</span>
                <span className="text-slate-500">{desc}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* 8. Conservation */}
        <Section id="retention" title="8. Durée de conservation">
          <p>
            Vos données personnelles sont conservées <strong>tant que votre compte reste actif
            ou jusqu&apos;à ce que vous formuliez une demande de suppression</strong>. Après
            suppression&nbsp;:
          </p>
          <ul className="mt-4 space-y-2 list-disc list-inside text-sm">
            <li>Les données d&apos;inscription bêta sont supprimées de notre base de données dans un délai de <strong>30 jours</strong>.</li>
            <li>Les données Meta (commentaires, messages traités) ne sont pas stockées en dehors de l&apos;API Meta — elles restent sous la gouvernance de Meta.</li>
            <li>Les journaux système anonymisés peuvent être conservés jusqu&apos;à <strong>12 mois</strong> à des fins de sécurité.</li>
          </ul>
          <p className="mt-4 text-sm">
            Pour toute demande de suppression, contactez-nous à{" "}
            <a href="mailto:privacy@flyreply.com" className="text-orange-500 hover:underline">
              privacy@flyreply.com
            </a>.
          </p>
        </Section>

        {/* 9. Sécurité */}
        <Section id="security" title="9. Sécurité des données">
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées
            pour protéger vos données personnelles, notamment&nbsp;:
          </p>
          <ul className="mt-4 space-y-2 list-disc list-inside text-sm">
            <li>Chiffrement des données en transit (HTTPS/TLS) et au repos.</li>
            <li>Accès aux données de production limité au personnel autorisé uniquement.</li>
            <li>Clés API Meta et clés Supabase stockées dans des variables d&apos;environnement sécurisées, jamais exposées côté client.</li>
            <li>Validation et assainissement de toutes les entrées utilisateur côté serveur.</li>
          </ul>
        </Section>

        {/* 10. Droits */}
        <Section id="rights" title="10. Vos droits">
          <p>
            Conformément au RGPD et aux principes de protection des données applicables
            en Tunisie, vous disposez des droits suivants&nbsp;:
          </p>
          <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
            {[
              ["Droit d'accès", "Obtenir une copie des données personnelles que nous détenons sur vous."],
              ["Droit de rectification", "Corriger toute donnée inexacte ou incomplète vous concernant."],
              ["Droit à l'effacement", "Demander la suppression de vos données personnelles."],
              ["Droit à la portabilité", "Recevoir vos données dans un format structuré et lisible."],
              ["Droit d'opposition", "Vous opposer au traitement de vos données pour des motifs légitimes."],
              ["Retrait du consentement", "Retirer votre consentement à tout moment sans affecter la légalité du traitement antérieur."],
            ].map(([right, desc]) => (
              <div key={right as string} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="font-semibold text-slate-900">{right}</p>
                <p className="text-slate-500 mt-1">{desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm">
            Pour exercer l&apos;un de ces droits, écrivez-nous à{" "}
            <a href="mailto:privacy@flyreply.com" className="text-orange-500 hover:underline">
              privacy@flyreply.com
            </a>. Nous répondrons dans un délai de <strong>30 jours ouvrables</strong>.
          </p>
        </Section>

        {/* 11. Mineurs */}
        <Section id="minors" title="11. Mineurs">
          <p>
            Fly Reply est destiné aux professionnels et aux propriétaires de boutiques en ligne.
            Nous ne collectons pas sciemment de données auprès de personnes de moins de 18 ans.
            Si vous pensez que nous avons collecté des données d&apos;un mineur, contactez-nous
            immédiatement pour que nous procédions à leur suppression.
          </p>
        </Section>

        {/* 12. Modifications */}
        <Section id="updates" title="12. Modifications de la politique">
          <p>
            Nous pouvons mettre à jour cette politique à tout moment. En cas de modification
            significative, nous vous en informerons via WhatsApp ou par email avant que
            le changement ne prenne effet. Continuer à utiliser Fly Reply après notification
            vaut acceptation de la nouvelle politique.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Date de dernière mise à jour : <strong>{LAST_UPDATED}</strong>.
          </p>
        </Section>

        {/* 13. Contact */}
        <Section id="contact" title="13. Contact">
          <p>
            Pour toute question relative à cette politique ou au traitement de vos données
            personnelles, contactez notre responsable de la protection des données&nbsp;:
          </p>
          <div className="mt-4 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-sm space-y-1">
            <p><strong>Fly Reply — Protection des données</strong></p>
            <p>
              Email&nbsp;:{" "}
              <a href="mailto:privacy@flyreply.com" className="text-orange-500 hover:underline">
                privacy@flyreply.com
              </a>
            </p>
          </div>
        </Section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-500 text-center text-sm py-8 px-6">
        <p>© 2026 Fly Reply — Conçu pour les e-commerces tunisiens 🇹🇳</p>
        <p className="mt-2">
          <Link href="/" className="hover:text-slate-300 transition-colors">
            Accueil
          </Link>
          <span className="mx-3">·</span>
          <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
            Politique de confidentialité
          </Link>
        </p>
      </footer>

    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-4 pb-3 border-b border-slate-200">
        {title}
      </h2>
      {children}
    </section>
  );
}
