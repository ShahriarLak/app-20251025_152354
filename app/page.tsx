'use client'

import { useState } from 'react'
import { Check, X, Star, Users, Zap, Shield, ArrowRight } from 'lucide-react'
import PricingCard from '@/components/PricingCard'
import FAQ from '@/components/FAQ'
import Header from '@/components/Header'

export interface PricingTier {
  id: string
  name: string
  price: {
    monthly: number
    yearly: number
  }
  description: string
  features: string[]
  limitations: string[]
  popular: boolean
  buttonText: string
  icon: React.ReactNode
}

const pricingTiers: PricingTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: {
      monthly: 9,
      yearly: 90
    },
    description: 'Perfect for individuals and small teams getting started',
    features: [
      'Up to 5 team members',
      '10GB storage',
      'Basic support',
      'Core features access',
      'Mobile app',
      'Basic analytics',
    ],
    limitations: [
      'Limited integrations',
      'Basic reporting only',
    ],
    popular: false,
    buttonText: 'Start Basic Plan',
    icon: <Users className="w-6 h-6" />
  },
  {
    id: 'pro',
    name: 'Pro',
    price: {
      monthly: 29,
      yearly: 290
    },
    description: 'Best for growing businesses that need advanced features',
    features: [
      'Up to 25 team members',
      '100GB storage',
      'Priority support',
      'Advanced features',
      'Mobile app',
      'Advanced analytics',
      'API access',
      'Custom integrations',
      'Team collaboration tools',
    ],
    limitations: [],
    popular: true,
    buttonText: 'Start Pro Plan',
    icon: <Zap className="w-6 h-6" />
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: {
      monthly: 99,
      yearly: 990
    },
    description: 'For large organizations with custom requirements',
    features: [
      'Unlimited team members',
      'Unlimited storage',
      '24/7 dedicated support',
      'All features included',
      'Mobile app',
      'Custom analytics',
      'Full API access',
      'Custom integrations',
      'Advanced team management',
      'SSO & SAML',
      'Custom onboarding',
      'SLA guarantee',
    ],
    limitations: [],
    popular: false,
    buttonText: 'Contact Sales',
    icon: <Shield className="w-6 h-6" />
  }
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState<boolean>(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    
    // Simulate plan selection (in real app, this would handle payment/signup)
    setTimeout(() => {
      alert(`Selected ${planId} plan! Redirecting to checkout...`)
      setSelectedPlan(null)
    }, 1000)
  }

  const calculateSavings = (monthly: number, yearly: number) => {
    const monthlyCost = monthly * 12
    const savings = monthlyCost - yearly
    const percentage = Math.round((savings / monthlyCost) * 100)
    return { amount: savings, percentage }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Simple, transparent{' '}
              <span className="text-primary-600">pricing</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Choose the perfect plan for your needs. Upgrade or downgrade at any time.
              All plans include a 14-day free trial.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12 animate-slide-up">
            <span className={`mr-3 text-sm font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                isYearly ? 'bg-primary-600' : 'bg-gray-200'
              }`}
              role="switch"
              aria-checked={isYearly}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`ml-3 text-sm font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
            {isYearly && (
              <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <Star className="w-3 h-3 mr-1" />
                Save up to 17%
              </span>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingTiers.map((tier, index) => {
              const savings = calculateSavings(tier.price.monthly, tier.price.yearly)
              return (
                <div
                  key={tier.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PricingCard
                    tier={tier}
                    isYearly={isYearly}
                    onSelect={() => handlePlanSelect(tier.id)}
                    isLoading={selectedPlan === tier.id}
                    savings={savings}
                  />
                </div>
              )
            })}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 animate-fade-in">
            <p className="text-sm text-gray-500 mb-8">
              Trusted by over 10,000+ companies worldwide
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="w-24 h-8 bg-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-600">COMPANY</span>
              </div>
              <div className="w-24 h-8 bg-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-600">BRAND</span>
              </div>
              <div className="w-24 h-8 bg-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-600">CORP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Comparison Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Compare all features
            </h2>
            <p className="text-lg text-gray-600">
              See exactly what's included in each plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">
                    Features
                  </th>
                  {pricingTiers.map((tier) => (
                    <th key={tier.id} className="text-center py-4 px-6 font-semibold text-gray-900">
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  'Team members',
                  'Storage',
                  'Support',
                  'Analytics',
                  'API access',
                  'Integrations',
                  'SSO & SAML'
                ].map((feature, index) => (
                  <tr key={feature} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-4 px-6 font-medium text-gray-900">{feature}</td>
                    {pricingTiers.map((tier) => (
                      <td key={`${tier.id}-${feature}`} className="py-4 px-6 text-center">
                        {getFeatureValue(feature, tier)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FAQ />

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of satisfied customers. Start your free trial today.
          </p>
          <button 
            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center"
            onClick={() => handlePlanSelect('pro')}
          >
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  )
}

function getFeatureValue(feature: string, tier: PricingTier) {
  switch (feature) {
    case 'Team members':
      if (tier.id === 'basic') return '5 members'
      if (tier.id === 'pro') return '25 members'
      return 'Unlimited'
    case 'Storage':
      if (tier.id === 'basic') return '10GB'
      if (tier.id === 'pro') return '100GB'
      return 'Unlimited'
    case 'Support':
      if (tier.id === 'basic') return 'Basic'
      if (tier.id === 'pro') return 'Priority'
      return '24/7 Dedicated'
    case 'Analytics':
      if (tier.id === 'basic') return <Check className="w-5 h-5 text-green-500 mx-auto" />
      return <Check className="w-5 h-5 text-green-500 mx-auto" />
    case 'API access':
      if (tier.id === 'basic') return <X className="w-5 h-5 text-red-500 mx-auto" />
      return <Check className="w-5 h-5 text-green-500 mx-auto" />
    case 'Integrations':
      if (tier.id === 'basic') return 'Limited'
      if (tier.id === 'pro') return 'Standard'
      return 'Custom'
    case 'SSO & SAML':
      if (tier.id === 'enterprise') return <Check className="w-5 h-5 text-green-500 mx-auto" />
      return <X className="w-5 h-5 text-red-500 mx-auto" />
    default:
      return <Check className="w-5 h-5 text-green-500 mx-auto" />
  }
}