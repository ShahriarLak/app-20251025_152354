'use client'

import { Check, X, Loader2 } from 'lucide-react'
import { PricingTier } from '@/app/page'
import clsx from 'clsx'

interface PricingCardProps {
  tier: PricingTier
  isYearly: boolean
  onSelect: () => void
  isLoading: boolean
  savings: {
    amount: number
    percentage: number
  }
}

export default function PricingCard({ 
  tier, 
  isYearly, 
  onSelect, 
  isLoading, 
  savings 
}: PricingCardProps) {
  const price = isYearly ? tier.price.yearly : tier.price.monthly
  const displayPrice = isYearly ? price / 12 : price

  return (
    <div
      className={clsx(
        'relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-200 hover:shadow-xl',
        tier.popular ? 'border-primary-500 shadow-primary-100' : 'border-gray-200'
      )}
    >
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-8">
        <div className="flex items-center mb-4">
          <div className={clsx(
            'p-2 rounded-lg mr-3',
            tier.popular ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
          )}>
            {tier.icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
        </div>

        <p className="text-gray-600 mb-6">{tier.description}</p>

        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-gray-900">
              ${displayPrice.toFixed(0)}
            </span>
            <span className="text-gray-600 ml-1">/month</span>
          </div>
          {isYearly && savings.amount > 0 && (
            <p className="text-sm text-green-600 mt-1">
              Save ${savings.amount} per year ({savings.percentage}% off)
            </p>
          )}
          {isYearly && (
            <p className="text-sm text-gray-500">
              Billed annually (${price})
            </p>
          )}
        </div>

        <button
          onClick={onSelect}
          disabled={isLoading}
          className={clsx(
            'w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center',
            tier.popular
              ? 'btn-primary'
              : 'btn-secondary',
            isLoading && 'opacity-50 cursor-not-allowed'
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            tier.buttonText
          )}
        </button>

        <div className="mt-8">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            What's included:
          </h4>
          <ul className="space-y-3">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 text-sm">{feature}</span>
              </li>
            ))}
            {tier.limitations.map((limitation) => (
              <li key={limitation} className="flex items-start">
                <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-500 text-sm">{limitation}</span>
              </li>
            ))}
          </ul>
        </div>

        {tier.name === 'Enterprise' && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">
              Need a custom solution? Contact our sales team for enterprise pricing and features.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}