import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    ChevronRight, Play, Star, ArrowRight, Menu, X, Zap, Shield, 
    TrendingUp, BarChart3, Users, Building, Globe, Check, 
    ArrowUpRight, ArrowDownRight, Calendar, Target, PieChart, Layers, Search,
    Quote, CheckCircle, Sparkles, Rocket, Infinity, Cpu,
    Cloud, Database, Workflow, Bot, Satellite, Network,
    Server, GitBranch, Wifi, Radio, SatelliteDish, DollarSign, Package, AlertTriangle, Activity
} from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 selection:bg-primary selection:text-white font-sans">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/80 backdrop-blur-md border-b border-gray-800 shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-shade2 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">StockMaster</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Features</a>
              <a href="#integrations" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Integrations</a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Log in</Link>
              <Link to="/signup" className="bg-gradient-to-r from-primary to-shade2 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:from-shade1 hover:to-shade3 transition-all shadow-lg shadow-primary/20">
                Get Started
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button className="md:hidden text-gray-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-b border-gray-800 px-6 py-4 space-y-4 shadow-lg">
            <a href="#features" className="block text-gray-300 hover:text-primary">Features</a>
            <a href="#integrations" className="block text-gray-300 hover:text-primary">Integrations</a>
            <Link to="/login" className="block text-gray-300 hover:text-primary">Log in</Link>
            <Link to="/signup" className="block bg-gradient-to-r from-primary to-shade2 text-white text-center py-3 rounded-lg font-semibold">Get Started</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Enhanced Dark Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900"></div>
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#59598E 1px, transparent 1px),
                            linear-gradient(90deg, #59598E 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            backgroundPosition: 'center center'
          }}></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-shade2/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-shade3/5 rounded-full blur-[80px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          {/* Enhanced v2.0 Announcement */}
          <div className="relative inline-block mb-8 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-shade2 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gray-900/80 border border-gray-800 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Sparkles className="w-5 h-5 text-primary animate-bounce" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                </div>
                <span className="text-sm font-semibold bg-gradient-to-r from-primary to-shade2 bg-clip-text text-transparent">
                  v2.0 IS NOW LIVE
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-gray-700">
                <Rocket className="w-4 h-4 text-shade3 animate-pulse" />
                <span className="text-xs font-medium text-gray-400">50+ new features</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight text-white">
            Inventory management <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-shade2 to-shade3 animate-gradient">
              reimagined for scale.
            </span>
          </h1>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop wrestling with spreadsheets. StockMaster gives you real-time visibility, 
            predictive analytics, and automated workflows in one beautiful interface.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link to="/signup" className="w-full sm:w-auto bg-gradient-to-r from-primary to-shade2 hover:from-shade1 hover:to-shade3 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transform hover:scale-105">
              Start for free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 font-semibold text-lg transition-all flex items-center justify-center gap-2 text-gray-200 shadow-sm hover:shadow-md transform hover:scale-105">
              <Play className="w-5 h-5 fill-current" /> Watch Demo
            </button>
          </div>

          {/* Dashboard Preview */}
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-shade2 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition duration-500">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-800/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60 border border-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60 border border-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/60 border border-green-500"></div>
                </div>
                <div className="mx-auto text-xs font-mono text-gray-400">stockmaster.app</div>
              </div>
              <div className="p-6 bg-gray-900">
                {/* Mock Dashboard UI */}
                <div className="space-y-6">
                    {/* Header Mock */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <div className="h-8 w-48 bg-gray-800 rounded-lg mb-2 animate-pulse"></div>
                            <div className="h-4 w-64 bg-gray-800/50 rounded-lg animate-pulse"></div>
                        </div>
                        <div className="flex gap-3">
                            <div className="h-10 w-10 bg-gray-800 rounded-full animate-pulse"></div>
                            <div className="h-10 w-10 bg-gray-800 rounded-full animate-pulse"></div>
                        </div>
                    </div>

                    {/* Stats Grid Mock */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Value', val: '$25,430', color: 'text-green-400', icon: DollarSign },
                            { label: 'Total Items', val: '1,240', color: 'text-blue-400', icon: Package },
                            { label: 'Low Stock', val: '5', color: 'text-red-400', icon: AlertTriangle },
                            { label: 'Active Orders', val: '12', color: 'text-purple-400', icon: Activity }
                        ].map((stat, i) => (
                            <div key={i} className="bg-gray-800/50 border border-gray-700/50 p-4 rounded-xl backdrop-blur-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                                        <h3 className="text-xl font-bold text-white mt-1">{stat.val}</h3>
                                    </div>
                                    <div className={`p-2 rounded-lg bg-gray-800 ${stat.color}`}>
                                        <stat.icon className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Content Mock */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            {/* Receipt Card Mock */}
                            <div className="bg-gray-800/50 border border-gray-700/50 p-5 rounded-xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-[#59598E]"></div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-[#59598E] font-bold">Receipts</h3>
                                    <ArrowDownRight className="w-5 h-5 text-[#59598E]" />
                                </div>
                                <div className="w-full bg-[#59598E]/20 border border-[#59598E]/30 text-white py-2.5 rounded-lg text-center font-semibold mb-4">
                                    To Receive <span className="ml-2 bg-[#59598E] px-2 py-0.5 rounded text-xs">4</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-red-500/10 border border-red-500/20 p-2 rounded-lg text-center">
                                        <span className="block text-lg font-bold text-red-400">1</span>
                                        <span className="text-[10px] text-red-400/70 uppercase">Late</span>
                                    </div>
                                    <div className="bg-blue-500/10 border border-blue-500/20 p-2 rounded-lg text-center">
                                        <span className="block text-lg font-bold text-blue-400">6</span>
                                        <span className="text-[10px] text-blue-400/70 uppercase">Ops</span>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Card Mock */}
                            <div className="bg-gray-800/50 border border-gray-700/50 p-5 rounded-xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-[#8383AD]"></div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-[#8383AD] font-bold">Deliveries</h3>
                                    <ArrowUpRight className="w-5 h-5 text-[#8383AD]" />
                                </div>
                                <div className="w-full bg-[#8383AD]/20 border border-[#8383AD]/30 text-white py-2.5 rounded-lg text-center font-semibold mb-4">
                                    To Deliver <span className="ml-2 bg-[#8383AD] px-2 py-0.5 rounded text-xs">4</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="bg-red-500/10 border border-red-500/20 p-2 rounded-lg text-center">
                                        <span className="block text-lg font-bold text-red-400">1</span>
                                        <span className="text-[10px] text-red-400/70 uppercase">Late</span>
                                    </div>
                                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-2 rounded-lg text-center">
                                        <span className="block text-lg font-bold text-yellow-400">2</span>
                                        <span className="text-[10px] text-yellow-400/70 uppercase">Wait</span>
                                    </div>
                                    <div className="bg-blue-500/10 border border-blue-500/20 p-2 rounded-lg text-center">
                                        <span className="block text-lg font-bold text-blue-400">6</span>
                                        <span className="text-[10px] text-blue-400/70 uppercase">Ops</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Chart & Activity */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* Chart Mock */}
                            <div className="bg-gray-800/50 border border-gray-700/50 p-5 rounded-xl h-48 flex flex-col">
                                <h3 className="text-gray-400 text-sm font-bold mb-4">Stock Movement Trends</h3>
                                <div className="flex-1 flex items-end justify-between gap-2 px-2">
                                    {[40, 65, 30, 85, 50, 75, 45, 60, 90, 55, 70, 80].map((h, i) => (
                                        <div key={i} className="w-full bg-gradient-to-t from-[#59598E]/20 to-[#59598E] rounded-t-sm relative group" style={{ height: `${h}%` }}>
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-gray-700">
                                                {h * 10}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-2 text-xs text-gray-500 font-mono">
                                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                                </div>
                            </div>

                            {/* Activity Mock */}
                            <div className="bg-gray-800/50 border border-gray-700/50 p-5 rounded-xl">
                                <h3 className="text-gray-400 text-sm font-bold mb-4">Recent Activity</h3>
                                <div className="space-y-3">
                                    {[
                                        { action: 'Received Stock', item: 'Widget A', time: '2m ago', icon: ArrowDownRight, color: 'text-green-400', bg: 'bg-green-500/10' },
                                        { action: 'Dispatched Order', item: 'Gadget B', time: '15m ago', icon: ArrowUpRight, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                                        { action: 'Stock Adjustment', item: 'Tool C', time: '1h ago', icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                                    ].map((act, i) => (
                                        <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-1.5 rounded-full ${act.bg}`}>
                                                    <act.icon className={`w-3.5 h-3.5 ${act.color}`} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-200">{act.action}</p>
                                                    <p className="text-xs text-gray-500">{act.item}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-600 font-mono">{act.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 border-y border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-medium text-gray-400 mb-8">TRUSTED BY INNOVATIVE TEAMS</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {['Acme Corp', 'GlobalTech', 'Nebula', 'FoxRun', 'Circle'].map((brand) => (
              <span key={brand} className="text-xl font-bold text-gray-300">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Horizontal Accordion */}
      <section id="features" className="py-24 relative overflow-hidden bg-gray-900">
        {/* Network Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #59598E 2px, transparent 0),
                            radial-gradient(circle at 75% 75%, #6E6E9D 2px, transparent 0)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Everything you need.</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-shade2 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Built for speed and reliability. Hover to explore.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 h-[600px] w-full">
            {[
              {
                title: "Real-time Analytics",
                icon: TrendingUp,
                desc: "Visualize your stock movements with beautiful, interactive charts.",
                gradient: "from-primary/80 to-primary",
                img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Lightning Fast",
                icon: Zap,
                desc: "Optimized for performance. Search 100,000+ items in milliseconds.",
                gradient: "from-shade2/80 to-shade2",
                img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Enterprise Security",
                icon: Shield,
                desc: "Role-based access control and audit logs for your peace of mind.",
                gradient: "from-shade3/80 to-shade3",
                img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Multi-Warehouse",
                icon: Layers,
                desc: "Manage stock across unlimited locations with ease.",
                gradient: "from-shade1/80 to-shade1",
                img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`relative flex-1 group hover:flex-[3] transition-all duration-500 ease-out overflow-hidden rounded-3xl cursor-pointer shadow-2xl bg-gradient-to-b ${feature.gradient}`}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors z-10"></div>
                <img src={feature.img} alt={feature.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 border border-white/30">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 whitespace-nowrap opacity-100">{feature.title}</h3>
                  <p className="text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-md">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Seamless Integration Section */}
      <section id="integrations" className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-shade1/10">
        {/* Circuit Board Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(90deg, transparent 79px, #59598E 79px, #59598E 81px, transparent 81px),
                            linear-gradient(#59598E 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        {/* Animated Nodes */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full animate-ping"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${30 + (i * 5)}%`,
                animationDelay: `${i * 0.5}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {/* Enhanced Header */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                  <Satellite className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">SEAMLESS INTEGRATION</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  Connect your entire
                  <span className="block bg-gradient-to-r from-primary to-shade2 bg-clip-text text-transparent">
                    tech ecosystem
                  </span>
                </h2>
                <p className="text-gray-300 text-lg max-w-lg">
                  StockMaster integrates with 50+ tools out of the box. Connect your ERP, e-commerce, 
                  and logistics platforms in minutes, not months.
                </p>
              </div>

              {/* Enhanced Feature List */}
              <div className="space-y-6">
                {[
                  { icon: Cloud, text: "Real-time cloud sync across all platforms" },
                  { icon: Workflow, text: "Automated workflow triggers and actions" },
                  { icon: Bot, text: "AI-powered inventory optimization" },
                  { icon: Database, text: "Unlimited API calls and webhooks" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 group hover:translate-x-2 transition-transform duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-shade2/20 rounded-xl flex items-center justify-center group-hover:from-primary/30 group-hover:to-shade2/30 transition-all duration-300 border border-white/10">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-gray-200 font-medium group-hover:text-white transition-colors">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Integration Logos */}
              <div className="pt-8">
                <p className="text-gray-400 text-sm font-medium mb-4">COMPATIBLE WITH</p>
                <div className="flex flex-wrap gap-4">
                  {['Shopify', 'QuickBooks', 'Salesforce', 'Zapier', 'Slack', 'AWS'].map((tool) => (
                    <div key={tool} className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                      <span className="text-gray-200 text-sm font-medium">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Visual Component */}
            <div className="relative">
              {/* Connection Lines */}
              <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <path
                    d="M50,100 C150,50 250,150 350,100"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    fill="none"
                    className="animate-pulse"
                  />
                  <path
                    d="M50,200 C150,150 250,250 350,200"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    fill="none"
                    className="animate-pulse"
                    style={{animationDelay: '0.5s'}}
                  />
                  <path
                    d="M50,300 C150,250 250,350 350,300"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    fill="none"
                    className="animate-pulse"
                    style={{animationDelay: '1s'}}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#59598E" />
                      <stop offset="100%" stopColor="#6E6E9D" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Main Card */}
              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-3xl p-8 text-white shadow-2xl relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-1">
                    <div className="font-mono text-sm text-gray-400">ACTIVE CONNECTIONS</div>
                    <div className="text-2xl font-bold text-white">12/12</div>
                  </div>
                  <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-green-300">All Systems Go</span>
                  </div>
                </div>

                {/* Connection Lines */}
                <div className="space-y-6">
                  {[
                    { name: "ERP System", status: "syncing", progress: 75, icon: Server },
                    { name: "E-commerce", status: "active", progress: 100, icon: Globe },
                    { name: "Logistics", status: "connected", progress: 100, icon: GitBranch }
                  ].map((connection, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <connection.icon className="w-4 h-4 text-primary" />
                          <span className="font-medium text-white">{connection.name}</span>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          connection.status === 'active' ? 'bg-green-500/20 text-green-300' :
                          connection.status === 'syncing' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {connection.status}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            connection.status === 'active' ? 'bg-green-400' :
                            connection.status === 'syncing' ? 'bg-blue-400 animate-pulse' :
                            'bg-yellow-400'
                          }`}
                          style={{ width: `${connection.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live Data Feed */}
                <div className="mt-8 p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                  <div className="flex items-center gap-2 mb-3">
                    <SatelliteDish className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-gray-200">Live Data Stream</span>
                  </div>
                  <div className="space-y-2 text-xs font-mono text-gray-400">
                    <div className="flex justify-between hover:text-gray-300 transition-colors">
                      <span>📦 Order #2847 processed</span>
                      <span>2s ago</span>
                    </div>
                    <div className="flex justify-between hover:text-gray-300 transition-colors">
                      <span>🔄 Stock levels updated</span>
                      <span>5s ago</span>
                    </div>
                    <div className="flex justify-between hover:text-gray-300 transition-colors">
                      <span>📊 Analytics refreshed</span>
                      <span>8s ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-shade2/20"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Ready to take control?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of modern teams who have switched to StockMaster.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup" className="bg-gradient-to-r from-primary to-shade2 hover:from-shade1 hover:to-shade3 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-primary/20 hover:shadow-2xl">
              Get Started Now
            </Link>
            <Link to="/login" className="px-8 py-4 rounded-full border border-gray-700 hover:bg-gray-800 font-bold text-lg transition-colors text-gray-200 bg-gray-800/50">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-shade2 rounded flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white">StockMaster</span>
              </div>
              <p className="text-gray-400 text-sm">
                The modern standard for inventory management.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© 2024 StockMaster Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors"><Globe className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
