-- 001_create_tables.sql

-- USERS / PROFILES
create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    role text check (role in ('student', 'tutor')) not null,
    first_name text not null,
    last_name text not null,
    phone text,
    avatar text,
    bio text,
    subjects text[],
    rating float,
    total_ratings int default 0,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- CLASSES
create table public.classes (
    id uuid primary key,
    tutor_id uuid references public.profiles(id) on delete set null,
    title text not null,
    description text not null,
    subject text not null,
    scheduled_at timestamptz not null,
    duration int not null, -- in minutes
    max_students int not null,
    price numeric not null,
    status text check (status in ('scheduled', 'live', 'completed', 'cancelled')) default 'scheduled',
    meeting_link text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- ENROLLMENTS
create table public.enrollments (
    id uuid primary key,
    class_id uuid references public.classes(id) on delete cascade,
    student_id uuid references public.profiles(id) on delete cascade,
    enrolled_at timestamptz default now()
);

-- ASSIGNMENTS
create table public.assignments (
    id uuid primary key,
    class_id uuid references public.classes(id) on delete cascade,
    title text not null,
    description text not null,
    due_date timestamptz not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- SUBMISSIONS
create table public.submissions (
    id uuid primary key,
    assignment_id uuid references public.assignments(id) on delete cascade,
    student_id uuid references public.profiles(id) on delete cascade,
    content text,
    submitted_at timestamptz default now(),
    grade float,
    feedback text
);
