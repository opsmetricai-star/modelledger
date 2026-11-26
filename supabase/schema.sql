-- ModelLedger schema. Run in the Supabase SQL editor.
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.traces (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  name text not null,
  input text, output text,
  model text,
  latency_ms int not null default 0,
  tokens int not null default 0,
  cost numeric(10,6) not null default 0,
  status text not null default 'ok',
  spans jsonb not null default '[]',
  created_at timestamptz not null default now()
);
create index if not exists traces_user_created on public.traces(user_id, created_at desc);

create table if not exists public.evaluations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  prompt_template text not null,
  scorer text not null default 'contains',
  rows jsonb not null default '[]',
  results jsonb not null default '[]',
  score numeric(5,2),
  created_at timestamptz not null default now()
);

create table if not exists public.prompts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  body text not null,
  version int not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists public.monitors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  metric text not null check (metric in ('latency_ms','cost','error_rate')),
  threshold numeric not null,
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan text not null check (plan in ('free','starter','team','pro')),
  status text not null default 'pending' check (status in ('pending','active','cancelled')),
  requested_at timestamptz not null default now(),
  verified_at timestamptz
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text not null, message text not null,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;
alter table public.traces enable row level security;
alter table public.evaluations enable row level security;
alter table public.prompts enable row level security;
alter table public.monitors enable row level security;
alter table public.subscriptions enable row level security;
alter table public.contact_messages enable row level security;

do $$ declare t text; begin
  foreach t in array array['projects','traces','evaluations','prompts','monitors'] loop
    execute format('create policy "%1$s_own" on public.%1$s for all using (auth.uid() = user_id) with check (auth.uid() = user_id)', t);
  end loop;
end $$;

-- Users may read their subscriptions and request a pending one; only the service role can activate.
create policy "subs_read" on public.subscriptions for select using (auth.uid() = user_id);
create policy "subs_request" on public.subscriptions for insert with check (auth.uid() = user_id and status = 'pending');
-- contact_messages: inserts happen through the server route with the service role; no public policies.

-- Table privileges (newer Supabase projects do not grant these automatically).
-- RLS above still restricts every row to its owner.
grant usage on schema public to anon, authenticated, service_role;
grant select, insert, update, delete on public.projects, public.traces, public.evaluations, public.prompts, public.monitors to authenticated;
grant select, insert on public.subscriptions to authenticated;
grant all on all tables in schema public to service_role;

-- API keys for trace ingestion. Only a SHA-256 hash is stored; the key is shown once at creation.
create table if not exists public.api_keys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  prefix text not null,
  key_hash text not null unique,
  created_at timestamptz not null default now(),
  last_used_at timestamptz
);
alter table public.api_keys enable row level security;
create policy "api_keys_own" on public.api_keys for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
grant select, delete on public.api_keys to authenticated;
grant all on public.api_keys to service_role;
