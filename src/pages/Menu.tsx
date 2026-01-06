import { useState } from 'react';
import './Menu.css';

type MenuCategory = 'all' | 'coffee' | 'espresso' | 'specialty' | 'unserious';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: MenuCategory;
  isUnserious?: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'The Basic Bitch',
    description: 'Just coffee. No frills. No BS. Sometimes that\'s all you need.',
    price: '$3.50',
    category: 'coffee',
  },
  {
    id: '2',
    name: 'Espresso Shot',
    description: 'Pure, unadulterated caffeine. For when you need to feel alive again.',
    price: '$2.50',
    category: 'espresso',
  },
  {
    id: '3',
    name: 'Cortado',
    description: 'Equal parts espresso and steamed milk. Balanced, like your life should be.',
    price: '$4.00',
    category: 'espresso',
  },
  {
    id: '4',
    name: 'Cappuccino',
    description: 'Classic. Timeless. Like your favorite pair of jeans.',
    price: '$4.50',
    category: 'espresso',
  },
  {
    id: '5',
    name: 'Latte',
    description: 'Smooth, creamy, and way too easy to drink. Just like your problems.',
    price: '$5.00',
    category: 'espresso',
  },
  {
    id: '6',
    name: 'Cold Brew',
    description: 'Brewed cold, served cold. For those who like their coffee like their attitude.',
    price: '$4.50',
    category: 'coffee',
  },
  {
    id: '7',
    name: 'The "I Can\'t Even"',
    description: 'Quad shot espresso with a splash of "give me strength". For emergencies only.',
    price: '$5.50',
    category: 'unserious',
    isUnserious: true,
  },
  {
    id: '8',
    name: 'The Monday Morning',
    description: 'Double shot, extra strong, served with a side of existential dread.',
    price: '$5.00',
    category: 'unserious',
    isUnserious: true,
  },
  {
    id: '9',
    name: 'The "It\'s Fine"',
    description: 'Triple shot latte with extra foam. Because sometimes you need to pretend everything is okay.',
    price: '$6.00',
    category: 'unserious',
    isUnserious: true,
  },
  {
    id: '10',
    name: 'Matcha Latte',
    description: 'For when you want to feel healthy but still need caffeine.',
    price: '$5.50',
    category: 'specialty',
  },
  {
    id: '11',
    name: 'Chai Latte',
    description: 'Spicy, sweet, and comforting. Like a hug in a cup.',
    price: '$5.00',
    category: 'specialty',
  },
  {
    id: '12',
    name: 'Americano',
    description: 'Espresso and hot water. Simple. Effective. No nonsense.',
    price: '$3.50',
    category: 'espresso',
  },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');

  const categories: { id: MenuCategory; label: string }[] = [
    { id: 'all', label: 'Everything' },
    { id: 'coffee', label: 'Coffee' },
    { id: 'espresso', label: 'Espresso' },
    { id: 'specialty', label: 'Specialty' },
    { id: 'unserious', label: 'Unserious Picks' },
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const unseriousPicks = menuItems.filter(item => item.isUnserious);

  return (
    <div className="menu-page">
      <div className="menu-hero">
        <div className="menu-hero-content">
          <h1>Our Menu</h1>
          <p className="menu-hero-subtitle">Serious coffee. Unserious names. Zero pretension.</p>
        </div>
      </div>

      <section className="menu-section">
        <div className="container">
          {/* Unserious Picks Highlight */}
          {unseriousPicks.length > 0 && (
            <div className="unserious-picks-section">
              <div className="unserious-header">
                <h2>🔥 Unserious Picks</h2>
                <p className="unserious-subtitle">For when regular coffee just won't cut it</p>
              </div>
              <div className="unserious-grid">
                {unseriousPicks.map((item) => (
                  <div key={item.id} className="menu-item unserious-item">
                    <div className="menu-item-badge">Unserious</div>
                    <h3>{item.name}</h3>
                    <p className="menu-item-description">{item.description}</p>
                    <div className="menu-item-price">{item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category Tabs */}
          <div className="menu-categories">
            <div className="category-tabs">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="menu-grid">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className={`menu-item ${item.isUnserious ? 'unserious-item' : ''}`}
              >
                {item.isUnserious && (
                  <div className="menu-item-badge">Unserious</div>
                )}
                <h3>{item.name}</h3>
                <p className="menu-item-description">{item.description}</p>
                <div className="menu-item-price">{item.price}</div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="empty-state">
              <p>Nothing here yet. Check back soon (or don't, we're not your boss).</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

