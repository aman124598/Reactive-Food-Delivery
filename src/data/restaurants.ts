import type { Restaurant } from '../types';

export const restaurants: Restaurant[] = [
  {
    id: '101',
    name: 'Spice Route Kitchen',
    category: 'Indian',
    price: 14.99,
    rating: 4.8,
    eta: '20-25 min',
    description: 'Aromatic curries, tandoori platters, and butter naan made fresh to order.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '123',
    name: 'Urban Sushi Lab',
    category: 'Japanese',
    price: 19.5,
    rating: 4.9,
    eta: '15-20 min',
    description: 'Chef-driven sushi rolls, sashimi sets, and warm ramen bowls.',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '208',
    name: 'Green Bowl Co.',
    category: 'Healthy',
    price: 11.25,
    rating: 4.7,
    eta: '10-18 min',
    description: 'Fresh grain bowls, smoothies, and nourishing lunch boxes.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '309',
    name: 'Neon Pizza Bar',
    category: 'Italian',
    price: 16.75,
    rating: 4.6,
    eta: '25-30 min',
    description: 'Hand-stretched sourdough pizzas baked with classic and bold toppings.',
    image: 'https://images.unsplash.com/photo-1548365328-8b849e6f5f2b?auto=format&fit=crop&w=900&q=80',
  },
];
