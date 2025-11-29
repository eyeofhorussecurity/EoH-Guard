const languages = {
  en: {
    // Home tab
    siteDetails: "Site Details",
    url: "URL",
    certificate: "Certificate",
    region: "Region",
    phishingScore: "Phishing Score",
    score: "Score",
    warning: "Warning: This site might be phishing!",
    reporter: "Reporter",
    describeIssue: "Describe the issue...",
    sendReport: "Send Report",
    reportSent: "Report sent! Thank you.",
    enterReport: "Please enter report details.",
    checkEmail: "Check Email for Phishing",
    uploadEmail: "Upload Email File",
    checkPhishing: "Check Phishing Status",
    checking: "Checking email...",
    phishingResult: "Phishing Check Result",
    emailPhishingScore: "Email Phishing Score",

    // VPN tab
    vpn: "VPN",
    status: "Status",
    connected: "Connected",
    disconnected: "Disconnected",
    connect: "Connect",
    disconnect: "Disconnect",
    server: "Server",
    ping: "Ping",
    speed: "Speed",

    // Protection tab
    protection: "Your Protection Overview",
    sitesBlockedSession: "Sites Blocked (this session)",
    sitesBlockedTotal: "Sites Blocked (total)",
    phishingAdsBlocked: "Phishing Ads Blocked",
    recentPhishingAds: "Recent Phishing Ads Blocked",
    trackersBlocked: "Trackers Blocked",
    fingerprintProtection: "Fingerprint Protection",
    blockedCanvasFingerprint: "Blocked canvas fingerprinting",
    blockedWebGLFingerprint: "Blocked WebGL fingerprinting",
    blockedFontEnumeration: "Blocked font enumeration",
    blockedDeviceInfo: "Blocked device info leaks",
    blockAds: "Block Ads",
    blockTrackers: "Block Trackers",
    blockPopups: "Block Pop-ups",
    resetStats: "Reset Statistics",
    statsReset: "Statistics reset successfully!",

    // Tips tab
    tips: "Phishing Protection Tips",
    checkDomain: "Check the domain carefully",
    lookForHTTPS: "Look for HTTPS and valid certificate",
    bewareUrgent: "Beware of urgent messages",
    dontClick: "Do not click suspicious links",
    reportSuspicious: "Report suspicious sites",
    checkSpelling: "Check for spelling mistakes and poor grammar",
    cautionPersonalInfo: "Be cautious of requests for personal info",
    watchPopups: "Watch for popups and excessive ads",
    checkSender: "Check sender email addresses",
    neverDownload: "Never download attachments from unknown sources",
    ifInDoubt: "If in doubt, search for the site or contact support directly",
    useMultiFactor: "Use multi-factor authentication for extra security",
    keepUpdated: "Keep your browser and extension updated",
    checkMismatched: "Check for mismatched URLs in emails and messages",
    dealTooGood: "If a deal looks too good to be true, it probably is",
    phishingExamples: "Phishing Examples",
    alwaysDoubleCheck: "Always double-check before entering any sensitive information!",

    // Settings tab
    settings: "Settings",
    language: "Language",
    connectVPNAuto: "Connect VPN automatically",
    blockAdsSettings: "Block ads",
    showPhishingAlerts: "Show phishing alerts",
    fingerprintProtectionSettings: "Fingerprint protection",
    about: "About",
    aboutText: "EoH Guard - Protecting you online.",
    termsPrivacy: "Terms & Privacy",
    termsOfService: "Terms of service",
    privacyPolicy: "Privacy Policy",
    loading: "Loading...",
    checking: "Checking...",
    detecting: "Detecting...",
  },
  ar: {
    // Home tab
    siteDetails: "تفاصيل الموقع",
    url: "الرابط",
    certificate: "الشهادة",
    region: "المنطقة",
    phishingScore: "درجة التصيد",
    score: "الدرجة",
    warning: "تحذير: قد يكون هذا الموقع احتيالياً!",
    reporter: "المراسل",
    describeIssue: "صف المشكلة...",
    sendReport: "إرسال التقرير",
    reportSent: "تم إرسال التقرير! شكراً.",
    enterReport: "يرجى إدخال تفاصيل التقرير.",
    checkEmail: "فحص البريد الإلكتروني للتصيد",
    uploadEmail: "تحميل ملف البريد الإلكتروني",
    checkPhishing: "فحص حالة التصيد",
    checking: "جارٍ الفحص...",
    phishingResult: "نتيجة فحص التصيد",
    emailPhishingScore: "درجة تصيد البريد الإلكتروني",

    // VPN tab
    vpn: "شبكة VPN",
    status: "الحالة",
    connected: "متصل",
    disconnected: "غير متصل",
    connect: "الاتصال",
    disconnect: "قطع الاتصال",
    server: "الخادم",
    ping: "Ping",
    speed: "السرعة",

    // Protection tab
    protection: "نظرة عامة على حمايتك",
    sitesBlockedSession: "المواقع المحظورة (في هذه الجلسة)",
    sitesBlockedTotal: "المواقع المحظورة (الإجمالي)",
    phishingAdsBlocked: "إعلانات التصيد المحظورة",
    recentPhishingAds: "إعلانات التصيد المحظورة مؤخراً",
    trackersBlocked: "المتتبعات المحظورة",
    fingerprintProtection: "حماية بصمة الإصبع",
    blockedCanvasFingerprint: "محظور بصمة القماش",
    blockedWebGLFingerprint: "محظور بصمة WebGL",
    blockedFontEnumeration: "محظور تعداد الخط",
    blockedDeviceInfo: "محظور تسرب معلومات الجهاز",
    blockAds: "حظر الإعلانات",
    blockTrackers: "حظر المتتبعات",
    blockPopups: "حظر النوافذ المنبثقة",
    resetStats: "إعادة تعيين الإحصائيات",
    statsReset: "تم إعادة تعيين الإحصائيات بنجاح!",

    // Tips tab
    tips: "نصائح حماية من التصيد",
    checkDomain: "تحقق من المجال بعناية",
    lookForHTTPS: "ابحث عن HTTPS والشهادة الصحيحة",
    bewareUrgent: "احذر من الرسائل العاجلة",
    dontClick: "لا تنقر على الروابط المريبة",
    reportSuspicious: "أبلغ عن المواقع المريبة",
    checkSpelling: "تحقق من الأخطاء الإملائية والنحوية",
    cautionPersonalInfo: "احذر من طلبات المعلومات الشخصية",
    watchPopups: "راقب النوافذ المنبثقة والإعلانات المفرطة",
    checkSender: "تحقق من عناوين البريد الإلكتروني للمرسل",
    neverDownload: "لا تحمل المرفقات من مصادر غير معروفة",
    ifInDoubt: "إذا كنت في شك، ابحث عن الموقع أو اتصل بدعم العملاء مباشرة",
    useMultiFactor: "استخدم المصادقة متعددة العوامل لأمان إضافي",
    keepUpdated: "حافظ على تحديث متصفحك والإضافة",
    checkMismatched: "تحقق من عدم تطابق عناوين URL في الرسائل الإلكترونية والرسائل",
    dealTooGood: "إذا بدت الصفقة جيدة جداً بحيث تكون حقيقية، فهي على الأرجح كذلك",
    phishingExamples: "أمثلة على التصيد",
    alwaysDoubleCheck: "تحقق دائماً قبل إدخال أي معلومات حساسة!",

    // Settings tab
    settings: "الإعدادات",
    language: "اللغة",
    connectVPNAuto: "الاتصال بـ VPN تلقائياً",
    blockAdsSettings: "حظر الإعلانات",
    showPhishingAlerts: "إظهار تنبيهات التصيد",
    fingerprintProtectionSettings: "حماية بصمة الإصبع",
    about: "حول",
    aboutText: "EoH Guard - حمايتك على الإنترنت.",
    termsPrivacy: "الشروط والخصوصية",
    termsOfService: "شروط الخدمة",
    privacyPolicy: "سياسة الخصوصية",
    loading: "جارٍ التحميل...",
    checking: "جارٍ الفحص...",
    detecting: "جارٍ الكشف...",
  },
  fr: {
    // Home tab
    siteDetails: "Détails du site",
    url: "URL",
    certificate: "Certificat",
    region: "Région",
    phishingScore: "Score de phishing",
    score: "Score",
    warning: "Avertissement: Ce site pourrait être du phishing!",
    reporter: "Signalement",
    describeIssue: "Décrivez le problème...",
    sendReport: "Envoyer le signalement",
    reportSent: "Signalement envoyé! Merci.",
    enterReport: "Veuillez entrer les détails du problème.",
    checkEmail: "Vérifier l'email pour le phishing",
    uploadEmail: "Télécharger le fichier email",
    checkPhishing: "Vérifier l'état du phishing",
    checking: "Vérification en cours...",
    phishingResult: "Résultat de la vérification du phishing",
    emailPhishingScore: "Score de phishing de l'email",

    // VPN tab
    vpn: "VPN",
    status: "Statut",
    connected: "Connecté",
    disconnected: "Déconnecté",
    connect: "Connecter",
    disconnect: "Déconnecter",
    server: "Serveur",
    ping: "Ping",
    speed: "Vitesse",

    // Protection tab
    protection: "Vue d'ensemble de votre protection",
    sitesBlockedSession: "Sites bloqués (cette session)",
    sitesBlockedTotal: "Sites bloqués (total)",
    phishingAdsBlocked: "Annonces de phishing bloquées",
    recentPhishingAds: "Annonces de phishing bloquées récemment",
    trackersBlocked: "Suivi bloqués",
    fingerprintProtection: "Protection des empreintes digitales",
    blockedCanvasFingerprint: "Empreinte digitale du canevas bloquée",
    blockedWebGLFingerprint: "Empreinte digitale WebGL bloquée",
    blockedFontEnumeration: "Énumération des polices bloquée",
    blockedDeviceInfo: "Fuites d'informations sur l'appareil bloquées",
    blockAds: "Bloquer les annonces",
    blockTrackers: "Bloquer les suivi",
    blockPopups: "Bloquer les fenêtres contextuelles",
    resetStats: "Réinitialiser les statistiques",
    statsReset: "Statistiques réinitialisées avec succès!",

    // Tips tab
    tips: "Conseils de protection contre le phishing",
    checkDomain: "Vérifiez attentivement le domaine",
    lookForHTTPS: "Recherchez HTTPS et un certificat valide",
    bewareUrgent: "Méfiez-vous des messages urgents",
    dontClick: "Ne cliquez pas sur les liens suspects",
    reportSuspicious: "Signaler les sites suspects",
    checkSpelling: "Recherchez les erreurs d'orthographe et de grammaire",
    cautionPersonalInfo: "Soyez prudent avec les demandes d'informations personnelles",
    watchPopups: "Surveillez les fenêtres contextuelles et les annonces excessives",
    checkSender: "Vérifiez les adresses e-mail de l'expéditeur",
    neverDownload: "Ne téléchargez jamais les pièces jointes de sources inconnues",
    ifInDoubt: "En cas de doute, recherchez le site ou contactez directement le support",
    useMultiFactor: "Utilisez l'authentification multifacteur pour une sécurité accrue",
    keepUpdated: "Maintenez votre navigateur et l'extension à jour",
    checkMismatched: "Vérifiez les URL mal appariées dans les e-mails et les messages",
    dealTooGood: "Si une offre semble trop belle pour être vraie, c'est probablement le cas",
    phishingExamples: "Exemples de phishing",
    alwaysDoubleCheck: "Vérifiez toujours avant d'entrer des informations sensibles!",

    // Settings tab
    settings: "Paramètres",
    language: "Langue",
    connectVPNAuto: "Connecter VPN automatiquement",
    blockAdsSettings: "Bloquer les annonces",
    showPhishingAlerts: "Afficher les alertes de phishing",
    fingerprintProtectionSettings: "Protection des empreintes digitales",
    about: "À propos",
    aboutText: "EoH Guard - Vous protéger en ligne.",
    termsPrivacy: "Conditions et confidentialité",
    termsOfService: "Conditions de service",
    privacyPolicy: "Politique de confidentialité",
    loading: "Chargement...",
    checking: "Vérification en cours...",
    detecting: "Détection...",
  },
}

// Function to get current language
function getCurrentLanguage() {
  return localStorage.getItem("eohLanguage") || "en"
}

// Function to translate text
function t(key) {
  const lang = getCurrentLanguage()
  return languages[lang]?.[key] || languages.en[key] || key
}

// Function to set language
function setLanguage(lang) {
  if (languages[lang]) {
    localStorage.setItem("eohLanguage", lang)
    updateAllText()
  }
}

// Update all text on page
function updateAllText() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n")
    el.textContent = t(key)
  })
}

window.t = t
window.setLanguage = setLanguage
window.getCurrentLanguage = getCurrentLanguage
window.updateAllText = updateAllText

// Additional updates can be added here if needed
