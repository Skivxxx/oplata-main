// app.tsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Menu, X, Search, User, CreditCard, Smartphone, Wifi, Building, Receipt, Star,
  ChevronDown, ChevronUp, ArrowRight, CheckCircle, AlertCircle, Info, Clock,
  Shield, Users, Plane, Flower2, GraduationCap, Ticket, Heart, ShoppingCart
} from "lucide-react";

// ───────────────────────────────────────────────────────────────────────────────
// Временный кабинет (заглушка)
// ───────────────────────────────────────────────────────────────────────────────
function Account() {
  return <div style={{ padding: 24 }}>Здесь будет кабинет</div>;
}

// ───────────────────────────────────────────────────────────────────────────────
// Главное приложение (весь твой функционал здесь)
// ───────────────────────────────────────────────────────────────────────────────
function HomeApp() {
  // Состояния
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentPage, setCurrentPage] = useState<"home" | "payment" | "transfer">("home");
  const [currentService, setCurrentService] = useState<any>(null);
  const [paymentData, setPaymentData] = useState<{ [k: string]: any }>({
    accountNumber: "",
    amount: "",
    email: "",
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [transferData, setTransferData] = useState({
    fromCard: "",
    toCard: "",
    amount: "",
    purpose: "",
    senderName: "",
    senderPhone: "",
    recipientName: "",
    recipientPhone: "",
    senderCard: "",
    receiverCard: "",
  });

  // Данные
  const popularServices = [
    { name: "Loteria", logo: "/LOTERIAlogo.png", color: "bg-white", id: "loteria" },
    { name: "Orange", logo: "/orange-logo.png", color: "bg-white", id: "orange" },
    { name: "eCredit", logo: "💳", color: "bg-blue-500", id: "ecredit" },
    { name: "InfoCom", logo: "📺", color: "bg-gray-600", id: "infocom" },
    { name: "Premier Energy", logo: "⚡", color: "bg-green-600", id: "premier" },
    { name: "Avon", logo: "💄", color: "bg-pink-500", id: "avon" },
    { name: "Moldcell", logo: "/moldcell-logo.png", color: "bg-white", id: "moldcell" },
    { name: "Iute", logo: "/iute-logo.png", color: "bg-white", id: "iute" },
    { name: "RCA Verde", logo: "🚗", color: "bg-green-500", id: "rca" },
    { name: "Carte Verde", logo: "🚗", color: "bg-emerald-500", id: "carte" },
    { name: "Moldovagaz", logo: "🔥", color: "bg-blue-600", id: "gas" },
    { name: "Termoelectrica", logo: "🏭", color: "bg-orange-600", id: "termo" },
    { name: "MicroInvest", logo: "💰", color: "bg-teal-600", id: "micro" },
    { name: "Sebo", logo: "🏪", color: "bg-yellow-500", id: "sebo" },
    { name: "Fee-Nord", logo: "🏢", color: "bg-gray-700", id: "fee" },
    { name: "InfoSapr", logo: "📊", color: "bg-indigo-600", id: "info" },
  ];

  const categories = [
    {
      name: "Telefonia mobilă",
      icon: Smartphone,
      count: "45+",
      gradient: "from-blue-500 to-cyan-400",
      id: "mobile",
      services: [
        { name: "ORANGE", logo: "🟠", color: "bg-orange-500", description: "Reîncărcări și facturi Orange", id: "orange" },
        { name: "MOLDCELL", logo: "🟣", color: "bg-purple-600", description: "Servicii Moldcell", id: "moldcell" },
        { name: "SIMTRAVEL", logo: "✈️", color: "bg-blue-500", description: "SIM pentru călătorii", id: "simtravel" },
        { name: "MOLDTELECOM", logo: "📞", color: "bg-red-600", description: "Servicii Moldtelecom", id: "moldtelecom" },
      ],
    },
    {
      name: "Servicii comunale",
      icon: Building,
      count: "30+",
      gradient: "from-green-500 to-emerald-400",
      id: "utilities",
      services: [
        { name: "PREMIER ENERGY", logo: "⚡", color: "bg-green-600", description: "Facturi energie electrică", id: "premier" },
        { name: "MOLDOVAGAZ", logo: "🔥", color: "bg-blue-600", description: "Facturi gaze naturale", id: "gas" },
        { name: "TERMOELECTRICA", logo: "🏭", color: "bg-orange-600", description: "Încălzire centralizată", id: "termo" },
        { name: "APĂCANAL", logo: "💧", color: "bg-cyan-500", description: "Servicii de apă și canalizare", id: "apacanal" },
      ],
    },
    {
      name: "Operatori internet și TV",
      icon: Wifi,
      count: "25+",
      gradient: "from-purple-500 to-pink-400",
      id: "internet",
      services: [
        { name: "MOLDTELECOM", logo: "📡", color: "bg-red-600", description: "Internet și TV digital", id: "moldtelecom-internet" },
        { name: "STARNET", logo: "🌟", color: "bg-purple-600", description: "Internet de mare viteză", id: "starnet" },
        { name: "SUN COMMUNICATIONS", logo: "☀️", color: "bg-yellow-500", description: "Servicii de telecomunicații", id: "sun" },
        { name: "ARAX", logo: "📺", color: "bg-blue-500", description: "TV prin cablu și internet", id: "arax" },
      ],
    },
    {
      name: "Plăți de stat",
      icon: Receipt,
      count: "20+",
      gradient: "from-orange-500 to-red-400",
      id: "government",
      services: [
        { name: "FISC", logo: "🏛️", color: "bg-gray-600", description: "Impozite și taxe de stat", id: "fisc" },
        { name: "CNAM", logo: "🏥", color: "bg-green-600", description: "Asigurări medicale obligatorii", id: "cnam" },
        { name: "CNPF", logo: "👥", color: "bg-blue-600", description: "Contribuții sociale", id: "cnpf" },
        { name: "PRIMĂRIA", logo: "🏢", color: "bg-purple-600", description: "Taxe locale și amenzi", id: "primaria" },
      ],
    },
    {
      name: "Plata creditelor",
      icon: CreditCard,
      count: "15+",
      gradient: "from-teal-500 to-blue-400",
      id: "credit",
      services: [
        { name: "MAIB", logo: "🏦", color: "bg-blue-600", description: "Credite și împrumuturi MAIB", id: "maib" },
        { name: "VICTORIABANK", logo: "🏛️", color: "bg-green-600", description: "Produse de credit Victoria Bank", id: "victoriabank" },
        { name: "MICROINVEST", logo: "💰", color: "bg-teal-600", description: "Microfinanțare și credite", id: "microinvest" },
        { name: "EXIMBANK", logo: "💳", color: "bg-purple-600", description: "Servicii bancare Eximbank", id: "eximbank" },
      ],
    },
    { name: "Jocuri", icon: Gamepad2, count: "12+", gradient: "from-indigo-500 to-purple-400", id: "games",
      services: [
        { name: "STEAM", logo: "🎮", color: "bg-gray-800", description: "Jocuri PC și console", id: "steam" },
        { name: "PLAYSTATION", logo: "🎯", color: "bg-blue-600", description: "PlayStation Network", id: "playstation" },
        { name: "XBOX", logo: "🎲", color: "bg-green-600", description: "Xbox Live și Game Pass", id: "xbox" },
        { name: "MOBILE GAMES", logo: "📱", color: "bg-purple-600", description: "Jocuri mobile și aplicații", id: "mobile-games" },
      ],
    },
    {
      name: "E-commerce",
      icon: ShoppingCart,
      count: "50+",
      gradient: "from-pink-500 to-rose-400",
      id: "ecommerce",
      services: [
        { name: "DARWIN", logo: "🛒", color: "bg-orange-500", description: "Magazin online Darwin", id: "darwin" },
        { name: "ENTER", logo: "💻", color: "bg-blue-600", description: "Electronice și tehnică", id: "enter" },
        { name: "LINELLA", logo: "🛍️", color: "bg-green-600", description: "Supermarket online", id: "linella" },
        { name: "FASHION", logo: "👗", color: "bg-pink-500", description: "Modă și accesorii", id: "fashion" },
      ],
    },
    {
      name: "Turism",
      icon: Plane,
      count: "8+",
      gradient: "from-cyan-500 to-teal-400",
      id: "tourism",
      services: [
        { name: "BOOKING", logo: "🏨", color: "bg-blue-600", description: "Rezervări hoteluri", id: "booking" },
        { name: "AVIASALES", logo: "✈️", color: "bg-cyan-500", description: "Bilete de avion", id: "aviasales" },
        { name: "RENT A CAR", logo: "🚗", color: "bg-green-600", description: "Închirieri auto", id: "rent-car" },
        { name: "EXCURSII", logo: "🗺️", color: "bg-purple-600", description: "Tururi și excursii", id: "excursii" },
      ],
    },
    {
      name: "Frumusețe și Sănătate",
      icon: Flower2,
      count: "35+",
      gradient: "from-green-400 to-cyan-400",
      id: "beauty",
      services: [
        { name: "AVON", logo: "💄", color: "bg-pink-500", description: "Cosmetice și parfumuri", id: "avon" },
        { name: "ORIFLAME", logo: "🌸", color: "bg-purple-500", description: "Produse de frumusețe", id: "oriflame" },
        { name: "FARMACIA", logo: "💊", color: "bg-green-600", description: "Medicamente și suplimente", id: "farmacia" },
        { name: "SPA SERVICES", logo: "🧴", color: "bg-blue-500", description: "Servicii spa și wellness", id: "spa" },
      ],
    },
    {
      name: "Cursuri",
      icon: GraduationCap,
      count: "18+",
      gradient: "from-blue-400 to-indigo-400",
      id: "courses",
      services: [
        { name: "UDEMY", logo: "📚", color: "bg-purple-600", description: "Cursuri online diverse", id: "udemy" },
        { name: "COURSERA", logo: "🎓", color: "bg-blue-600", description: "Educație universitară", id: "coursera" },
        { name: "LIMBA ENGLEZĂ", logo: "🗣️", color: "bg-green-600", description: "Cursuri de limbi străine", id: "english" },
        { name: "IT ACADEMY", logo: "💻", color: "bg-orange-500", description: "Cursuri de programare", id: "it-academy" },
      ],
    },
    {
      name: "Loteria",
      icon: Ticket,
      count: "5+",
      gradient: "from-yellow-500 to-orange-400",
      id: "lottery",
      services: [
        { name: "LOTERIA NAȚIONALĂ", logo: "🎯", color: "bg-red-500", description: "Bilete loterie națională", id: "loteria" },
        { name: "NOROC", logo: "🍀", color: "bg-green-500", description: "Jocuri de noroc Noroc", id: "noroc" },
        { name: "LOTO", logo: "🎲", color: "bg-blue-500", description: "Loto și jocuri numerice", id: "loto" },
        { name: "INSTANT", logo: "⚡", color: "bg-yellow-500", description: "Jocuri instant câștigătoare", id: "instant" },
      ],
    },
    {
      name: "Donații",
      icon: Heart,
      count: "10+",
      gradient: "from-red-400 to-pink-400",
      id: "donations",
      services: [
        { name: "CARITAS", logo: "❤️", color: "bg-red-500", description: "Organizație caritabilă", id: "caritas" },
        { name: "COPII ÎN DIFICULTATE", logo: "👶", color: "bg-blue-500", description: "Ajutor pentru copii", id: "copii" },
        { name: "MEDICI FĂRĂ FRONTIERE", logo: "🏥", color: "bg-green-500", description: "Asistență medicală", id: "medici" },
        { name: "PROTECȚIA ANIMALELOR", logo: "🐕", color: "bg-purple-500", description: "Îngrijirea animalelor", id: "animale" },
      ],
    },
  ];

  // Вспомогательные
  const getServiceFields = (serviceId: string) => {
    const serviceFields: { [k: string]: Array<{ name: string; label: string; type: string; placeholder?: string; options?: string[] }> } = {
      orange: [{ name: "phoneNumber", label: "Номер телефона (79xxxxxx)/Счёт:", type: "text", placeholder: "79xxxxxxx" }],
      moldcell: [{ name: "phoneNumber", label: "Номер телефона (79xxxxxx)/Счёт:", type: "text", placeholder: "79xxxxxxx" }],
      carte: [
        { name: "validityPeriod", label: "Срок действия:", type: "select", options: ["1 месяц", "3 месяца", "6 месяцев", "12 месяцев"] },
        { name: "direction", label: "Направление:", type: "select", options: ["Румыния", "Болгария", "Венгрия", "Другие страны ЕС"] },
        { name: "techPassportNumber", label: "Номер техпаспорта:", type: "text", placeholder: "Введите номер техпаспорта" },
        { name: "idnp", label: "IDNP:", type: "text", placeholder: "Введите IDNP" },
      ],
      rca: [
        { name: "validityPeriod", label: "Срок действия:", type: "select", options: ["15 дней", "1 месяц", "2 месяца", "3 месяца", "6 месяцев", "12 месяцев"] },
        { name: "direction", label: "Направление:", type: "select", options: ["Румыния", "Болгария", "Венгрия", "Другие страны ЕС"] },
        { name: "techPassportNumber", label: "Номер техпаспорта:", type: "text", placeholder: "Введите номер техпаспорта" },
        { name: "idnp", label: "IDNP:", type: "text", placeholder: "Введите IDNP" },
      ],
      premier: [{ name: "accountNumber", label: "Номер лицевого счёта:", type: "text", placeholder: "Введите номер счёта" }],
      gas: [{ name: "accountNumber", label: "Номер лицевого счёта:", type: "text", placeholder: "Введите номер счёта" }],
      termo: [{ name: "accountNumber", label: "Номер лицевого счёта:", type: "text", placeholder: "Введите номер счёта" }],
    };
    return serviceFields[serviceId] || [{ name: "accountNumber", label: "Номер счёта:", type: "text", placeholder: "Введите номер счёта" }];
  };

  const handleServiceClick = (serviceId: string, serviceName?: string, serviceLogo?: string, serviceColor?: string) => {
    let service = popularServices.find((s) => s.id === serviceId) as any;
    if (!service && serviceName) {
      service = { id: serviceId, name: serviceName, logo: serviceLogo || "🔷", color: serviceColor || "bg-blue-500" };
    }
    if (!service) {
      for (const category of categories) {
        if (category.services) {
          const foundService = category.services.find((s) => s.id === serviceId) as any;
          if (foundService) {
            service = { id: foundService.id, name: foundService.name, logo: foundService.logo, color: foundService.color };
            break;
          }
        }
      }
    }
    if (service) {
      setCurrentService(service);
      setCurrentPage("payment");
      setCurrentStep(1);
      setPaymentData({ accountNumber: "", amount: "", email: "" });
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (category && category.services) {
      setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    }
  };

  const handleInputChange = (field: string, value: string) => setPaymentData((prev) => ({ ...prev, [field]: value }));
  const handleTransferInputChange = (field: string, value: string) => setTransferData((prev) => ({ ...prev, [field]: value }));

  const handleContinue = () => setCurrentStep((s) => Math.min(3, s + 1));
  const handleCancel = () => {
    setCurrentPage("home");
    setCurrentService(null);
    setCurrentStep(1);
  };
  const handleCardTransfer = () => setCurrentPage("transfer");
  const handleTransferSubmit = () => console.log("Transfer data:", transferData);
  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const shouldShowServicesAfterRow = (rowIndex: number, categoryId: string) => {
    const itemsPerRow = 4;
    const categoryIndex = categories.findIndex((cat) => cat.id === categoryId);
    const rowOfCategory = Math.floor(categoryIndex / itemsPerRow);
    return rowIndex === rowOfCategory && expandedCategory === categoryId;
  };
  const getCategoriesForRow = (rowIndex: number) => {
    const itemsPerRow = 4;
    const startIndex = rowIndex * itemsPerRow;
    return categories.slice(startIndex, startIndex + itemsPerRow);
  };
  const totalRows = Math.ceil(categories.length / 4);

  // Страницы
  const renderTransferPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">OPLATA.MD</h1>
                <p className="text-xs text-slate-500">Plătește serviciile online</p>
              </div>
            </div>
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Căutare rapidă a serviciilor..."
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                />
              </div>
              <button className="ml-3 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl">OK</button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">0</span>
              </button>
              <button className="p-2 text-slate-600 hover:text-blue-600 transition-colors">
                <User className="w-6 h-6" />
              </button>
              <button className="hidden md:block px-4 py-2 text-slate-600 hover:text-blue-600 transition-colors font-medium">Ieșire</button>
              <button className="px-4 py-2 text-slate-600 hover:text-blue-600 transition-colors font-medium">Ro</button>
              <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Căutare servicii..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
            />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-2 mb-8 text-sm text-slate-600">
          <button onClick={() => setCurrentPage("home")} className="hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-lg flex items-center space-x-2">
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Назад</span>
          </button>
          <button onClick={() => setIsLoginModalOpen(true)} className="hidden md:block px-4 py-2 text-slate-600 hover:text-blue-600 transition-colors font-medium">
            LOGIN
          </button>
        </div>

        {/* Карточки ввода для перевода */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 p-8 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <CreditCard className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Transfer rapid</h1>
                <p className="text-blue-100">Transferă bani instant între carduri bancare</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 border-b border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Instant</h3>
                  <p className="text-sm text-slate-600">Transfer în timp real</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Securizat</h3>
                  <p className="text-sm text-slate-600">Protecție SSL 256-bit</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Convenabil</h3>
                  <p className="text-sm text-slate-600">24/7 disponibil</p>
                </div>
              </div>
            </div>
          </div>

          {/* Форма перевода (укороченная версия для работоспособности) */}
          <div className="p-8">
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-8 rounded-2xl shadow-xl">
                    <h4 className="text-white font-bold text-lg mb-4">De pe cardul</h4>
                    <label className="block text-white font-medium mb-2 text-sm">Cardul expeditorului</label>
                    <input
                      type="text"
                      placeholder="Numărul cardului expeditorului"
                      value={transferData.senderCard}
                      onChange={(e) => setTransferData({ ...transferData, senderCard: e.target.value })}
                      className="w-full px-4 py-3 bg-white/95 border-0 rounded-lg"
                    />
                  </div>
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-8 rounded-2xl shadow-xl">
                    <h4 className="text-white font-bold text-lg mb-4">La cardul</h4>
                    <label className="block text-white font-medium mb-2 text-sm">Cardul destinatarului</label>
                    <input
                      type="text"
                      placeholder="Cardul destinatarului"
                      value={transferData.receiverCard}
                      onChange={(e) => setTransferData({ ...transferData, receiverCard: e.target.value })}
                      className="w-full px-4 py-3 bg-white/95 border-0 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-800 flex items-center">
                  <Receipt className="w-5 h-5 mr-2 text-blue-600" />
                  Detalii transfer
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Suma (MDL) *</label>
                    <input
                      type="number"
                      value={transferData.amount}
                      onChange={(e) => handleTransferInputChange("amount", e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                      placeholder="0.00"
                      min={1}
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Scopul transferului</label>
                    <select
                      value={transferData.purpose}
                      onChange={(e) => handleTransferInputChange("purpose", e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                    >
                      <option value="">Selectează scopul</option>
                      <option value="personal">Transfer personal</option>
                      <option value="family">Ajutor familial</option>
                      <option value="business">Plată pentru servicii</option>
                      <option value="gift">Cadou</option>
                      <option value="other">Altul</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-2">Informații despre comision</h3>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• Comision: 1.5% din suma transferului (min. 5 MDL)</li>
                      <li>• Transferul se efectuează instant</li>
                      <li>• Suport 24/7 pentru orice întrebări</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-2">
                <button onClick={() => setCurrentPage("home")} className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl">
                  Anulează
                </button>
                <button
                  onClick={handleTransferSubmit}
                  disabled={!transferData.senderCard || !transferData.receiverCard || !transferData.amount}
                  className="flex-1 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl disabled:opacity-50"
                >
                  Continuă transferul
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentPage = () => {
    if (!currentService) return null;
    const serviceFields = getServiceFields(currentService.id);

    if (currentStep === 1) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          {/* Header и боковые блоки опущены ради краткости — они совпадают со страницей transfer */}
          {/* Хлебные крошки */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="lg:flex lg:gap-8">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-6 text-sm text-slate-600">
                  <button onClick={() => setCurrentPage("home")} className="hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-lg">
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </button>
                  <span className="text-lg font-semibold text-slate-800">Оплата {currentService.name}</span>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                  <div className="max-w-2xl">
                    <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-slate-200">
                      <div className={`w-20 h-20 ${currentService.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <div className="text-white text-center">
                          <div className="text-2xl">{currentService.logo}</div>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800">{currentService.name}</h2>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {serviceFields.map((field, index) => (
                        <div key={index}>
                          <label className="block text-sm font-medium text-slate-700 mb-2">{field.label}</label>
                          {field.type === "select" ? (
                            <select
                              value={paymentData[field.name] || ""}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                              className="w-full max-w-md px-4 py-3 border border-slate-300 rounded-xl"
                            >
                              <option value="">Выберите...</option>
                              {field.options?.map((option, i) => (
                                <option key={i} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={field.type}
                              value={paymentData[field.name] || ""}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                              className="w-full max-w-md px-4 py-3 border border-slate-300 rounded-xl"
                              placeholder={field.placeholder}
                            />
                          )}
                        </div>
                      ))}

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Suma de plată (MDL):</label>
                        <input
                          type="number"
                          value={paymentData.amount}
                          onChange={(e) => handleInputChange("amount", e.target.value)}
                          className="w-full max-w-md px-4 py-3 border border-slate-300 rounded-xl"
                          min={0}
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4 mt-8">
                      <button onClick={handleCancel} className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl">
                        Отмена
                      </button>
                      <button
                        onClick={handleContinue}
                        disabled={!paymentData.amount || serviceFields.some((f) => !paymentData[f.name])}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl disabled:opacity-50"
                      >
                        Продолжить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (currentStep === 2) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center space-x-2 mb-6 text-sm text-slate-600">
              <button onClick={() => setCurrentStep(1)} className="hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-lg">
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
              <span className="text-lg font-semibold text-slate-800">Подтверждение оплаты {currentService.name}</span>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <div className="max-w-2xl">
                <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-slate-200">
                  <div className={`w-20 h-20 ${currentService.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <div className="text-white text-center">
                      <div className="text-2xl">{currentService.logo}</div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800">{currentService.name}</h2>
                    <p className="text-slate-600">Подтверждение данных</p>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    Детали платежа
                  </h3>

                  <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                    {serviceFields.map((field, index) => {
                      const value = paymentData[field.name];
                      return value ? (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-slate-200 last:border-b-0">
                          <span className="text-slate-600">{field.label}</span>
                          <span className="font-medium text-slate-800">{value}</span>
                        </div>
                      ) : null;
                    })}
                    <div className="flex justify-between items-center py-2 border-b border-slate-200 last:border-b-0">
                      <span className="text-slate-600">Сумма к оплате:</span>
                      <span className="font-bold text-lg text-blue-600">{paymentData.amount} MDL</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-8">
                  <div className="flex items-start space-x-3 mb-4">
                    <Mail className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-amber-800 mb-1">Email для подтверждения</h3>
                      <p className="text-sm text-amber-700">Укажите email для получения чека и подтверждения платежа</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-2">Email адрес *</label>
                    <input
                      type="email"
                      value={paymentData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full max-w-md px-4 py-3 border border-amber-300 rounded-xl"
                      placeholder="example@email.com"
                    />
                    {paymentData.email && !isValidEmail(paymentData.email) && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Введите корректный email адрес
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button onClick={() => setCurrentStep(1)} className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl">
                    Назад
                  </button>
                  <button
                    onClick={handleContinue}
                    disabled={!paymentData.email || !isValidEmail(paymentData.email)}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl disabled:opacity-50"
                  >
                    Продолжить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (currentStep === 3) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center space-x-2 mb-6 text-sm text-slate-600">
              <button onClick={() => setCurrentStep(2)} className="hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-lg">
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
              <span className="text-lg font-semibold text-slate-800">Способ оплаты {currentService.name}</span>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <div className="max-w-2xl">
                <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-slate-200">
                  <div className={`w-20 h-20 ${currentService.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <div className="text-white text-center">
                      <div className="text-2xl">{currentService.logo}</div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800">{currentService.name}</h2>
                    <p className="text-slate-600">Выберите способ оплаты</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-8">
                  <h3 className="font-semibold text-slate-800 mb-4">Итого к оплате</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Сумма платежа:</span>
                      <span className="font-medium">{paymentData.amount} MDL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Комиссия:</span>
                      <span className="font-medium">0.00 MDL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Email:</span>
                      <span className="font-medium">{paymentData.email}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-800">Итого:</span>
                        <span className="font-bold text-lg text-blue-600">{paymentData.amount} MDL</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h3 className="text-lg font-semibold text-slate-800">Способы оплаты</h3>
                  <div className="border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800">Банковские карты</h4>
                        <p className="text-sm text-slate-600">Visa, Mastercard, МИР</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button onClick={() => setCurrentStep(2)} className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl">
                    Назад
                  </button>
                  <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl">
                    Оплатить {paymentData.amount} MDL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // Главный рендер
  if (currentPage === "transfer") return renderTransferPage();
  if (currentPage === "payment") return renderPaymentPage();

  // Главная страница (сокращённая версия — ключевые блоки сохранены)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">OPLATA.MD</h1>
                <p className="text-xs text-slate-500">Plătește serviciile online</p>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Căutare rapidă a serviciilor..."
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                />
              </div>
              <button className="ml-3 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl">OK</button>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">0</span>
              </button>
              <button className="p-2 text-slate-600 hover:text-blue-600 transition-colors">
                <User className="w-6 h-6" />
              </button>
              <button onClick={() => setIsLoginModalOpen(true)} className="hidden md:block px-4 py-2 text-slate-600 hover:text-blue-600 transition-colors font-medium">
                LOGIN
              </button>
              <button className="hidden md:block px-4 py-2 text-slate-600 hover:text-blue-600 transition-colors font-medium">Ieșire</button>
              <button className="px-4 py-2 text-slate-600 hover:text-blue-600 transition-colors font-medium">Ro</button>
              <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Căutare servicii..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:flex lg:gap-8">
          {/* Популярные сервисы */}
          <div className="flex-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Plăți frecvente</h2>
                <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium">Adaugă serviciul tău</button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {popularServices.map((service, index) => (
                  <div
                    key={index}
                    onClick={() => handleServiceClick(service.id)}
                    className="group bg-white/60 hover:bg-white border border-white/40 rounded-xl p-4 transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer backdrop-blur-sm aspect-square"
                  >
                    <div className="bg-white border border-gray-200 rounded-xl p-4 w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-sm">
                      <img
                        src={service.id === "loteria" ? "/LOTERIAlogo.png" : `https://via.placeholder.com/48x48/f3f4f6/6b7280?text=${service.name.charAt(0)}`}
                        alt={service.name}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Перевод карточка */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div
                onClick={handleCardTransfer}
                className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Transfer de la card la card</h3>
                  <CreditCard className="w-8 h-8" />
                </div>
                <button className="bg-white/20 hover:bg-white/30 px-4 py-2.5 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20">
                  Transfer acum
                </button>
              </div>

              <div className="bg-gradient-to-br from-teal-500 via-teal-600 to-blue-400 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Solicită Credit</h3>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">💰</div>
                </div>
                <p className="text-white/90 text-sm mb-4">Obține creditul de care ai nevoie rapid și simplu</p>
                <button className="bg-white/20 hover:bg-white/30 px-4 py-2.5 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20">
                  Aplică acum
                </button>
              </div>
            </div>

            {/* Категории */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Categorii</h2>

              <div className="space-y-6">
                {Array.from({ length: totalRows }, (_, rowIndex) => (
                  <div key={rowIndex}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {getCategoriesForRow(rowIndex).map((category, index) => (
                        <div
                          key={index}
                          onClick={() => handleCategoryClick(category.id)}
                          className="group bg-white/80 hover:bg-white border border-slate-200/60 hover:border-blue-300/60 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer backdrop-blur-sm aspect-square w-[90%] mx-auto p-2"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                          <div className="relative">
                            <div className={`w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 shadow-md`}>
                              <category.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                              <div className="flex flex-col items-center justify-center h-full">{category.name}</div>
                            </h3>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-500">{category.count} servicii</span>
                              {category.services ? (
                                expandedCategory === category.id ? (
                                  <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-all duration-200" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-all duration-200" />
                                )
                              ) : (
                                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {categories.map((category) =>
                      shouldShowServicesAfterRow(rowIndex, category.id) && category.services ? (
                        <div
                          key={category.id}
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            expandedCategory === category.id ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="bg-gradient-to-br from-slate-100/80 via-blue-50/60 to-cyan-50/80 backdrop-blur-sm rounded-xl shadow-md border border-slate-200/50 p-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                              {category.services.map((service, serviceIndex) => (
                                <div
                                  key={serviceIndex}
                                  onClick={() => handleServiceClick(service.id, service.name, service.logo, service.color)}
                                  className="group bg-white/80 hover:bg-white border border-slate-200/60 hover:border-blue-300/60 rounded-lg p-3 transition-all duration-200 hover:shadow-md cursor-pointer backdrop-blur-sm"
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 ${service.color} rounded-lg flex items-center justify-center text-white text-lg shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                                      {service.logo}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{service.name}</h4>
                                      <p className="text-xs text-slate-500 mt-1">{service.description}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модал логина */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
            <button onClick={() => setIsLoginModalOpen(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Bun venit pe OPLATA.MD</h2>
              <p className="text-slate-600">Introdu adresa ta de e-mail pentru a te autentifica sau a te înregistra:</p>
            </div>

          <div className="space-y-4">
  <div className="relative">
    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Adresa de e-mail"
      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
    />
  </div>

  <div className="flex items-start space-x-3">
    <input
      type="checkbox"
      checked={agreeToTerms}
      onChange={(e) => setAgreeToTerms(e.target.checked)}
      className="mt-1"
    />
    <label className="text-sm text-slate-600">
      Sunt de acord cu termenii și condițiile
    </label>
  </div>
</div>


              <div className="flex space-x-3 pt-4">
                <button onClick={() => setIsLoginModalOpen(false)} className="flex-1 py-3 px-4 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50">
                  Înapoi
                </button>
                <button disabled={!email || !agreeToTerms} className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300">
                  Continuă cu e-mailul
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────────
// Корневой роутер приложения
// ───────────────────────────────────────────────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeApp />} />
        <Route path="/account/*" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
