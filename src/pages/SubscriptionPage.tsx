import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Check, Star, Zap, Crown, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';

const SubscriptionPage = () => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'pro'>('premium');
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const plans = [
    {
      id: 'basic' as const,
      name: 'Basic',
      price: 500,
      period: 'month',
      icon: Star,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      features: [
        'Access to 5 classes per month',
        'Basic assignments and quizzes',
        'Email support',
        'Mobile app access',
        'Basic progress tracking',
      ],
      limitations: [
        'Limited to 5 classes monthly',
        'No priority support',
        'No advanced features',
      ],
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      price: 1200,
      period: 'month',
      icon: Zap,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      popular: true,
      features: [
        'Unlimited class access',
        'All assignments and exams',
        'Priority email & chat support',
        'Mobile app access',
        'Advanced progress analytics',
        'Downloadable resources',
        'Certificate of completion',
      ],
      limitations: [],
    },
    {
      id: 'pro' as const,
      name: 'Pro',
      price: 2000,
      period: 'month',
      icon: Crown,
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50',
      borderColor: 'border-secondary-200',
      features: [
        'Everything in Premium',
        'One-on-one tutoring sessions',
        '24/7 priority support',
        'Custom learning paths',
        'Advanced analytics dashboard',
        'Exclusive masterclasses',
        'Career guidance sessions',
        'Early access to new features',
      ],
      limitations: [],
    },
  ];

  const handleSubscribe = async () => {
    if (!user) {
      toast.error('Please log in to subscribe');
      return;
    }

    if (!phoneNumber) {
      toast.error('Please enter your M-PESA phone number');
      return;
    }

    // Validate Kenyan phone number format
    const phoneRegex = /^(\+254|254|0)?[17]\d{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error('Please enter a valid Kenyan phone number');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate M-PESA payment process
      const plan = plans.find(p => p.id === selectedPlan);
      
      // In a real implementation, this would call your backend API
      // which would then initiate the M-PESA STK push
      const response = await fetch('/api/payments/mpesa/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`, // Replace with actual auth token
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber.replace(/^(\+254|254)/, '0').replace(/^0/, '254'),
          amount: plan?.price,
          plan: selectedPlan,
          userId: user.id,
        }),
      });

      if (response.ok) {
        toast.success('Payment request sent! Please check your phone for M-PESA prompt.');
        // You would typically redirect to a payment status page or show a loading state
      } else {
        throw new Error('Payment initiation failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as Kenyan number
    if (digits.startsWith('254')) {
      return '+' + digits;
    } else if (digits.startsWith('0')) {
      return '+254' + digits.slice(1);
    } else if (digits.length <= 9) {
      return '+254' + digits;
    }
    
    return value;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Learning Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock your potential with our flexible subscription plans. 
            Pay securely with M-PESA and start learning immediately.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;
            
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all cursor-pointer ${
                  isSelected 
                    ? plan.borderColor + ' ring-4 ring-opacity-20 ' + plan.bgColor.replace('bg-', 'ring-')
                    : 'border-gray-200 hover:border-gray-300'
                } ${plan.popular ? 'scale-105' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-3 rounded-full ${plan.bgColor}`}>
                      <Icon className={`h-8 w-8 ${plan.color}`} />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                    {plan.name}
                  </h3>
                  
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      KSh {plan.price.toLocaleString()}
                    </span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      isSelected
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment Section */}
        {user && (
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-4">
                <Smartphone className="h-8 w-8 text-green-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">M-PESA Payment</span>
              </div>
              <p className="text-gray-600">
                Pay securely with M-PESA for instant access
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  M-PESA Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                  placeholder="+254712345678"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter your Safaricom number to receive payment prompt
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">
                    {plans.find(p => p.id === selectedPlan)?.name} Plan
                  </span>
                  <span className="font-bold text-gray-900">
                    KSh {plans.find(p => p.id === selectedPlan)?.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Monthly subscription • Auto-renewal
                </p>
              </div>

              <button
                onClick={handleSubscribe}
                disabled={loading || !phoneNumber}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Pay KSh ${plans.find(p => p.id === selectedPlan)?.price.toLocaleString()} with M-PESA`
                )}
              </button>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                  You can cancel anytime from your account settings.
                </p>
              </div>
            </div>
          </div>
        )}

        {!user && (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Please log in to subscribe to a plan
            </p>
            <a
              href="/login"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Sign In to Continue
            </a>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                How does M-PESA payment work?
              </h3>
              <p className="text-gray-600">
                After clicking "Pay with M-PESA", you'll receive an STK push notification on your phone. 
                Enter your M-PESA PIN to complete the payment. Your subscription will be activated immediately.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time from your account settings. 
                You'll continue to have access until the end of your current billing period.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                What happens if my payment fails?
              </h3>
              <p className="text-gray-600">
                If your payment fails, you can retry immediately. Make sure you have sufficient balance 
                in your M-PESA account and that your phone number is correct.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;