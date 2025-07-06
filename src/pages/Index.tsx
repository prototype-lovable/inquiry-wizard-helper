
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, MessageSquare, Clock, Shield } from "lucide-react";
import CompanySearch from "@/components/CompanySearch";
import InquiryFlow from "@/components/InquiryFlow";

const Index = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'home' | 'company' | 'inquiry'>('home');

  const handleGetStarted = () => {
    setCurrentStep('company');
  };

  const handleCompanySelect = (company: string) => {
    setSelectedCompany(company);
    setCurrentStep('inquiry');
  };

  const handleBackToHome = () => {
    setCurrentStep('home');
    setSelectedCompany(null);
  };

  if (currentStep === 'company') {
    return <CompanySearch onCompanySelect={handleCompanySelect} onBack={handleBackToHome} />;
  }

  if (currentStep === 'inquiry' && selectedCompany) {
    return <InquiryFlow company={selectedCompany} onBack={() => setCurrentStep('company')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">통합문의</h1>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              베타 서비스
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            모든 기업 문의를
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> 한 곳</span>에서
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            복잡한 고객센터 찾기는 그만! AI가 도와주는 스마트한 문의 시스템으로<br />
            삼성, 네이버, 쿠팡 등 모든 기업에 쉽고 빠르게 문의하세요.
          </p>
          <Button 
            onClick={handleGetStarted}
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            지금 시작하기
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-sm">
            <CardHeader className="text-center pb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">AI 자동 완성</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                키워드만 입력하면 정중하고 자연스러운 문의 문구를 AI가 완성해드려요
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-sm">
            <CardHeader className="text-center pb-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">통합 플랫폼</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                여러 기업의 고객센터를 하나의 인터페이스에서 관리하고 문의할 수 있어요
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-sm">
            <CardHeader className="text-center pb-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">시간 절약</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                복잡한 고객센터 찾기와 양식 작성 시간을 90% 단축할 수 있어요
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-sm">
            <CardHeader className="text-center pb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">안전한 처리</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                모든 문의는 보안이 검증된 채널을 통해 안전하게 전송됩니다
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white/50 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            이렇게 쉽게 문의하세요
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h4 className="text-xl font-semibold mb-2">기업 선택</h4>
              <p className="text-gray-600">문의할 기업을 검색하고 선택하세요</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h4 className="text-xl font-semibold mb-2">AI 작성</h4>
              <p className="text-gray-600">키워드만 입력하면 AI가 완벽한 문의문을 작성</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h4 className="text-xl font-semibold mb-2">자동 전송</h4>
              <p className="text-gray-600">문의가 자동으로 전송되고 답변을 알림으로 받아보세요</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">지금 바로 시작해보세요</h3>
          <p className="text-xl opacity-90 mb-8">복잡한 문의 과정을 간단하게 만들어드립니다</p>
          <Button 
            onClick={handleGetStarted}
            size="lg" 
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3 text-lg font-semibold"
          >
            무료로 시작하기
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
