-- Additional SQL functions for the online course system
-- Run this in the Supabase SQL Editor after creating the main schema

-- Function to increment download count
CREATE OR REPLACE FUNCTION increment_download_count(purchase_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE course_purchases 
    SET 
        download_count = download_count + 1,
        updated_at = NOW()
    WHERE id = purchase_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean up expired purchases (optional, for maintenance)
CREATE OR REPLACE FUNCTION cleanup_expired_purchases()
RETURNS int AS $$
DECLARE
    deleted_count int;
BEGIN
    DELETE FROM course_purchases 
    WHERE download_expires_at < NOW() 
    AND payment_status = 'pending';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get purchase statistics (optional, for admin)
CREATE OR REPLACE FUNCTION get_course_statistics()
RETURNS TABLE (
    course_id UUID,
    course_title VARCHAR(255),
    total_purchases BIGINT,
    total_revenue NUMERIC,
    avg_price NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        oc.id,
        oc.title,
        COUNT(cp.id) as total_purchases,
        SUM(cp.amount_paid) as total_revenue,
        AVG(cp.amount_paid) as avg_price
    FROM online_courses oc
    LEFT JOIN course_purchases cp ON oc.id = cp.course_id 
        AND cp.payment_status = 'completed'
    GROUP BY oc.id, oc.title
    ORDER BY total_purchases DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create storage bucket for course files (run this separately if needed)
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('course-files', 'course-files', false);

-- Storage policy for course files (authenticated users can read)
-- CREATE POLICY "Authenticated users can view course files" ON storage.objects
-- FOR SELECT USING (bucket_id = 'course-files' AND auth.role() = 'authenticated');

-- Storage policy for uploading (admin only)
-- CREATE POLICY "Admin can upload course files" ON storage.objects
-- FOR INSERT WITH CHECK (bucket_id = 'course-files' AND auth.role() = 'authenticated');