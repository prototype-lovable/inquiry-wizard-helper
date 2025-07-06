
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, MessageSquare, Clock, Shield, Phone, MessageCircle, Play, HelpCircle } from "lucide-react";
import CompanySearch from "@/components/CompanySearch";
import InquiryFlow from "@/components/InquiryFlow";
import AccessibilityGuide from "@/components/AccessibilityGuide";

const Index = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'home' | 'company' | 'inquiry' | 'guide'>('home');
  const [skipCompanySelection, setSkipCompanySelection] = useState(false);

  const handleGetStarted = () => {
    setCurrentStep('company');
  };

  const handleDirectInquiry = () => {
    setSkipCompanySelection(true);
    setCurrentStep('inquiry');
  };

  const handleCompanySelect = (company: string) => {
    setSelectedCompany(company);
    setSkipCompanySelection(false);
    setCurrentStep('inquiry');
  };

  const handleSkipCompanySelection = () => {
    setSkipCompanySelection(true);
    setSelectedCompany(null);
    setCurrentStep('inquiry');
  };

  const handleBackToHome = () => {
    setCurrentStep('home');
    setSelectedCompany(null);
    setSkipCompanySelection(false);
  };

  const handleShowGuide = () => {
    setCurrentStep('guide');
  };

  if (currentStep === 'guide') {
    return <AccessibilityGuide onBack={handleBackToHome} />;
  }

  if (currentStep === 'company') {
    return (
      <CompanySearch 
        onCompanySelect={handleCompanySelect} 
        onBack={handleBackToHome}
        onSkipCompanySelection={handleSkipCompanySelection}
      />
    );
  }

  if (currentStep === 'inquiry') {
    return (
      <InquiryFlow 
        company={selectedCompany || ''} 
        onBack={() => setCurrentStep('company')}
        skipCompanySelection={skipCompanySelection}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">통합문의</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-base px-3 py-1">
                베타 서비스
              </Badge>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleShowGuide}
                className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 text-base px-4 py-2"
              >
                <HelpCircle className="w-5 h-5 mr-2" />
                사용 가이드
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            모든 기업 문의를
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> 한 곳</span>에서
          </h2>
          <p className="text-2xl text-gray-600 mb-12 leading-relaxed">
            복잡한 고객센터 찾기는 그만! AI가 도와주는 스마트한 문의 시스템으로<br />
            삼성, 네이버, 쿠팡 등 모든 기업에 쉽고 빠르게 문의하세요.
          </p>
          
          {/* 중장년층을 위한 큰 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-6 text-2xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              지금 시작하기
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
            
            <Button 
              onClick={handleDirectInquiry}
              variant="outline"
              size="lg" 
              className="border-3 border-blue-300 text-blue-700 hover:bg-blue-50 px-12 py-6 text-2xl font-semibold rounded-2xl"
            >
              바로 문의 작성하기
            </Button>
          </div>
          
          {/* 대체 연락 수단 - 중장년층을 위한 중요한 기능 */}
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              💬 인터넷이 어려우시다면 전화나 문자로도 도와드려요!
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <div className="flex items-center space-x-3">
                <Phone className="w-8 h-8 text-green-600" />
                <div className="text-left">
                  <p className="text-xl font-semibold text-green-800">전화 상담</p>
                  <p className="text-2xl font-bold text-green-900">1588-1234</p>
                  <p className="text-green-700">평일 9시~18시</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-8 h-8 text-green-600" />
                <div className="text-left">
                  <p className="text-xl font-semibold text-green-800">문자 접수</p>
                  <p className="text-2xl font-bold text-green-900">010-1234-5678</p>
                  <p className="text-green-700">24시간 접수 가능</p>
                </div>
              </div>
            </div>
          </div>

          {/* 온보딩 가이드 영상 */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-purple-800 mb-6">
              📺 3분만에 배우는 사용법
            </h3>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
                <Button 
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-xl rounded-full"
                  onClick={handleShowGuide}
                >
                  <Play className="w-6 h-6 mr-2" />
                  가이드 보기
                </Button>
              </div>
              <p className="text-lg text-gray-700">
                처음 사용하시는 분들을 위한 친절한 설명 가이드입니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-4xl font-bold text-center text-gray-900 mb-12">
          왜 통합문의를 사용해야 할까요?
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">AI 자동 완성</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-lg leading-relaxed">
                키워드만 입력하면 정중하고 자연스러운 문의 문구를 AI가 완성해드려요
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">통합 플랫폼</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-lg leading-relaxed">
                여러 기업의 고객센터를 하나의 인터페이스에서 관리하고 문의할 수 있어요
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl">시간 절약</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-lg leading-relaxed">
                복잡한 고객센터 찾기와 양식 작성 시간을 90% 단축할 수 있어요
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">안전한 처리</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-lg leading-relaxed">
                모든 문의는 보안이 검증된 채널을 통해 안전하게 전송됩니다
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white/60 py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-16">
            이렇게 쉽게 문의하세요
          </h3>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                1
              </div>
              <h4 className="text-2xl font-semibold mb-4">기업 선택 (선택사항)</h4>
              <p className="text-gray-600 text-lg leading-relaxed">문의할 기업을 검색하고 선택하세요.<br/>모르셔도 괜찮아요!</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                2
              </div>
              <h4 className="text-2xl font-semibold mb-4">AI 작성</h4>
              <p className="text-gray-600 text-lg leading-relaxed">키워드만 입력하면 AI가 완벽한 문의문을 작성해드려요</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                3
              </div>
              <h4 className="text-2xl font-semibold mb-4">자동 전송</h4>
              <p className="text-gray-600 text-lg leading-relaxed">저희가 대신 기업을 찾아 문의를 전송하고 답변을 알려드려요</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-16 text-white">
          <h3 className="text-4xl font-bold mb-6">지금 바로 시작해보세요</h3>
          <p className="text-2xl opacity-90 mb-10">복잡한 문의 과정을 간단하게 만들어드립니다</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-50 px-12 py-6 text-2xl font-semibold rounded-2xl"
            >
              무료로 시작하기
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
            <Button 
              onClick={handleDirectInquiry}
              size="lg" 
              variant="outline"
              className="border-3 border-white text-white hover:bg-white hover:text-blue-600 px-12 py-6 text-2xl font-semibold rounded-2xl"
            >
              바로 문의하기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
