import { X } from 'lucide-react';
import { ResearchOpportunity } from '@/types';

interface OpportunityModalProps {
  opportunity: ResearchOpportunity | null;
  onClose: () => void;
}

export function OpportunityModal({ opportunity, onClose }: OpportunityModalProps) {
  if (!opportunity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white shadow-2xl rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 md:p-10 space-y-8">
          {/* Header */}
          <div className="space-y-6">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="space-y-4 pr-16">
              <span className="px-3 py-1.5 bg-gray-900 text-white text-[11px] font-semibold uppercase tracking-wider inline-block">
                {opportunity.type}
              </span>
              <h2 className="text-[28px] md:text-[32px] font-light text-gray-900 leading-[1.15] tracking-tight">{opportunity.title}</h2>
              <p className="text-[16px] text-gray-600 font-normal">{opportunity.institution}</p>
            </div>
          </div>

          {/* Meta Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-8 border-y border-gray-200">
            <div className="space-y-1.5">
              <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Location</p>
              <p className="text-[15px] font-normal text-gray-900">{opportunity.location}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Duration</p>
              <p className="text-[15px] font-normal text-gray-900">{opportunity.duration}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Deadline</p>
              <p className="text-[15px] font-normal text-gray-900">{new Date(opportunity.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Funding</p>
              <p className="text-[15px] font-normal text-gray-900">{opportunity.funding}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Supervisor</p>
              <p className="text-[15px] font-normal text-gray-900">{opportunity.supervisor}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Department</p>
              <p className="text-[15px] font-normal text-gray-900">{opportunity.department}</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-[20px] font-normal text-gray-900">About This Position</h3>
            <p className="text-[15px] leading-[1.8] text-gray-600 font-light">{opportunity.description}</p>
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <h3 className="text-[20px] font-normal text-gray-900">Requirements</h3>
            <ul className="space-y-3">
              {opportunity.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-3 text-[15px] leading-[1.7] text-gray-600 font-light">
                  <span className="text-gray-400 flex-shrink-0 text-[16px]">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <h3 className="text-[20px] font-normal text-gray-900">Skills & Topics</h3>
            <div className="flex flex-wrap gap-2.5">
              {opportunity.tags.map((tag) => (
                <span key={tag} className="px-3.5 py-2 bg-gray-100 text-gray-700 text-[13px] font-medium hover:bg-gray-200 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-8">
            <button className="flex-1 px-8 py-4 bg-gray-900 text-white text-[13px] font-semibold hover:bg-gray-800 transition-colors uppercase tracking-wider">
              Apply for Position
            </button>
            <button className="px-8 py-4 border border-gray-300 text-gray-700 text-[13px] font-semibold hover:bg-gray-50 transition-colors uppercase tracking-wider">
              Save for Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
