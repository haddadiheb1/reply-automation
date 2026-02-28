import { NextResponse } from "next/server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

type UserBetaPayload = {
  full_name?: string;
  store_name?: string;
  instagram_page?: string;
  whatsapp_number?: string;
};

export async function POST(request: Request) {
  let payload: UserBetaPayload;

  try {
    payload = (await request.json()) as UserBetaPayload;
  } catch {
    return NextResponse.json(
      { error: "Corps de requête invalide." },
      { status: 400 }
    );
  }

  const fullName = payload.full_name?.trim() ?? "";
  const storeName = payload.store_name?.trim() ?? "";
  const instagramPage = payload.instagram_page?.trim() ?? "";
  const whatsappNumber = payload.whatsapp_number?.trim() ?? "";

  if (!fullName || !storeName || !instagramPage || !whatsappNumber) {
    return NextResponse.json(
      { error: "Tous les champs sont obligatoires." },
      { status: 400 }
    );
  }

  const whatsappRegex = /^[2945]\d{7}$/;
  if (!whatsappRegex.test(whatsappNumber)) {
    return NextResponse.json(
      {
        error:
          "Le numéro WhatsApp doit être un numéro tunisien valide (Ooredoo, Tunisie Telecom ou Orange) — 8 chiffres commençant par 2, 4, 5 ou 9.",
      },
      { status: 400 }
    );
  }

  const supabase = createServerSupabaseClient();

  const { error } = await supabase.from("user_beta").insert({
    full_name: fullName,
    store_name: storeName,
    instagram_page: instagramPage,
    whatsapp_number: whatsappNumber,
  });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        {
          error:
            "Store name, Instagram page ou numéro WhatsApp existe déjà.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Impossible d'enregistrer votre demande." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
