
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, MessageSquare, Clock, Shield, Phone, MessageCircle, HelpCircle, Building2 } from "lucide-react";
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

  const popularCompanies = [
    "삼성전자", "네이버", "쿠팡", "카카오", "현대자동차", "LG전자"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-black">대신문의</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-gray-100 text-black text-lg px-4 py-2 font-medium">
                베타 서비스
              </Badge>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleShowGuide}
                className="border-2 border-gray-300 text-black hover:bg-gray-50 text-lg px-6 py-3"
              >
                <HelpCircle className="w-6 h-6 mr-2" />
                사용 가이드
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-8 leading-tight">
            복잡한 고객센터 찾기,
            <br />
            <span className="text-[#00BB66]">대신 해드려요</span>
          </h2>
          <p className="text-2xl text-gray-600 mb-12 leading-relaxed">
            어떤 기업에 문의할지 모르셔도 괜찮아요.<br />
            저희가 대신 찾아서 문의를 전달해드립니다.
          </p>
          
          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              className="bg-[#00BB66] hover:bg-[#009955] text-white px-12 py-6 text-2xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              기업 찾아서 문의하기
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
            
            <Button 
              onClick={handleDirectInquiry}
              variant="outline"
              size="lg" 
              className="border-3 border-black text-black hover:bg-gray-50 px-12 py-6 text-2xl font-semibold rounded-2xl"
            >
              바로 문의 작성하기
            </Button>
          </div>
          
          {/* Contact Methods */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-black mb-6">
              💬 인터넷이 어려우시다면 전화나 문자로도 도와드려요
            </h3>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <div className="flex items-center space-x-4">
                <Phone className="w-10 h-10 text-[#00BB66]" />
                <div className="text-left">
                  <p className="text-xl font-semibold text-black">전화 상담</p>
                  <p className="text-3xl font-bold text-black">1588-1234</p>
                  <p className="text-gray-600 text-lg">평일 9시~18시</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MessageCircle className="w-10 h-10 text-[#00BB66]" />
                <div className="text-left">
                  <p className="text-xl font-semibold text-black">문자 접수</p>
                  <p className="text-3xl font-bold text-black">010-1234-5678</p>
                  <p className="text-gray-600 text-lg">24시간 접수 가능</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Companies Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-black mb-12">
          자주 찾는 기업
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {popularCompanies.map((company) => (
            <Card 
              key={company}
              className="border-2 border-gray-200 hover:border-[#00BB66] transition-all duration-300 cursor-pointer bg-white hover:shadow-lg"
              onClick={() => handleCompanySelect(company)}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-gray-600" />
                </div>
                <h4 className="font-bold text-lg text-black mb-2">{company}</h4>
                <Button size="sm" variant="ghost" className="text-[#00BB66] hover:bg-gray-50 text-base">
                  문의하기 →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-black mb-16">
            왜 대신문의를 사용해야 할까요?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-[#00BB66] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-black">AI 자동 완성</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-lg leading-relaxed text-gray-600">
                  키워드만 입력하면 정중하고 자연스러운 문의 문구를 AI가 완성해드려요
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-[#00BB66] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-black">통합 플랫폼</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-lg leading-relaxed text-gray-600">
                  여러 기업의 고객센터를 하나의 인터페이스에서 관리하고 문의할 수 있어요
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-[#00BB66] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-black">시간 절약</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-lg leading-relaxed text-gray-600">
                  복잡한 고객센터 찾기와 양식 작성 시간을 90% 단축할 수 있어요
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-[#00BB66] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-black">안전한 처리</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-lg leading-relaxed text-gray-600">
                  모든 문의는 보안이 검증된 채널을 통해 안전하게 전송됩니다
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-black mb-16">
            이렇게 쉽게 문의하세요
          </h3>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-24 h-24 bg-[#00BB66] rounded-full flex items-center justify-center mx-auto mb-8 text-white font-bold text-3xl">
                1
              </div>
              <h4 className="text-2xl font-semibold mb-6 text-black">기업 선택 (선택사항)</h4>
              <p className="text-gray-600 text-lg leading-relaxed">문의할 기업을 검색하고 선택하세요.<br/>모르셔도 괜찮아요!</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-[#00BB66] rounded-full flex items-center justify-center mx-auto mb-8 text-white font-bold text-3xl">
                2
              </div>
              <h4 className="text-2xl font-semibold mb-6 text-black">AI 작성</h4>
              <p className="text-gray-600 text-lg leading-relaxed">키워드만 입력하면 AI가 완벽한 문의문을 작성해드려요</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-[#00BB66] rounded-full flex items-center justify-center mx-auto mb-8 text-white font-bold text-3xl">
                3
              </div>
              <h4 className="text-2xl font-semibold mb-6 text-black">자동 전송</h4>
              <p className="text-gray-600 text-lg leading-relaxed">저희가 대신 기업을 찾아 문의를 전송하고 답변을 알려드려요</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
