create table if not exists public.user_beta (
  id bigserial primary key,
  full_name text not null,
  store_name text not null unique,
  instagram_page text not null unique,
  whatsapp_number text not null unique,
  created_at timestamptz not null default now()
);
