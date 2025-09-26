-- SQL script to create the kurse_registrations table in Supabase
-- Run this in the Supabase SQL Editor

CREATE TABLE kurse_registrations (
    id SERIAL PRIMARY KEY,
    vorname VARCHAR(100) NOT NULL,
    nachname VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefon VARCHAR(50),
    geburtsdatum DATE,
    adresse VARCHAR(255),
    plz VARCHAR(20),
    stadt VARCHAR(100),
    kurs VARCHAR(255),
    nachricht TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX idx_kurse_registrations_email ON kurse_registrations(email);

-- Create an index on created_at for sorting
CREATE INDEX idx_kurse_registrations_created_at ON kurse_registrations(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE kurse_registrations ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for authenticated users
-- You may want to adjust this based on your security requirements
CREATE POLICY "Allow all for authenticated users" ON kurse_registrations
    FOR ALL USING (auth.role() = 'authenticated');

-- Alternative: Create a policy that allows anyone to insert (for public forms)
-- and only authenticated users to read/update/delete
-- CREATE POLICY "Allow insert for everyone" ON kurse_registrations
--     FOR INSERT WITH CHECK (true);
-- 
-- CREATE POLICY "Allow all for authenticated users" ON kurse_registrations
--     FOR SELECT, UPDATE, DELETE USING (auth.role() = 'authenticated');