import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiPaperclip, FiLoader, FiPlus, FiMinus, FiFilter, FiDownload, FiShare2, FiBookmark, FiLayers, FiRefreshCw } from 'react-icons/fi';
import Footer from '@/components/Footer';

interface PaperData {
  id: string;
  title: string;
  authors: string[];
  year: number;
  abstract: string;
  isRoot?: boolean;
  x: number;
  y: number;
  level?: number;
  isVisible?: boolean;
  isLoading?: boolean;
  connections?: Array<{
    targetId: string;
    type: string;
  }>;
}

interface AnalysisResults {
  totalPapers: number;
  researchGaps: string[];
  keyInsights: string[];
  trendingTopics: string[];
  citationDensity: string;
}

const connectionTypes = {
  'cites': { label: 'Cites', color: 'hsl(var(--muted-foreground) / 0.8)' },
  'future work': { label: 'Future Work', color: 'hsl(var(--primary))' },
  'related to': { label: 'Related', color: 'hsl(var(--muted-foreground) / 0.6)' },
  'extends': { label: 'Extends', color: 'hsl(var(--muted-foreground) / 0.8)' },
  'cited by': { label: 'Cited by', color: 'hsl(var(--muted-foreground) / 0.6)' },
};

const PaperCard = React.memo(({ 
  paper, 
  isSelected,
  isDragging,
  onClick,
  onDragStart,
}: { 
  paper: PaperData;
  isSelected: boolean;
  isDragging: boolean;
  onClick: (id: string) => void;
  onDragStart: (id: string, e: React.MouseEvent) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
      }}
      transition={{ 
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
      className={`relative bg-card text-card-foreground rounded-lg border overflow-hidden transition-all duration-200 select-none shadow-md hover:shadow-lg ${
        isDragging ? 'cursor-grabbing shadow-xl' : 'cursor-grab'
      } ${
        isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-foreground/30'
      }`}
      style={{ 
        pointerEvents: 'auto',
        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!paper.isLoading) onClick(paper.id);
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        if (!paper.isLoading) onDragStart(paper.id, e);
      }}
    >
      {paper.isLoading && (
        <div className="absolute inset-0 bg-card/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-12 h-12">
              <motion.div
                className="absolute inset-0 border-4 border-primary/20 rounded-full"
              />
              <motion.div
                className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <p className="text-xs text-muted-foreground font-medium">Loading paper...</p>
          </div>
        </div>
      )}
      
      <div className={`p-4 ${paper.isLoading ? 'opacity-30' : 'opacity-100'} transition-opacity duration-300`}>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-sm leading-tight line-clamp-2">
            {paper.title}
          </h3>
          {paper.isRoot && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary shrink-0">
              Root
            </span>
          )}
        </div>
        
        <p className="mt-1 text-xs text-muted-foreground">
          {paper.authors[0]}{paper.authors.length > 1 ? ' et al.' : ''} • {paper.year}
        </p>
        
        <p className="mt-2 text-xs text-muted-foreground/90 line-clamp-2">
          {paper.abstract}
        </p>

        {paper.connections?.length ? (
          <div className="mt-3 pt-2 border-t border-border/50">
            <div className="flex flex-wrap gap-1.5">
              {paper.connections.map((conn, i) => {
                const connType = connectionTypes[conn.type.toLowerCase() as keyof typeof connectionTypes] || 
                  { label: conn.type, color: 'hsl(var(--muted-foreground) / 0.6)' };
                
                return (
                  <span 
                    key={i} 
                    className="inline-flex items-center text-[10px] px-2 py-0.5 rounded-full"
                    style={{ 
                      backgroundColor: connType.color + '15',
                      color: connType.color,
                      border: `1px solid ${connType.color}30`
                    }}
                  >
                    {connType.label}
                  </span>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
});

const searchPapers = async (query: string): Promise<PaperData[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: '1',
      title: `Foundations of ${query}`,
      authors: ['Author A', 'Author B'],
      year: 2023,
      abstract: `This paper explores fundamental concepts and methodologies in ${query} research.`,
      isRoot: true,
      x: 0,
      y: 0,
      connections: [
        { targetId: '2', type: 'cites' },
        { targetId: '3', type: 'extends' },
        { targetId: '4', type: 'related to' }
      ]
    },
    {
      id: '2',
      title: `Advanced Techniques in ${query}`,
      authors: ['Researcher X', 'Scientist Y'],
      year: 2022,
      abstract: `Novel approaches and methodologies for advancing ${query} research.`,
      x: 0,
      y: 0,
      connections: [
        { targetId: '5', type: 'cites' },
        { targetId: '6', type: 'extends' }
      ]
    },
    {
      id: '3',
      title: `Future Directions in ${query}`,
      authors: ['Professor M', 'Dr. N'],
      year: 2023,
      abstract: `Exploring emerging trends and future research opportunities in ${query}.`,
      x: 0,
      y: 0,
      connections: [
        { targetId: '7', type: 'extends' }
      ]
    },
    {
      id: '4',
      title: `${query}: Practical Applications`,
      authors: ['Dr. K', 'Prof. L'],
      year: 2022,
      abstract: `Real-world implementations of ${query} in various domains.`,
      x: 0,
      y: 0,
      connections: [
        { targetId: '8', type: 'cites' }
      ]
    },
    {
      id: '5',
      title: `${query}: A Comprehensive Survey`,
      authors: ['Dr. Smith', 'Prof. Johnson'],
      year: 2021,
      abstract: `An extensive survey of existing work and methodologies in ${query}.`,
      x: 0,
      y: 0,
      connections: [
        { targetId: '9', type: 'cites' }
      ]
    },
    {
      id: '6',
      title: `Innovations in ${query} Systems`,
      authors: ['Team Alpha'],
      year: 2022,
      abstract: `Breakthrough innovations and system designs in ${query} research.`,
      x: 0,
      y: 0,
    },
    {
      id: '7',
      title: `Emerging Paradigms in ${query}`,
      authors: ['Research Group X'],
      year: 2023,
      abstract: `New theoretical frameworks and paradigms for ${query} research.`,
      x: 0,
      y: 0,
    },
    {
      id: '8',
      title: `${query} in Modern Context`,
      authors: ['Innovation Lab'],
      year: 2023,
      abstract: `Contemporary perspectives and applications of ${query}.`,
      x: 0,
      y: 0,
    },
    {
      id: '9',
      title: `Theoretical Foundations of ${query}`,
      authors: ['Academic Institute'],
      year: 2020,
      abstract: `Core theoretical principles underlying modern ${query} approaches.`,
      x: 0,
      y: 0,
    }
  ];
};

const generateAnalysis = (papers: PaperData[], query: string): AnalysisResults => {
  return {
    totalPapers: papers.length,
    researchGaps: [
      `Limited research on long-term sustainability of ${query} implementations`,
      `Insufficient cross-disciplinary approaches combining ${query} with other fields`,
      `Lack of standardized evaluation metrics across different ${query} methodologies`
    ],
    keyInsights: [
      `Strong focus on theoretical foundations with ${papers.filter(p => p.year >= 2022).length} recent publications`,
      `Growing trend toward practical applications and real-world implementations`,
      `High citation density indicates active and interconnected research community`
    ],
    trendingTopics: [
      'Emerging paradigms',
      'System innovations',
      'Future directions',
      'Practical applications'
    ],
    citationDensity: 'High'
  };
};

export default function ResearchExplorer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('');
  const [papers, setPapers] = useState<PaperData[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<string | null>(null);
  const [draggingPaper, setDraggingPaper] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [isAutoFitting, setIsAutoFitting] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const maxLevel = Math.max(...papers.map(p => p.level || 0), 0);
        const minHeight = Math.max(800, (maxLevel + 1) * 220 + 200);
        
        let maxX = width;
        let maxY = minHeight;
        
        if (papers.length > 0) {
          papers.forEach(paper => {
            if (paper.x) maxX = Math.max(maxX, paper.x + 200);
            if (paper.y) maxY = Math.max(maxY, paper.y + 200);
          });
        }
        
        setContainerSize({
          width: Math.max(width, maxX),
          height: Math.max(minHeight, maxY)
        });
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [papers]);

  const calculateTreeLayout = (papers: PaperData[], width: number) => {
    const LEVEL_HEIGHT = 220;
    const NODE_WIDTH = 280;
    const START_Y = 80;
    
    const childrenMap = new Map<string, string[]>();
    papers.forEach(paper => {
      paper.connections?.forEach(conn => {
        if (!childrenMap.has(paper.id)) {
          childrenMap.set(paper.id, []);
        }
        childrenMap.get(paper.id)!.push(conn.targetId);
      });
    });

    const levels = new Map<string, number>();
    const queue: string[] = [];
    const root = papers.find(p => p.isRoot);
    
    if (root) {
      levels.set(root.id, 0);
      queue.push(root.id);
    }

    while (queue.length > 0) {
      const id = queue.shift()!;
      const level = levels.get(id)!;
      const children = childrenMap.get(id) || [];
      
      children.forEach(childId => {
        if (!levels.has(childId)) {
          levels.set(childId, level + 1);
          queue.push(childId);
        }
      });
    }

    const papersByLevel = new Map<number, string[]>();
    levels.forEach((level, id) => {
      if (!papersByLevel.has(level)) {
        papersByLevel.set(level, []);
      }
      papersByLevel.get(level)!.push(id);
    });

    const positions = new Map<string, { x: number; y: number }>();
    
    papersByLevel.forEach((paperIds, level) => {
      const count = paperIds.length;
      const totalWidth = count * NODE_WIDTH;
      const startX = (width - totalWidth) / 2 + NODE_WIDTH / 2;
      
      paperIds.forEach((id, index) => {
        positions.set(id, {
          x: startX + index * NODE_WIDTH,
          y: START_Y + level * LEVEL_HEIGHT
        });
      });
    });

    return papers.map(paper => {
      const pos = positions.get(paper.id);
      return {
        ...paper,
        x: pos?.x || width / 2,
        y: pos?.y || START_Y,
        level: levels.get(paper.id) || 0
      };
    });
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() || isLoading) return;
    
    setIsLoading(true);
    setLoadingProgress(0);
    setLoadingStage('Initializing search...');
    setShowAnalysis(false);
    
    try {
      setLoadingProgress(15);
      setLoadingStage('Querying research databases...');
      
      const results = await searchPapers(searchQuery);
      
      setLoadingProgress(40);
      setLoadingStage('Processing papers...');
      
      const width = containerRef.current?.clientWidth || 1200;
      const layoutPapers = calculateTreeLayout(results, width);
      
      setLoadingProgress(60);
      setLoadingStage('Building knowledge graph...');
      
      const initialPapers = layoutPapers.map(p => ({
        ...p,
        isVisible: p.isRoot,
        isLoading: false
      }));
      
      setPapers(initialPapers);
      setSelectedPaper('1');
      setLoadingProgress(75);
      setLoadingStage('Rendering visualization...');
      setIsAutoFitting(true);
      
      const currentlyVisible: string[] = ['1'];
      
      await new Promise(resolve => setTimeout(resolve, 100));
      fitToView(['1']);
      
      setLoadingProgress(85);
      setLoadingStage('Discovering connections...');
      
      const queue: string[] = [];
      const root = layoutPapers.find(p => p.isRoot);
      
      if (root) {
        queue.push(root.id);
      }
      
      const visited = new Set<string>();
      visited.add(root?.id || '');
      
      while (queue.length > 0) {
        const currentId = queue.shift()!;
        const currentPaper = layoutPapers.find(p => p.id === currentId);
        
        if (!currentPaper?.connections) continue;
        
        const children = currentPaper.connections
          .map(conn => layoutPapers.find(p => p.id === conn.targetId))
          .filter(p => p && !visited.has(p.id)) as PaperData[];
        
        for (const child of children) {
          visited.add(child.id);
          queue.push(child.id);
          
          await new Promise(resolve => setTimeout(resolve, 300));
          
          setPapers(prev => 
            prev.map(paper => 
              paper.id === child.id
                ? { ...paper, isVisible: true, isLoading: true }
                : paper
            )
          );
          
          currentlyVisible.push(child.id);
          
          await new Promise(resolve => setTimeout(resolve, 100));
          fitToView(currentlyVisible);
          
          await new Promise(resolve => setTimeout(resolve, 1400));
          
          setPapers(prev => 
            prev.map(paper => 
              paper.id === child.id
                ? { ...paper, isLoading: false }
                : paper
            )
          );
          
          await new Promise(resolve => setTimeout(resolve, 100));
          fitToView(currentlyVisible);
        }
      }
      
      setLoadingProgress(95);
      setLoadingStage('Generating analysis...');
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const analysis = generateAnalysis(layoutPapers, searchQuery);
      setAnalysisResults(analysis);
      
      setLoadingProgress(100);
      setLoadingStage('Complete!');
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsAutoFitting(false);
      setIsLoading(false);
      setShowAnalysis(true);
      
    } catch (error) {
      console.error('Error searching papers:', error);
      setIsLoading(false);
      setIsAutoFitting(false);
    }
  };

  const handleDragStart = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const paper = papers.find(p => p.id === id);
    if (!paper) return;

    setDraggingPaper(id);
    setIsPanning(false);
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const canvasX = (e.clientX - rect.left - pan.x) / zoom;
    const canvasY = (e.clientY - rect.top - pan.y) / zoom;
    
    setDragOffset({
      x: canvasX - paper.x,
      y: canvasY - paper.y
    });
  };

  useEffect(() => {
    if (!draggingPaper) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const canvasX = (e.clientX - rect.left - pan.x) / zoom;
      const canvasY = (e.clientY - rect.top - pan.y) / zoom;
      
      const x = canvasX - dragOffset.x;
      const y = canvasY - dragOffset.y;
      
      setPapers(prev => prev.map(paper => 
        paper.id === draggingPaper
          ? { ...paper, x, y }
          : paper
      ));
    };

    const handleMouseUp = () => {
      setDraggingPaper(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingPaper, dragOffset, zoom, pan]);

  const handlePaperClick = useCallback((paperId: string) => {
    setSelectedPaper(selectedPaper === paperId ? null : paperId);
  }, [selectedPaper]);

  const handleZoomIn = () => {
    setZoom(prev => {
      const newZoom = Math.min(prev + 0.2, 3);
      adjustPanForZoom(prev, newZoom);
      return newZoom;
    });
  };

  const handleZoomOut = () => {
    setZoom(prev => {
      const newZoom = Math.max(prev - 0.2, 0.5);
      adjustPanForZoom(prev, newZoom);
      return newZoom;
    });
  };

  const adjustPanForZoom = (oldZoom: number, newZoom: number) => {
    if (!containerRef.current || isAutoFitting) return;
    
    const container = containerRef.current;
    const centerX = container.clientWidth / 2;
    const centerY = container.clientHeight / 2;
    
    const canvasCenterX = (centerX - pan.x) / oldZoom;
    const canvasCenterY = (centerY - pan.y) / oldZoom;
    
    const newPanX = centerX - canvasCenterX * newZoom;
    const newPanY = centerY - canvasCenterY * newZoom;
    
    setPan({ x: newPanX, y: newPanY });
  };

  const fitToView = useCallback((visiblePaperIds?: string[]) => {
    if (!containerRef.current) return;

    setPapers(currentPapers => {
      if (currentPapers.length === 0) return currentPapers;

      let relevantPapers: PaperData[];
      if (visiblePaperIds) {
        relevantPapers = currentPapers.filter(p => visiblePaperIds.includes(p.id));
      } else {
        relevantPapers = currentPapers.filter(p => p.isVisible);
      }
      
      if (relevantPapers.length === 0) return currentPapers;

      const container = containerRef.current!;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      let minX = Infinity, maxX = -Infinity;
      let minY = Infinity, maxY = -Infinity;

      relevantPapers.forEach(paper => {
        const cardWidth = 256;
        const cardHeight = 180;
        
        minX = Math.min(minX, paper.x - cardWidth / 2);
        maxX = Math.max(maxX, paper.x + cardWidth / 2);
        minY = Math.min(minY, paper.y - cardHeight / 2);
        maxY = Math.max(maxY, paper.y + cardHeight / 2);
      });

      const padding = 40;
      minX -= padding;
      maxX += padding;
      minY -= padding;
      maxY += padding;

      const contentWidth = maxX - minX;
      const contentHeight = maxY - minY;

      const zoomX = containerWidth / contentWidth;
      const zoomY = containerHeight / contentHeight;
      const targetZoom = Math.min(zoomX, zoomY);
      const newZoom = Math.max(0.3, Math.min(targetZoom, 5));

      const contentCenterX = (minX + maxX) / 2;
      const contentCenterY = (minY + maxY) / 2;
      
      const newPanX = containerWidth / 2 - contentCenterX * newZoom;
      const newPanY = containerHeight / 2 - contentCenterY * newZoom;

      setZoom(newZoom);
      setPan({ x: newPanX, y: newPanY });
      
      return currentPapers;
    });
  }, []);

  const handleZoomReset = () => {
    setIsAutoFitting(false);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleContainerMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isContainer = target === e.currentTarget;
    const isSvg = target.tagName === 'svg' || target.tagName === 'path' || target.tagName === 'line';
    
    if ((isContainer || isSvg) && !draggingPaper) {
      e.preventDefault();
      setIsAutoFitting(false);
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  useEffect(() => {
    if (!isPanning) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    };

    const handleMouseUp = () => {
      setIsPanning(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isPanning, panStart]);

  const getConnections = () => {
    const connections: Array<{ from: PaperData; to: PaperData; type: string }> = [];
    
    papers.forEach(paper => {
      if (!paper.isVisible) return;
      
      paper.connections?.forEach(conn => {
        const target = papers.find(p => p.id === conn.targetId);
        if (target && target.isVisible) {
          connections.push({ from: paper, to: target, type: conn.type });
        }
      });
    });
    
    return connections;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Search and Loading Bar Container */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 pt-0.5 pb-0.5">
          {/* Search Bar */}
          <div className="flex items-center gap-2 mb-0.5">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search research..."
                className="w-full px-3 py-1 text-sm border border-border/50 rounded-md bg-background/70 focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/30"
                disabled={isLoading}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading || !searchQuery.trim()}
              className={`p-1.5 rounded-md flex-shrink-0 ${
                isLoading || !searchQuery.trim()
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
              title={isLoading ? 'Searching...' : 'Search'}
            >
              {isLoading ? <FiLoader className="animate-spin w-4 h-4" /> : <FiSearch className="w-4 h-4" />}
            </button>
          </div>

          {/* Compact Loading Bar */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <FiLoader className="animate-spin text-primary w-3 h-3" />
                  <span className="truncate flex-1">{loadingStage}</span>
                  <span className="text-[0.7rem] font-medium">{loadingProgress}%</span>
                </div>
                <div className="relative h-0.5 bg-muted/50 rounded-full overflow-hidden mt-0.5">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/80"
                    initial={{ width: '0%' }}
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative mb-6 max-w-2xl mx-auto">
            <p className="mt-2 text-sm text-muted-foreground text-center">
              Try: "machine learning", "quantum computing", or "climate change"
            </p>
          </div>

          {/* Tools Panel */}
          {papers.length > 0 && (
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={() => setShowTools(!showTools)}
                className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent transition-colors"
              >
                <FiFilter className="w-4 h-4" />
                <span>Tools & Filters</span>
              </button>
              
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-accent transition-colors">
                  <FiBookmark className="w-4 h-4" />
                  <span className="hidden sm:inline">Save</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-accent transition-colors">
                  <FiShare2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-accent transition-colors">
                  <FiDownload className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </button>
              </div>
            </div>
          )}

          {/* Expandable Tools Panel */}
          <AnimatePresence>
            {showTools && papers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 overflow-hidden"
              >
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Year Range</label>
                      <div className="flex items-center gap-2">
                        <input type="number" placeholder="2020" className="flex-1 px-3 py-2 text-sm border border-border rounded bg-background text-foreground" />
                        <span className="text-muted-foreground">-</span>
                        <input type="number" placeholder="2024" className="flex-1 px-3 py-2 text-sm border border-border rounded bg-background text-foreground" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Connection Type</label>
                      <select className="w-full px-3 py-2 text-sm border border-border rounded bg-background text-foreground">
                        <option>All Types</option>
                        <option>Cites</option>
                        <option>Extends</option>
                        <option>Related</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Display Depth</label>
                      <select className="w-full px-3 py-2 text-sm border border-border rounded bg-background text-foreground">
                        <option>All Levels</option>
                        <option>Level 1-2</option>
                        <option>Level 1-3</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div 
            ref={containerRef}
            className="relative bg-card rounded-lg border border-border overflow-hidden"
            style={{ height: '70vh', minHeight: '600px', cursor: draggingPaper ? 'grabbing' : isPanning ? 'grabbing' : 'grab' }}
            onMouseDown={handleContainerMouseDown}
          >
            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 z-50 flex flex-col gap-2">
              <button
                onClick={handleZoomIn}
                className="w-9 h-9 flex items-center justify-center bg-card border border-border rounded-lg hover:bg-accent transition-colors shadow-lg"
                title="Zoom In"
              >
                <FiPlus className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={handleZoomOut}
                className="w-9 h-9 flex items-center justify-center bg-card border border-border rounded-lg hover:bg-accent transition-colors shadow-lg"
                title="Zoom Out"
              >
                <FiMinus className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={handleZoomReset}
                className="w-9 h-9 flex items-center justify-center bg-card border border-border rounded-lg hover:bg-accent transition-colors shadow-lg text-foreground"
                title="Reset View"
              >
                <FiRefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Stats Overlay */}
            {papers.length > 0 && !isLoading && (
              <div className="absolute top-4 left-4 z-40 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <FiLayers className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Papers:</span>
                    <span className="font-medium text-foreground">{papers.filter(p => p.isVisible).length}</span>
                  </div>
                  <div className="h-4 w-px bg-border" />
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Connections:</span>
                    <span className="font-medium text-foreground">{getConnections().length}</span>
                  </div>
                </div>
              </div>
            )}

            {papers.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="relative mb-6">
                  <FiPaperclip className="text-5xl text-muted-foreground/50" />
                  <div className="absolute -inset-4 rounded-full bg-primary/5 animate-pulse"></div>
                </div>
                <h2 className="text-xl font-light text-foreground mb-2">
                  Research Explorer
                </h2>
                <p className="text-muted-foreground max-w-md">
                  Enter a research topic to discover papers and their connections in an interactive visualization.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {['AI Ethics', 'Quantum Computing', 'Climate Change'].map(topic => (
                    <button
                      key={topic}
                      onClick={() => {
                        setSearchQuery(topic);
                        setTimeout(() => handleSearch(), 10);
                      }}
                      className="px-4 py-2 text-sm rounded-full border border-border bg-card hover:bg-accent/50 transition-colors text-foreground/80 hover:text-foreground"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div 
                className="relative w-full"
                style={{ 
                  height: `${containerSize.height}px`,
                  width: `${containerSize.width}px`,
                  minHeight: '100%',
                  minWidth: '100%',
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transformOrigin: 'top left',
                  transition: (isPanning || draggingPaper) ? 'none' : 'transform 0.5s ease-out',
                  willChange: (isPanning || draggingPaper) ? 'transform' : 'auto'
                }}
              >
                {/* SVG Connections */}
                <svg
                  className="absolute pointer-events-none"
                  style={{ 
                    zIndex: 1,
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'visible'
                  }}
                  viewBox={`0 0 ${containerSize.width} ${containerSize.height}`}
                  preserveAspectRatio="xMidYMid meet"
                >
                  {getConnections().map((conn, i) => {
                    const connType = connectionTypes[conn.type.toLowerCase() as keyof typeof connectionTypes] || 
                      { color: 'hsl(var(--muted-foreground) / 0.6)' };
                    
                    const x1 = conn.from.x;
                    const y1 = conn.from.y + 60;
                    const x2 = conn.to.x;
                    const y2 = conn.to.y - 60;
                    
                    const midY = (y1 + y2) / 2;
                    const path = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
                    
                    return (
                      <motion.path
                        key={i}
                        d={path}
                        fill="none"
                        stroke={connType.color}
                        strokeWidth={2}
                        strokeDasharray={conn.type === 'extends' ? '5,5' : 'none'}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: 1,
                          opacity: 0.6,
                        }}
                        transition={{
                          pathLength: { duration: 0.8, ease: 'easeInOut' },
                          opacity: { duration: 0.3 }
                        }}
                      />
                    );
                  })}
                </svg>

                {/* Paper Nodes */}
                <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
                  <AnimatePresence>
                    {papers.map(paper => {
                      if (!paper.isVisible) return null;
                      
                      return (
                        <div
                          key={paper.id}
                          className="absolute w-64"
                          style={{
                            left: paper.x,
                            top: paper.y,
                            transform: 'translate(-50%, -50%)',
                            zIndex: draggingPaper === paper.id ? 50 : selectedPaper === paper.id ? 20 : 10,
                            pointerEvents: 'auto',
                          }}
                        >
                          <PaperCard
                            paper={paper}
                            isSelected={selectedPaper === paper.id}
                            isDragging={draggingPaper === paper.id}
                            onClick={handlePaperClick}
                            onDragStart={handleDragStart}
                          />
                        </div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Results */}
          <AnimatePresence>
            {showAnalysis && analysisResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="mt-6"
              >
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                  <div className="border-b border-border px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-medium text-foreground">Analysis Complete</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">"{searchQuery}" — {analysisResults.totalPapers} papers analyzed</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-8">
                    {/* Research Gaps */}
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-3">Research Gaps</h4>
                      <div className="space-y-2">
                        {analysisResults.researchGaps.map((gap, i) => (
                          <div key={i} className="text-sm text-muted-foreground leading-relaxed">
                            • {gap}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Insights */}
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-3">Key Insights</h4>
                      <div className="space-y-2">
                        {analysisResults.keyInsights.map((insight, i) => (
                          <div key={i} className="text-sm text-muted-foreground leading-relaxed">
                            • {insight}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Trending Topics */}
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-3">Trending Topics</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResults.trendingTopics.map((topic, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs border border-border rounded text-muted-foreground"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Citation Density */}
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Citation Network Density</span>
                        <span className="text-sm font-medium text-foreground">{analysisResults.citationDensity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* How to Use Section */}
          {papers.length === 0 && (
            <div className="mt-8 p-6 bg-card rounded-lg border border-border">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-lg font-medium text-foreground mb-4">How to use the Research Explorer</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mb-2">1</div>
                    <h4 className="font-medium text-foreground">Search & Explore</h4>
                    <p className="text-sm text-muted-foreground">
                      Enter a research topic to discover relevant papers and their connections.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mb-2">2</div>
                    <h4 className="font-medium text-foreground">Drag & Rearrange</h4>
                    <p className="text-sm text-muted-foreground">
                      Click and drag papers to reposition them and customize your view.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mb-2">3</div>
                    <h4 className="font-medium text-foreground">Discover Insights</h4>
                    <p className="text-sm text-muted-foreground">
                      Identify key papers, trends, and future research directions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}