import { Search, Building2, TrendingUp, Shield } from 'lucide-react';

export function FeatureCards() {
  const features = [
    {
      icon: Search,
      title: 'Smart Discovery',
      description: 'AI-powered search helps you find positions that perfectly match your research interests and expertise.'
    },
    {
      icon: Building2,
      title: 'Top Institutions',
      description: 'Access opportunities from leading universities and research centers worldwide in one centralized platform.'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Track your applications, get insights on competitive positions, and advance your research career strategically.'
    },
    {
      icon: Shield,
      title: 'Verified Positions',
      description: 'Every opportunity is verified and curated to ensure quality, legitimacy, and alignment with academic standards.'
    }
  ];

  return (
    <section className="w-full bg-background py-16 border-t border-white/10">
      <div className="container px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-base font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
