  import { createClient } from '@supabase/supabase-js';

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  export const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Database types
  export interface Database {
    public: {
      Tables: {
        profiles: {
          Row: {
            id: string;
            role: 'student' | 'tutor';
            first_name: string;
            last_name: string;
            phone?: string;
            avatar?: string;
            bio?: string;
            subjects?: string[];
            rating?: number;
            total_ratings?: number;
            created_at: string;
            updated_at: string;
          };
          Insert: {
            id: string;
            role: 'student' | 'tutor';
            first_name: string;
            last_name: string;
            phone?: string;
            avatar?: string;
            bio?: string;
            subjects?: string[];
          };
          Update: {
            first_name?: string;
            last_name?: string;
            phone?: string;
            avatar?: string;
            bio?: string;
            subjects?: string[];
          };
        };
        classes: {
          Row: {
            id: string;
            tutor_id: string;
            title: string;
            description: string;
            subject: string;
            scheduled_at: string;
            duration: number;
            max_students: number;
            price: number;
            status: 'scheduled' | 'live' | 'completed' | 'cancelled';
            meeting_link?: string;
            created_at: string;
            updated_at: string;
          };
          Insert: {
            tutor_id: string;
            title: string;
            description: string;
            subject: string;
            scheduled_at: string;
            duration: number;
            max_students: number;
            price: number;
            meeting_link?: string;
          };
          Update: {
            title?: string;
            description?: string;
            subject?: string;
            scheduled_at?: string;
            duration?: number;
            max_students?: number;
            price?: number;
            status?: 'scheduled' | 'live' | 'completed' | 'cancelled';
            meeting_link?: string;
          };
        };
        enrollments: {
          Row: {
            id: string;
            student_id: string;
            class_id: string;
            enrolled_at: string;
            status: 'enrolled' | 'completed' | 'cancelled';
          };
          Insert: {
            student_id: string;
            class_id: string;
          };
          Update: {
            status?: 'enrolled' | 'completed' | 'cancelled';
          };
        };
        assignments: {
          Row: {
            id: string;
            class_id: string;
            title: string;
            description: string;
            due_date: string;
            max_score: number;
            created_at: string;
            updated_at: string;
          };
          Insert: {
            class_id: string;
            title: string;
            description: string;
            due_date: string;
            max_score: number;
          };
          Update: {
            title?: string;
            description?: string;
            due_date?: string;
            max_score?: number;
          };
        };
        submissions: {
          Row: {
            id: string;
            assignment_id: string;
            student_id: string;
            content: string;
            file_url?: string;
            score?: number;
            feedback?: string;
            submitted_at: string;
            graded_at?: string;
          };
          Insert: {
            assignment_id: string;
            student_id: string;
            content: string;
            file_url?: string;
          };
          Update: {
            content?: string;
            file_url?: string;
            score?: number;
            feedback?: string;
            graded_at?: string;
          };
        };
        exams: {
          Row: {
            id: string;
            class_id: string;
            title: string;
            description: string;
            start_time: string;
            duration: number;
            total_marks: number;
            questions: any[];
            created_at: string;
            updated_at: string;
          };
          Insert: {
            class_id: string;
            title: string;
            description: string;
            start_time: string;
            duration: number;
            total_marks: number;
            questions: any[];
          };
          Update: {
            title?: string;
            description?: string;
            start_time?: string;
            duration?: number;
            total_marks?: number;
            questions?: any[];
          };
        };
        exam_attempts: {
          Row: {
            id: string;
            exam_id: string;
            student_id: string;
            answers: any[];
            score: number;
            started_at: string;
            completed_at?: string;
          };
          Insert: {
            exam_id: string;
            student_id: string;
            answers: any[];
            score: number;
            started_at: string;
            completed_at?: string;
          };
          Update: {
            answers?: any[];
            score?: number;
            completed_at?: string;
          };
        };
        ratings: {
          Row: {
            id: string;
            tutor_id: string;
            student_id: string;
            class_id: string;
            rating: number;
            comment?: string;
            created_at: string;
          };
          Insert: {
            tutor_id: string;
            student_id: string;
            class_id: string;
            rating: number;
            comment?: string;
          };
          Update: {
            rating?: number;
            comment?: string;
          };
        };
        subscriptions: {
          Row: {
            id: string;
            user_id: string;
            plan: 'basic' | 'premium' | 'pro';
            status: 'active' | 'cancelled' | 'expired';
            current_period_start: string;
            current_period_end: string;
            mpesa_transaction_id?: string;
            created_at: string;
            updated_at: string;
          };
          Insert: {
            user_id: string;
            plan: 'basic' | 'premium' | 'pro';
            status: 'active' | 'cancelled' | 'expired';
            current_period_start: string;
            current_period_end: string;
            mpesa_transaction_id?: string;
          };
          Update: {
            plan?: 'basic' | 'premium' | 'pro';
            status?: 'active' | 'cancelled' | 'expired';
            current_period_start?: string;
            current_period_end?: string;
            mpesa_transaction_id?: string;
          };
        };
      };
    };
  }