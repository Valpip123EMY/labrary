import { ResearchOpportunity } from '@/types';
import { getPlaceholderImage } from '@/utils/imageUtils';

interface OpportunityCardProps {
  opportunity: ResearchOpportunity;
  onViewDetails: (opportunity: ResearchOpportunity) => void;
}

export function OpportunityCard({ opportunity, onViewDetails }: OpportunityCardProps) {
  return (
    <div 
      className="group cursor-pointer bg-white hover:bg-gray-50 transition-all duration-300 border border-gray-200 hover:border-gray-300 h-full flex flex-col"
      onClick={() => onViewDetails(opportunity)}
    >
      {/* Image */}
      <div className="relative h-[170px] overflow-hidden bg-gray-100">
        <img 
          src={opportunity.image || getPlaceholderImage(opportunity.title, opportunity.institution, opportunity.category)}
          alt={opportunity.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = getPlaceholderImage(opportunity.title, opportunity.institution, opportunity.category);
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 bg-white text-gray-900 text-[10px] font-semibold uppercase tracking-wider">
            {opportunity.type}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-2.5 flex-1 flex flex-col">
        <div className="space-y-2">
          <h3 className="text-[16px] font-normal text-gray-900 leading-[1.35] group-hover:text-gray-600 transition-colors">
            {opportunity.title}
          </h3>
          
          <p className="text-[13px] font-medium text-gray-600">
            {opportunity.institution}
          </p>
        </div>
        
        <p className="text-[12.5px] text-gray-500 leading-[1.5] line-clamp-2 mb-1.5">
          {opportunity.description}
        </p>
        
        <div className="flex items-center gap-3 text-[11.5px] text-gray-500 mt-auto pt-1.5">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
              <line x1="16" x2="16" y1="2" y2="6"></line>
              <line x1="8" x2="8" y1="2" y2="6"></line>
              <line x1="3" x2="21" y1="10" y2="10"></line>
            </svg>
            <span>{new Date(opportunity.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
