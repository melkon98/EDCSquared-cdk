export enum UnAuthRoutes {
  Redirect = '/redirect',
  HomePageLogin = '/homePageLogin',
  Preview = '/preview/:url',
  Login = '/login',
  SignUp = '/signup',
  SubLogin = '/login/:id',
  ForgotPass = '/forgot-password',
  AdminLogin = '/adminLogin',

  PrivacyPolicy = '/privacyPolicy',
  TermsAndConditions = '/termsAndConditions',
}

export enum AuthRoutes {
  Redirect = '/redirect',
  BrandBrief = '/brandActivation',
  Brands = '/brands',
  Logout = '/logout',
  Tiktok = '/linkTikTok/:id',
  Redirector = '/redirecting/:id?',
  MobileNumberVerify = '/mobile-number-verification',
  Dashboard = '/dashboard',
  CampaignBrief = '/campaignBriefs',
  ChangePass = '/change-password',
  ContentForGood = '/content-for-good',
  ChangeEmail = '/change-email',
  EditProfile = '/account',
  BestPractices = '/bestPractices',
  Preview = '/preview/:url',
  Exit = 'exit',
  Messages = '/messages'
}

export enum AdminRoutes {
  Brands = '/brands',
  Creators = '/creators',
  CreatePractice = '/createPractice',
  EditPractice = '/editPractice',
  AccountCreator = '/user-management',
  CreativeRequests = '/creative-linking',
  CreativeApproval = '/creative-submissions',
  PaymentWindow = '/payment-window/:date',
  BrandBriefs = '/brand-activation',
  CreatorsPayouts = '/payouts'
}

export enum CreatorRoutes {
  Wallet = '/wallet',
  EditCreatorProfile = '/creator-profile',
  Creatives = '/creatives',
}

export enum BrandRoutes {
  Creatives = '/creatives',
  CreateBrief = '/createBrief',
  EditBrief = '/editBrief',
  BriefFormStep2 = '/editBrief/step2',
  Brand = '/brand-identity',
  EditBrand = '/brandEdit',
  EditBrandProfile = '/brand-profile',
  LinkTiktokAccount = '/branddashboard',
  LinkFacebookAccount = '/brandFacebookAccount',
  linkYoutubeAccount = '/brandYoutubeAccount'
}