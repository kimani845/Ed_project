import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpen, 
  Video, 
  Users, 
  Award, 
  Clock, 
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
  Play
} from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Video,
      title: 'Live Video Classes',
      description: 'Interactive video conferencing with screen sharing, reactions, and real-time chat.'
    },
    {
      icon: Users,
      title: 'Expert Tutors',
      description: 'Learn from qualified Kenyan educators with proven track records.'
    },
    {
      icon: Award,
      title: 'Assessments & Progress',
      description: 'Track your learning progress with assignments, exams, and detailed analytics.'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Book classes that fit your schedule, available 24/7 for your convenience.'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Safe and convenient payments through M-PESA integration.'
    },
    {
      icon: BookOpen,
      title: 'Rich Learning Materials',
      description: 'Access comprehensive study materials and resources for all subjects.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Wanjiku',
      role: 'Form 4 Student',
      content: 'EduConnect helped me improve my mathematics grades significantly. The tutors are amazing!',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'James Kiprotich',
      role: 'University Student',
      content: 'The flexibility to learn from anywhere has been a game-changer for my studies.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Grace Achieng',
      role: 'Parent',
      content: 'My daughter loves the interactive classes. Her confidence in science has grown tremendously.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Active Students' },
    { number: '150+', label: 'Expert Tutors' },
    { number: '50+', label: 'Subjects Covered' },
    { number: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Learn Without
                <span className="block text-secondary-300">Limits</span>
              </h1>
              <p className="text-xl text-primary-100 max-w-lg">
                Connect with Kenya's best tutors through our interactive online platform. 
                Master any subject with personalized learning experiences.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <Link
                    to={`/${user.role}`}
                    className="btn btn-secondary inline-flex items-center justify-center space-x-2 text-lg px-8 py-4"
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="bg-white text-primary-600 hover:bg-gray-50 inline-flex items-center justify-center space-x-2 text-lg px-8 py-4 rounded-md font-medium transition-colors"
                    >
                      <span>Start Learning</span>
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                    <Link
                      to="/login"
                      className="border-2 border-white text-white hover:bg-white hover:text-primary-600 inline-flex items-center justify-center space-x-2 text-lg px-8 py-4 rounded-md font-medium transition-colors"
                    >
                      <span>Sign In</span>
                    </Link>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-8 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-secondary-300">{stat.number}</div>
                    <div className="text-sm text-primary-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8">
                <div className="aspect-video bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                  <Play className="h-16 w-16 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Interactive Live Classes
                </h3>
                <p className="text-gray-600">
                  Experience real-time learning with video, audio, screen sharing, and interactive tools.
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-400 to-secondary-600 rounded-2xl transform rotate-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EduConnect Kenya?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need for successful online learning, 
              designed specifically for Kenyan students and educators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sign Up</h3>
              <p className="text-gray-600">
                Create your account as a student or tutor and complete your profile.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose Classes</h3>
              <p className="text-gray-600">
                Browse available classes and enroll in subjects that interest you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Start Learning</h3>
              <p className="text-gray-600">
                Join live classes, complete assignments, and track your progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from real students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Kenyan students who are already achieving their academic goals with EduConnect.
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-primary-600 hover:bg-gray-50 inline-flex items-center justify-center space-x-2 text-lg px-8 py-4 rounded-md font-medium transition-colors"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/subscription"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 inline-flex items-center justify-center space-x-2 text-lg px-8 py-4 rounded-md font-medium transition-colors"
              >
                <span>View Pricing</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;