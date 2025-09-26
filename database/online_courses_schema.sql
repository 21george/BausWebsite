-- SQL script to create online courses system tables in Supabase
-- Run this in the Supabase SQL Editor

-- Table for online courses
CREATE TABLE online_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    duration_hours INTEGER,
    level VARCHAR(50), -- beginner, intermediate, advanced
    thumbnail_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for course files (videos, PDFs)
CREATE TABLE course_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES online_courses(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL, -- video, pdf
    file_size_mb DECIMAL(10,2),
    storage_path TEXT NOT NULL, -- path in supabase storage
    file_order INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for course purchases
CREATE TABLE course_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES online_courses(id) ON DELETE CASCADE,
    customer_email VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    stripe_payment_intent_id VARCHAR(255) UNIQUE NOT NULL,
    stripe_session_id VARCHAR(255),
    amount_paid DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed
    download_token UUID DEFAULT gen_random_uuid(),
    download_expires_at TIMESTAMPTZ,
    download_count INTEGER DEFAULT 0,
    max_downloads INTEGER DEFAULT 5,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for download logs
CREATE TABLE download_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchase_id UUID REFERENCES course_purchases(id) ON DELETE CASCADE,
    file_id UUID REFERENCES course_files(id) ON DELETE CASCADE,
    download_ip VARCHAR(45),
    user_agent TEXT,
    downloaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_online_courses_active ON online_courses(is_active);
CREATE INDEX idx_course_files_course_id ON course_files(course_id);
CREATE INDEX idx_course_files_order ON course_files(course_id, file_order);
CREATE INDEX idx_course_purchases_email ON course_purchases(customer_email);
CREATE INDEX idx_course_purchases_token ON course_purchases(download_token);
CREATE INDEX idx_course_purchases_status ON course_purchases(payment_status);
CREATE INDEX idx_download_logs_purchase ON download_logs(purchase_id);

-- Enable Row Level Security
ALTER TABLE online_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_logs ENABLE ROW LEVEL SECURITY;

-- Policies for public access to active courses
CREATE POLICY "Allow public read access to active courses" ON online_courses
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read access to course files" ON course_files
    FOR SELECT USING (true);

-- Policies for course purchases (customers can view their own purchases)
CREATE POLICY "Allow customers to view their purchases" ON course_purchases
    FOR SELECT USING (true);

CREATE POLICY "Allow insert for new purchases" ON course_purchases
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update for payment processing" ON course_purchases
    FOR UPDATE USING (true);

-- Policies for download logs
CREATE POLICY "Allow insert for download tracking" ON download_logs
    FOR INSERT WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_online_courses_updated_at BEFORE UPDATE ON online_courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_purchases_updated_at BEFORE UPDATE ON course_purchases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Sample data for testing (optional)
INSERT INTO online_courses (title, description, price, duration_hours, level) VALUES
('Yoga Grundlagen', 'Lernen Sie die Grundlagen des Yoga mit professionellen Videos und Anleitungen.', 49.99, 5, 'beginner'),
('Fortgeschrittene Physiotherapie', 'Erweiterte Techniken für Physiotherapie-Profis.', 89.99, 8, 'advanced'),
('Heilkunde für Frauen Basics', 'Grundlagen der natürlichen Heilkunde speziell für Frauen.', 69.99, 6, 'intermediate');