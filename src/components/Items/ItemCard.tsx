import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Tag, User } from 'lucide-react';
import { Item } from '../../types';

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'free': return 'bg-green-100 text-green-800';
      case 'swap': return 'bg-blue-100 text-blue-800';
      case 'rent': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'New': return 'bg-emerald-100 text-emerald-800';
      case 'Like New': return 'bg-blue-100 text-blue-800';
      case 'Good': return 'bg-yellow-100 text-yellow-800';
      case 'Fair': return 'bg-orange-100 text-orange-800';
      case 'Poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 168) { // 7 days
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Link
      to={`/item/${item.id}`}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
    >
      <div className="aspect-w-16 aspect-h-12 bg-gray-200 overflow-hidden">
        {item.images && item.images.length > 0 ? (
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Tag className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 whitespace-nowrap ${getTypeColor(item.type)}`}>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {item.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
            {item.category}
          </span>
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getConditionColor(item.condition)}`}>
            {item.condition}
          </span>
        </div>
        
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>{item.location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{item.user?.username || 'Anonymous'}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{formatDate(item.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}