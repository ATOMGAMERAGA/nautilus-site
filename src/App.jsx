import React, { useState, useEffect } from 'react';
import { Star, Play, ArrowRight, Menu, X, Users, Zap, Shield, Server, Gamepad2, Trophy, Crown, Sword, Target, Flame, Copy, Check, ShoppingCart, Package, Gift, Gem, Home, Award, MessageSquare } from 'lucide-react';

// Basit router implementasyonu
const useRouter = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };
  
  return { currentPath, navigate };
};

// Logo component
const Logo = ({ className = "", size = "normal" }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    normal: "w-12 h-12",
    large: "w-20 h-20",
    xlarge: "w-32 h-32"
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <img 
        src="logo.png" 
        alt="Nautilus PvP Logo" 
        className="w-full h-full object-contain rounded-xl shadow-lg"
        onError={(e) => {
          // Fallback if logo.png doesn't load
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div className="w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl items-center justify-center shadow-lg hidden">
        <div className="text-white font-bold text-lg">N</div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-xl blur-md -z-10 animate-pulse"></div>
    </div>
  );
};

// Floating particles background component
const FloatingParticles = () => {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-transparent to-blue-900/5 animate-pulse" style={{ animationDuration: '4s' }} />
    </>
  );
};

// Enhanced glowing button
const GlowButton = ({ children, className = "", size = "normal", variant = "primary", onClick, ...props }) => {
  const sizeClasses = {
    small: "px-4 py-3 text-sm min-h-[48px]",
    normal: "px-6 py-4 text-base min-h-[52px] sm:px-8 sm:text-lg",
    large: "px-8 py-4 text-lg min-h-[56px] sm:px-12 sm:text-xl"
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-cyan-400 to-blue-500 text-black",
    secondary: "bg-gradient-to-r from-gray-700 to-gray-600 text-white border border-gray-500",
    success: "bg-gradient-to-r from-green-400 to-green-600 text-black",
    warning: "bg-gradient-to-r from-yellow-400 to-orange-500 text-black"
  };

  return (
    <button
      onClick={onClick}
      className={`relative ${sizeClasses[size]} ${variantClasses[variant]} font-semibold rounded-xl
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-400 before:to-blue-500 before:rounded-xl before:blur-lg before:opacity-50 before:-z-10
        hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 touch-manipulation font-medium
        transform-gpu will-change-transform shadow-lg hover:shadow-cyan-500/25 ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

// Enhanced mobile card
const GlowCard = ({ children, className = "", hoverable = true }) => {
  return (
    <div className={`relative bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 sm:p-6
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500/5 before:to-blue-500/5 before:rounded-2xl before:opacity-0 
      ${hoverable ? 'hover:before:opacity-100 hover:scale-[1.02] hover:border-cyan-500/30' : ''} 
      before:transition-all before:duration-300 transition-all duration-300 shadow-lg ${className}`}>
      {children}
    </div>
  );
};

// Animated text component
const AnimatedText = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
    </span>
  );
};

// Server status component
const ServerStatus = ({ mobile = false }) => {
  const [players, setPlayers] = useState(143);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setPlayers(prev => Math.max(120, Math.min(200, prev + Math.floor(Math.random() * 6) - 3)));
        setIsAnimating(false);
      }, 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (mobile) {
    return (
      <div className="bg-green-500/20 border border-green-500/50 rounded-full px-3 py-2 text-green-400 backdrop-blur-sm text-sm">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2 inline-block"></div>
        <span className={`font-semibold transition-all duration-200 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
          {players}/200
        </span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center bg-green-500/20 border border-green-500/50 rounded-full px-4 py-2 text-green-400 backdrop-blur-sm">
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
      <span className={`font-semibold transition-all duration-200 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
        {players}/200 Çevrimiçi
      </span>
    </div>
  );
};

// Fixed copy button
const CopyButton = ({ text, label }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for mobile
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Copy failed');
        }
        
        document.body.removeChild(textArea);
      }
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy operation failed:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`w-full bg-gray-800/70 border border-gray-600 rounded-xl px-5 py-4 sm:px-6 sm:py-5 
        hover:border-cyan-400 hover:bg-gray-800/90 transition-all duration-300 touch-manipulation
        ${copied ? 'bg-green-900/50 border-green-500' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div className="text-left flex-1">
          <div className="text-cyan-400 font-mono text-lg sm:text-xl md:text-2xl font-bold break-all">{text}</div>
          <div className="text-gray-400 text-xs sm:text-sm mt-1">
            {copied ? 'Panoya kopyalandı!' : `${label} kopyalamak için tıkla`}
          </div>
        </div>
        <div className="ml-4 flex-shrink-0">
          {copied ? 
            <Check className="w-6 h-6 text-green-400" /> : 
            <Copy className="w-6 h-6 text-gray-400" />
          }
        </div>
      </div>
    </button>
  );
};

// Animated counter
const AnimatedCounter = ({ target, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      setCount(prev => {
        const next = prev + increment;
        if (next >= target) {
          clearInterval(timer);
          return target;
        }
        return next;
      });
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span>
      {Math.floor(count)}{suffix}
    </span>
  );
};

// Navigation component
const Navigation = ({ currentPath, navigate, scrollY }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Ana Sayfa', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Sunucular', path: '/sunucular', icon: <Server className="w-4 h-4" /> },
    { name: 'Sıralama', path: '/siralama', icon: <Award className="w-4 h-4" /> },
    { name: 'Mağaza', path: '/magaza', icon: <ShoppingCart className="w-4 h-4" /> },
    { name: 'Discord', path: '/discord', icon: <MessageSquare className="w-4 h-4" /> }
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrollY > 50 ? 'bg-black/95 backdrop-blur-md border-b border-cyan-500/30 shadow-lg shadow-cyan-500/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Logo size="small" />
            <button 
              onClick={() => navigate('/')}
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
            >
              Nautilus PvP
            </button>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button 
                key={item.name}
                onClick={() => handleNavClick(item.path)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-110 transform ${
                  currentPath === item.path 
                    ? 'text-cyan-400 bg-cyan-400/10' 
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </div>
          
          <div className="hidden sm:block lg:hidden">
            <ServerStatus mobile={true} />
          </div>
          
          <div className="hidden lg:block">
            <ServerStatus />
          </div>
          
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 touch-manipulation hover:bg-gray-800/50 rounded-xl transition-all duration-200 min-w-[48px] min-h-[48px] flex items-center justify-center"
            >
              <div className={`transform transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : 'rotate-0'}`}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-black/98 backdrop-blur-md border-b border-gray-700/50">
          <div className="px-4 py-5 space-y-1">
            {navItems.map((item) => (
              <button 
                key={item.name}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200 touch-manipulation min-h-[52px] text-lg ${
                  currentPath === item.path 
                    ? 'text-cyan-400 bg-cyan-400/10' 
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50'
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

// IP Copy Popup Component
const IPCopyPopup = ({ show }) => {
  return (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
      show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'
    }`}>
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-black px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
        <div className="text-2xl">✓</div>
        <div>
          <div className="font-bold text-lg">IP Kopyalandı!</div>
          <div className="text-sm opacity-90">play.atomland.xyz panoya kopyalandı</div>
        </div>
      </div>
    </div>
  );
};

// Ana Sayfa Komponenti
const HomePage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  // Copy IP to clipboard and show popup
  const handleSavaşaKatıl = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText('play.atomland.xyz');
      } else {
        // Fallback for mobile
        const textArea = document.createElement('textarea');
        textArea.value = 'play.atomland.xyz';
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Copy failed');
        }
        
        document.body.removeChild(textArea);
      }
      
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (err) {
      console.error('Copy operation failed:', err);
    }
  };

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const pvpFeatures = [
    {
      title: "Özel PvP Kitleri",
      description: "Dengeli savaş sistemi ile benzersiz silah kitleri ve özel yetenekler",
      icon: <Sword className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400" />
    },
    {
      title: "Sıralama Sistemi",
      description: "Rekabetçi ELO sıralaması ile liderlik tablosunda yüksel",
      icon: <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400" />
    },
    {
      title: "Haftalık Turnuvalar",
      description: "Özel ödüller ve unvanlar için haftalık epic turnuvalar",
      icon: <Crown className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400" />
    },
    {
      title: "Anti-Cheat Pro",
      description: "Gelişmiş koruma sistemi ile her zaman adil savaş garantisi",
      icon: <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400" />
    }
  ];

  const gameStats = [
    { number: 200, label: "Maksimum Oyuncu", suffix: "" },
    { number: 24, label: "Saat PvP", suffix: "/7" },
    { number: 12, label: "Savaş Arenası", suffix: "+" },
    { number: 100, label: "Günlük Savaş", suffix: "+" }
  ];

  const arenas = [
    {
      name: "TrapPvP",
      description: "Tuzaklar ve stratejiler ile mücadele eden klasik PvP modu",
      players: "Kapalı",
      status: "offline",
      color: "from-red-500/20 to-gray-500/20",
      ip: "play.atomland.xyz"
    },
    {
      name: "BoxPvP", 
      description: "Kutular içinde hızlı ve yoğun 1v1 savaşları",
      players: "28/40",
      status: "online", 
      color: "from-orange-500/20 to-yellow-500/20",
      ip: "play.atomland.xyz"
    }
  ];

  return (
    <div className="pt-16">
      {/* IP Copy Popup */}
      <IPCopyPopup show={showPopup} />
      
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-5xl mx-auto w-full">
          {/* Logo in hero section */}
          <div className="flex justify-center mb-8">
            <Logo size="xlarge" />
          </div>
          
          <div className="mb-10">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-8 leading-tight">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                Hoş Geldin
              </div>
              <div className="relative">
                <AnimatedText text="Nautilus PvP" className="text-white" />
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl rounded-full opacity-50 -z-10 animate-pulse"></div>
              </div>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              Efsanelerin doğduğu Minecraft PvP savaş alanına hoş geldin!
              <br className="hidden sm:block" />
              Savaş, fethet ve tahtını kurtar!
            </p>
          </div>
          
          {/* Mobile-optimized buttons with better spacing */}
          <div className="flex flex-col gap-4 justify-center items-center mb-12 max-w-sm mx-auto sm:max-w-none sm:flex-row">
            <GlowButton size="large" className="w-full sm:w-auto" onClick={handleSavaşaKatıl}>
              Savaşa Katıl
              <ArrowRight className="w-5 h-5" />
            </GlowButton>
            <GlowButton variant="secondary" className="w-full sm:w-auto">
              <Play className="w-5 h-5" />
              Videoyu İzle
            </GlowButton>
          </div>
          
          {/* Enhanced server info card */}
          <div className="max-w-lg mx-auto mb-10">
            <GlowCard className="p-6" hoverable={false}>
              <div className="text-center space-y-5">
                <div className="text-cyan-400 font-semibold text-xl">
                  Savaşa Hazır mısın?
                </div>
                <CopyButton text="play.atomland.xyz" label="Sunucu IP" />
                <div className="flex justify-center items-center space-x-4 text-gray-400">
                  <span>Java Edition</span>
                  <span>•</span>
                  <span>Versiyon 1.20.4</span>
                </div>
              </div>
            </GlowCard>
          </div>
          
          {/* Stats bar */}
          <div className="flex justify-center items-center space-x-6 text-gray-400 text-sm sm:text-base">
            <div className="flex items-center">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-1" />
              <span>4.9★</span>
            </div>
            <div className="h-4 w-px bg-gray-600"></div>
            <div>1000+ Savaşçı</div>
            <div className="h-4 w-px bg-gray-600"></div>
            <div>2020'den beri</div>
          </div>
        </div>
      </section>

      {/* Servers Section */}
      <section className="py-16 sm:py-20 px-4 relative" id="servers" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className={`text-3xl sm:text-5xl font-bold mb-6 transition-all duration-1000 ${
              isVisible.servers ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Oyun Modları
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Farklı PvP deneyimleri için özel olarak tasarlanmış oyun modları
            </p>
          </div>
          
          {/* Servers grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
            {arenas.map((server, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible.servers ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <GlowCard className={`relative overflow-hidden before:bg-gradient-to-r before:${server.color} h-full`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-cyan-400 leading-tight flex-1 pr-2">{server.name}</h3>
                    <div className={`flex items-center text-sm rounded-full px-3 py-1 flex-shrink-0 ${
                      server.status === 'online' 
                        ? 'text-green-400 bg-green-500/20' 
                        : 'text-red-400 bg-red-500/20'
                    }`}>
                      <div className={`w-2 h-2 rounded-full mr-1.5 ${
                        server.status === 'online' 
                          ? 'bg-green-400 animate-pulse' 
                          : 'bg-red-400'
                      }`}></div>
                      <span className="font-semibold">{server.players}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">{server.description}</p>
                  <div className="mb-5 p-3 bg-gray-800/50 rounded-lg">
                    <div className="text-gray-400 text-xs mb-1">Sunucu IP:</div>
                    <div className="text-cyan-400 font-mono text-sm">{server.ip}</div>
                  </div>
                  <GlowButton 
                    size="small" 
                    className="w-full" 
                    variant={server.status === 'online' ? 'primary' : 'secondary'}
                    disabled={server.status === 'offline'}
                    onClick={server.status === 'online' ? handleSavaşaKatıl : undefined}
                  >
                    {server.status === 'online' ? 'Sunucuya Katıl' : 'Yakında'}
                  </GlowButton>
                </GlowCard>
              </div>
            ))}
          </div>
          
          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {pvpFeatures.map((feature, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible.servers ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <GlowCard className="text-center h-full">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 text-cyan-400">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                </GlowCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 px-4 relative" id="stats" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {gameStats.map((stat, index) => (
              <div 
                key={index} 
                className={`relative transition-all duration-700 ${
                  isVisible.stats ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <GlowCard hoverable={false} className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                    {isVisible.stats ? <AnimatedCounter target={stat.number} suffix={stat.suffix} /> : `${stat.number}${stat.suffix}`}
                  </div>
                  <div className="text-gray-300 text-sm sm:text-base font-medium">{stat.label}</div>
                </GlowCard>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-30 -z-10 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Sunucular Sayfası Komponenti
const ServersPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleSunucuyaKatıl = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText('play.atomland.xyz');
      } else {
        // Fallback for mobile
        const textArea = document.createElement('textarea');
        textArea.value = 'play.atomland.xyz';
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Copy failed');
        }
        
        document.body.removeChild(textArea);
      }
      
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (err) {
      console.error('Copy operation failed:', err);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const servers = [
    {
      name: "TrapPvP",
      description: "Tuzaklar ve stratejiler ile mücadele eden klasik PvP modu. Rakiplerinizi tuzaklara düşürün ve galip gelin!",
      players: "Kapalı",
      status: "offline",
      color: "from-red-500/20 to-gray-500/20",
      ip: "play.atomland.xyz",
      features: ["Tuzak sistemleri", "Stratejik PvP", "Özel haritalar", "Takım savaşları"],
      announcement: "Oyun modu bakımda! Yakında daha iyi deneyimle geri dönüyoruz."
    },
    {
      name: "BoxPvP",
      description: "Kutular içinde hızlı ve yoğun 1v1 savaşları. Her kutu farklı bir meydan okuma!",
      players: "28/40",
      status: "online",
      color: "from-orange-500/20 to-yellow-500/20",
      ip: "play.atomland.xyz",
      features: ["1v1 kutular", "Hızlı maçlar", "Sıralama sistemi", "Özel kitler"],
      version: "1.20.4"
    }
  ];

  const serverStats = [
    { title: "Toplam Mod", value: 2, icon: <Server className="w-6 h-6" /> },
    { title: "Aktif Oyuncu", value: 171, icon: <Users className="w-6 h-6" /> },
    { title: "Günlük Rekor", value: 287, icon: <Trophy className="w-6 h-6" /> },
    { title: "Uptime", value: "99.8%", icon: <Shield className="w-6 h-6" /> }
  ];

  return (
    <div className="pt-16 min-h-screen">
      {/* IP Copy Popup */}
      <IPCopyPopup show={showPopup} />
      
      {/* Header */}
      <section className="py-16 px-4 text-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Oyun Modlarımız
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Farklı PvP deneyimleri için özel olarak tasarlanmış oyun modları
          </p>
        </div>
      </section>

      {/* Server Stats */}
      <section className="py-12 px-4" id="stats" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {serverStats.map((stat, index) => (
              <div 
                key={index}
                className={`transition-all duration-700 ${
                  isVisible.stats ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <GlowCard hoverable={false} className="text-center p-6">
                  <div className="flex justify-center mb-3 text-cyan-400">
                    {stat.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">{stat.title}</div>
                </GlowCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servers */}
      <section className="py-16 px-4" id="servers" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {servers.map((server, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible.servers ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <GlowCard className={`relative overflow-hidden before:bg-gradient-to-r before:${server.color} h-full ${
                  server.status === 'offline' ? 'opacity-75' : ''
                }`}>
                  {server.status === 'offline' && (
                    <div className="absolute top-4 right-4 bg-red-500/20 border border-red-500 rounded-full px-3 py-1 text-red-400 text-xs font-bold">
                      KAPALI
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-cyan-400 mb-2">{server.name}</h3>
                    <p className="text-gray-300 leading-relaxed text-sm">{server.description}</p>
                  </div>

                  {/* Server Status */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-400 text-sm">Durum:</span>
                      <div className={`flex items-center text-sm rounded-full px-3 py-1 ${
                        server.status === 'online' 
                          ? 'text-green-400 bg-green-500/20' 
                          : 'text-red-400 bg-red-500/20'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          server.status === 'online' 
                            ? 'bg-green-400 animate-pulse' 
                            : 'bg-red-400'
                        }`}></div>
                        <span className="font-semibold">{server.players}</span>
                      </div>
                    </div>

                    {server.version && (
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-400 text-sm">Versiyon:</span>
                        <span className="text-cyan-400 text-sm font-mono">{server.version}</span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Özellikler:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {server.features.map((feature, fIndex) => (
                        <div key={fIndex} className="text-xs text-gray-300 flex items-center">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Announcement for offline servers */}
                  {server.announcement && (
                    <div className="mb-6 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <div className="text-yellow-400 text-xs font-semibold mb-1">Duyuru:</div>
                      <div className="text-yellow-300 text-xs">{server.announcement}</div>
                    </div>
                  )}

                  {/* Server IP */}
                  <div className="mb-6 p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-gray-400 text-xs mb-2">Sunucu IP:</div>
                    <CopyButton text={server.ip} label="IP" />
                  </div>

                  {/* Connect Button */}
                  <GlowButton 
                    className="w-full" 
                    variant={server.status === 'online' ? 'primary' : 'secondary'}
                    disabled={server.status === 'offline'}
                    onClick={server.status === 'online' ? handleSunucuyaKatıl : undefined}
                  >
                    {server.status === 'online' ? 'Sunucuya Katıl' : 'Yakında Açılacak'}
                  </GlowButton>
                </GlowCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connection Guide */}
      <section className="py-16 px-4" id="guide" data-animate>
        <div className="max-w-4xl mx-auto">
          <GlowCard className="p-8">
            <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 mr-3" />
              Sunucuya Nasıl Bağlanılır?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-4">Adım Adım Rehber:</h4>
                <div className="space-y-4">
                  {[
                    "Minecraft Java Edition'ı başlatın",
                    "Ana menüden 'Çok Oyunculu' seçin",
                    "Yukarıdaki sunucu IP'sini kopyalayın",
                    "'Sunucu Ekle' butonuna tıklayın",
                    "IP'yi yapıştırın ve bağlanın!"
                  ].map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div className="bg-cyan-400/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 text-cyan-400 font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-300">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-4">Sistem Gereksinimleri:</h4>
                <div className="space-y-3 text-gray-300 text-sm">
                  <div className="flex justify-between">
                    <span>Minecraft Versiyonu:</span>
                    <span className="text-cyan-400">1.20.4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gerekli RAM:</span>
                    <span className="text-cyan-400">2GB+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>İnternet:</span>
                    <span className="text-cyan-400">Kararlı bağlantı</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform:</span>
                    <span className="text-cyan-400">Java Edition</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="text-green-400 text-sm font-semibold mb-2">💡 İpucu:</div>
                  <div className="text-green-300 text-sm">
                    En iyi deneyim için Optifine veya benzer performans modları kullanmanızı öneririz.
                  </div>
                </div>
              </div>
            </div>
          </GlowCard>
        </div>
      </section>
    </div>
  );
};

const StorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('ranks');
  const [cart, setCart] = useState([]);

  const categories = [
    { id: 'ranks', name: 'Rütbeler', icon: <Crown className="w-5 h-5" /> },
    { id: 'kits', name: 'PvP Kitleri', icon: <Sword className="w-5 h-5" /> },
    { id: 'cosmetics', name: 'Kostümler', icon: <Gem className="w-5 h-5" /> },
    { id: 'boosters', name: 'Güçlendiriciler', icon: <Zap className="w-5 h-5" /> }
  ];

  const products = {
    ranks: [
      {
        id: 1,
        name: "VIP Rütbesi",
        price: 25,
        originalPrice: 35,
        description: "Özel komutlar, renkli isim, özel spawn alanı ve günlük bonuslar",
        features: ["Renkli chat", "Özel prefix", "Günlük 100 coin", "VIP spawn"],
        popular: false,
        image: "👑"
      },
      {
        id: 2,
        name: "Premium Rütbesi",
        price: 45,
        originalPrice: 60,
        description: "VIP'nin tüm özelliklerini plus ekstra kitler ve cosmetic'ler",
        features: ["Tüm VIP özellikler", "3 özel kit", "Kozmetik erişimi", "Günlük 200 coin"],
        popular: true,
        image: "💎"
      },
      {
        id: 3,
        name: "Elite Rütbesi",
        price: 75,
        originalPrice: 100,
        description: "En üst seviye rütbe, özel arenalar ve sınırsız özellikler",
        features: ["Tüm Premium özellikler", "Özel arenalar", "Sınırsız kitler", "Günlük 500 coin"],
        popular: false,
        image: "🔱"
      }
    ],
    kits: [
      {
        id: 4,
        name: "Ninja Kiti",
        price: 15,
        description: "Hızlı saldırılar için tasarlanmış özel ninja ekipmanları",
        features: ["Hız II etkisi", "Görünmezlik potasyonu", "Özel ninja kılıcı"],
        image: "🥷"
      },
      {
        id: 5,
        name: "Gladyatör Kiti",
        price: 20,
        description: "Ağır zırh ve güçlü silahlarla düşmanlarını ez",
        features: ["Netherite zırh", "Güç III kılıç", "Sağlık artırıcı"],
        image: "⚔️"
      },
      {
        id: 6,
        name: "Büyücü Kiti",
        price: 18,
        description: "Büyülü silahlar ve potasyonlarla sihirli savaş",
        features: ["Büyülü ok", "Mana potasyonları", "Sihirli değnek"],
        image: "🔮"
      }
    ],
    cosmetics: [
      {
        id: 7,
        name: "Ejder Kanadları",
        price: 12,
        description: "Sırtında görsel olarak ejder kanadları taşı",
        features: ["Animasyonlu kanatlar", "Özel partiküller", "Uçma efekti"],
        image: "🐉"
      },
      {
        id: 8,
        name: "Alevli Kask",
        price: 8,
        description: "Kafanda sürekli yanan ateş efekti",
        features: ["Ateş animasyonu", "Özel ses efektleri"],
        image: "🔥"
      },
      {
        id: 9,
        name: "Gölge Pelerini",
        price: 15,
        description: "Gizemli görünüm için karanlık pelerin",
        features: ["Karanlık partiküller", "Gölge efekti", "Özel animasyon"],
        image: "🌙"
      }
    ],
    boosters: [
      {
        id: 10,
        name: "XP Booster %50",
        price: 5,
        description: "1 hafta boyunca %50 fazla deneyim puanı",
        features: ["7 gün süre", "%50 XP artışı", "Tüm aktiviteler"],
        image: "⚡"
      },
      {
        id: 11,
        name: "Coin Booster %100",
        price: 8,
        description: "3 gün boyunca ikiye katlanmış coin kazancı",
        features: ["3 gün süre", "%100 coin artışı", "Anında aktif"],
        image: "💰"
      },
      {
        id: 12,
        name: "Mega Booster Paketi",
        price: 20,
        description: "Tüm boosterları içeren süper paket",
        features: ["%100 XP", "%100 Coin", "1 ay süre", "Bonus hediyeler"],
        popular: true,
        image: "🚀"
      }
    ]
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? {...item, quantity: item.quantity + 1}
            : item
        );
      }
      return [...prev, {...product, quantity: 1}];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <section className="py-16 px-4 text-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Nautilus Mağaza
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Savaş gücünü artıracak özel öğeler ve rütbeler
          </p>
          <div className="flex items-center justify-center space-x-4 text-gray-400">
            <span className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-400" />
              Güvenli Ödeme
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" />
              Anında Teslimat
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:w-1/4">
            <GlowCard className="p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Kategoriler
              </h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                      selectedCategory === category.id 
                        ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30' 
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-cyan-400'
                    }`}
                  >
                    {category.icon}
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Cart Summary */}
              {cart.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Sepet ({cart.length})
                  </h4>
                  <div className="space-y-3 mb-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">{item.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-400">${item.price}</span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex justify-between font-bold text-cyan-400">
                      <span>Toplam:</span>
                      <span>${getTotalPrice()}</span>
                    </div>
                  </div>
                  <GlowButton className="w-full mt-4" variant="success">
                    Satın Al
                  </GlowButton>
                </div>
              )}
            </GlowCard>
          </div>

          {/* Main Content - Products */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products[selectedCategory]?.map(product => (
                <GlowCard key={product.id} className={`relative ${product.popular ? 'ring-2 ring-yellow-400' : ''}`}>
                  {product.popular && (
                    <div className="absolute -top-3 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                      En Popüler
                    </div>
                  )}
                  
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-4">{product.image}</div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-2">{product.name}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{product.description}</p>
                  </div>

                  {product.features && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">Özellikler:</h4>
                      <ul className="space-y-1">
                        {product.features.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-300 flex items-center">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-auto">
                    <div className="flex items-center justify-center mb-4">
                      {product.originalPrice && (
                        <span className="text-gray-500 line-through mr-2">${product.originalPrice}</span>
                      )}
                      <span className="text-2xl font-bold text-cyan-400">${product.price}</span>
                    </div>
                    
                    <GlowButton 
                      className="w-full" 
                      onClick={() => addToCart(product)}
                      size="small"
                    >
                      Sepete Ekle
                    </GlowButton>
                  </div>
                </GlowCard>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="mt-12">
              <GlowCard className="p-6">
                <h3 className="text-xl font-bold text-cyan-400 mb-6 text-center">Ödeme Yöntemleri</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  {[
                    { name: "PayPal", icon: "💳" },
                    { name: "Kredi Kartı", icon: "💳" },
                    { name: "Papara", icon: "📱" },
                    { name: "İninal", icon: "🎯" }
                  ].map((method, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800/70 transition-all duration-200">
                      <div className="text-3xl mb-2">{method.icon}</div>
                      <div className="text-sm text-gray-300">{method.name}</div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-gray-400 text-sm mt-6">
                  Tüm ödemeler SSL ile güvenceye alınmıştır. Satın aldığınız öğeler anında hesabınıza eklenir.
                </p>
              </GlowCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Ana Uygulama Komponenti
const NautilusPvPSite = () => {
  const { currentPath, navigate } = useRouter();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/sunucular':
        return <ServersPage />;
      case '/magaza':
        return <StorePage />;
      case '/siralama':
        return (
          <div className="pt-16 min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-cyan-400 mb-4">Sıralama</h1>
              <p className="text-gray-300">Bu sayfa yakında gelecek...</p>
            </div>
          </div>
        );
      case '/discord':
        return (
          <div className="pt-16 min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-cyan-400 mb-4">Discord</h1>
              <p className="text-gray-300">Discord sunucumuza katılın!</p>
              <GlowButton className="mt-6" onClick={() => window.open('https://discord.gg/nautilus', '_blank')}>
                Discord'a Katıl
              </GlowButton>
            </div>
          </div>
        );
      default:
        return (
          <div className="pt-16 min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-red-400 mb-4">404</h1>
              <p className="text-gray-300 mb-6">Sayfa bulunamadı</p>
              <GlowButton onClick={() => navigate('/')}>
                Ana Sayfaya Dön
              </GlowButton>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <FloatingParticles />
      
      <Navigation currentPath={currentPath} navigate={navigate} scrollY={scrollY} />
      
      <main>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-12 sm:py-16 px-4 bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-span-1 sm:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Logo size="normal" />
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Nautilus PvP
                </div>
              </div>
              <p className="text-gray-400 text-sm sm:text-base max-w-md leading-relaxed mb-6">
                Savaşçıların şan, şeref ve epik ödüller için savaştığı nihai Minecraft PvP savaş alanı. 
                Bugün savaşa katıl!
              </p>
              <div className="space-y-2 text-gray-400 text-sm sm:text-base">
                <div className="flex items-center">
                  <span className="mr-2">Sunucu IP:</span>
                  <span className="text-cyan-400 font-mono">play.atomland.xyz</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">Versiyon:</span>
                  <span className="text-cyan-400">1.20.4</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-cyan-400 flex items-center">
                <Server className="w-5 h-5 mr-2" />
                Oyun Modları
              </h3>
              <ul className="space-y-3 text-gray-400 text-sm sm:text-base">
                {['TrapPvP', 'BoxPvP', 'Turnuvalar', 'Etkinlikler'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => navigate('/sunucular')}
                      className="hover:text-cyan-400 transition-all duration-300 hover:translate-x-1 transform inline-block touch-manipulation text-left"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-cyan-400 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Topluluk
              </h3>
              <ul className="space-y-3 text-gray-400 text-sm sm:text-base">
                {[
                  { name: 'Discord Sunucusu', path: '/discord' },
                  { name: 'Sıralama Tablosu', path: '/siralama' },
                  { name: 'Savaş Kuralları', path: '/kurallar' },
                  { name: 'Destek', path: '/destek' }
                ].map((item) => (
                  <li key={item.name}>
                    <button 
                      onClick={() => navigate(item.path)}
                      className="hover:text-cyan-400 transition-all duration-300 hover:translate-x-1 transform inline-block touch-manipulation text-left"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800/50 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-sm sm:text-base">
              &copy; 2025 Nautilus PvP Sunucusu. Savaşçılar için, savaşçılar tarafından yapıldı.
            </p>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              Mojang AB veya Microsoft Corporation ile bağlantılı değildir.
            </p>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .touch-manipulation {
            min-height: 48px;
            min-width: 48px;
          }
          
          /* Prevent zoom on input focus */
          input, textarea, select {
            font-size: 16px !important;
          }
          
          /* Better mobile scrolling */
          body {
            -webkit-overflow-scrolling: touch;
          }
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* iOS Safari viewport fix */
        @supports (-webkit-touch-callout: none) {
          .min-h-screen {
            min-height: -webkit-fill-available;
          }
        }
        
        /* Better focus states for accessibility */
        button:focus, a:focus {
          outline: 2px solid rgba(34, 211, 238, 0.5);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default NautilusPvPSite;
