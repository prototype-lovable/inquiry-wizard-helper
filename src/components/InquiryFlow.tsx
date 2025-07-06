
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Sparkles, Send, FileText, CreditCard, User, AlertCircle, Building2, Phone, MessageCircle } from "lucide-react";

interface InquiryFlowProps {
  company: string;
  onBack: () => void;
  skipCompanySelection?: boolean;
}

const InquiryFlow = ({ company, onBack, skipCompanySelection = false }: InquiryFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string>("");
  const [inquiryText, setInquiryText] = useState("");
  const [keywords, setKeywords] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    orderNumber: "",
    companyGuess: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const inquiryTypes = [
    { id: "refund", label: "환불/교환", icon: CreditCard, description: "제품 환불이나 교환을 요청하고 싶어요" },
    { id: "account", label: "계정 문제", icon: User, description: "로그인이나 계정 관련 문제가 있어요" },
    { id: "complaint", label: "불만/클레임", icon: AlertCircle, description: "서비스나 제품에 문제가 있어요" },
    { id: "general", label: "일반 문의", icon: FileText, description: "기타 궁금한 점이 있어요" }
  ];

  const generateAIInquiry = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const templates = {
        refund: `안녕하세요, ${company || userInfo.companyGuess || '[기업명]'} 고객센터입니다.

주문번호 ${userInfo.orderNumber || 'XXX-XXX-XXX'} 관련하여 ${keywords || '제품'}에 대한 환불을 요청드리고자 연락드립니다.

${keywords ? `구체적인 사유: ${keywords}` : '구체적인 사유를 말씀해주시면 빠른 처리가 가능합니다.'}

빠른 처리 부탁드리며, 추가 서류가 필요하시면 언제든 말씀해주세요.

감사합니다.`,
        
        account: `안녕하세요, ${company || userInfo.companyGuess || '[기업명]'} 고객센터입니다.

계정 관련 문제로 연락드립니다.
${keywords ? `문제 상황: ${keywords}` : '로그인 또는 계정 접근에 어려움이 있습니다.'}

등록된 이메일: ${userInfo.email || '이메일 주소'}
연락처: ${userInfo.phone || '연락처'}

빠른 해결 방안을 안내해주시면 감사하겠습니다.

감사합니다.`,
        
        complaint: `안녕하세요, ${company || userInfo.companyGuess || '[기업명]'} 고객센터입니다.

서비스 이용 중 불편한 점이 있어 연락드립니다.
${keywords ? `불편사항: ${keywords}` : '구체적인 불편사항을 설명드리겠습니다.'}

${userInfo.orderNumber ? `관련 주문번호: ${userInfo.orderNumber}` : ''}

개선 방안과 해결책을 제시해주시면 감사하겠습니다.

감사합니다.`,
        
        general: `안녕하세요, ${company || userInfo.companyGuess || '[기업명]'} 고객센터입니다.

${keywords || '서비스'}에 대해 문의드리고자 합니다.

${keywords ? `문의 내용: ${keywords}` : '자세한 내용은 다음과 같습니다.'}

빠른 답변 부탁드립니다.

감사합니다.`
      };

      setInquiryText(templates[selectedType as keyof typeof templates] || templates.general);
      setIsGenerating(false);
      
      toast({
        title: "AI 문구 생성 완료",
        description: "문의 내용이 자동으로 작성되었습니다. 수정하여 사용하세요.",
      });
    }, 2000);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (skipCompanySelection) {
        toast({
          title: "문의 접수 완료",
          description: "저희가 적절한 기업을 찾아 문의를 전달하고 답변을 안내해드리겠습니다.",
        });
      } else {
        toast({
          title: "문의 전송 완료",
          description: `${company}에 문의가 성공적으로 전송되었습니다. 답변은 이메일로 받아보실 수 있습니다.`,
        });
      }
      
      onBack();
    }, 1500);
  };

  const progress = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="lg" 
                onClick={onBack}
                className="hover:bg-blue-50 text-lg px-6 py-3"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                돌아가기
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">문의 작성</h1>
                {skipCompanySelection ? (
                  <p className="text-base text-blue-600 font-medium">저희가 적절한 기업을 찾아드려요</p>
                ) : (
                  <p className="text-base text-gray-600">{company}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-base px-3 py-1">
                단계 {currentStep}/3
              </Badge>
              
              {/* 도움 요청 버튼 */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
                  <Phone className="w-4 h-4 mr-1" />
                  전화: 1588-1234
                </Button>
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  문자: 010-1234-5678
                </Button>
              </div>
            </div>
          </div>
          <Progress value={progress} className="mt-4 h-3" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Step 1: 문의 유형 선택 */}
        {currentStep === 1 && (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-4">문의 유형을 선택해주세요</CardTitle>
              <p className="text-center text-lg text-gray-600">
                가장 비슷한 유형을 선택하시면 더 정확한 답변을 받을 수 있어요
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {inquiryTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedType === type.id
                      ? "border-2 border-blue-500 bg-blue-50 shadow-lg scale-105"
                      : "border-2 border-gray-200 hover:border-blue-300 hover:shadow-md"
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                        selectedType === type.id ? "bg-blue-500" : "bg-gray-100"
                      }`}>
                        <type.icon className={`w-8 h-8 ${
                          selectedType === type.id ? "text-white" : "text-gray-600"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl">{type.label}</h3>
                        <p className="text-gray-600 text-base mt-1">{type.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button 
                className="w-full mt-8 py-6 text-xl" 
                onClick={() => setCurrentStep(2)}
                disabled={!selectedType}
                size="lg"
              >
                다음 단계
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: 기본 정보 입력 */}
        {currentStep === 2 && (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-4">기본 정보를 입력해주세요</CardTitle>
              <p className="text-center text-lg text-gray-600">
                답변을 받기 위해 필요한 정보입니다
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-lg font-medium">이름 *</Label>
                <Input
                  id="name"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                  placeholder="홍길동"
                  className="border-2 border-blue-100 focus:border-blue-300 py-4 text-lg"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="email" className="text-lg font-medium">이메일 *</Label>
                <Input
                  id="email"
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                  placeholder="example@email.com"
                  className="border-2 border-blue-100 focus:border-blue-300 py-4 text-lg"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-lg font-medium">연락처 (선택사항)</Label>
                <Input
                  id="phone"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                  placeholder="010-1234-5678"
                  className="border-2 border-blue-100 focus:border-blue-300 py-4 text-lg"
                />
              </div>
              
              {skipCompanySelection && (
                <div className="space-y-3">
                  <Label htmlFor="companyGuess" className="text-lg font-medium flex items-center">
                    <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                    문의할 기업명 (아는 경우만)
                  </Label>
                  <Input
                    id="companyGuess"
                    value={userInfo.companyGuess}
                    onChange={(e) => setUserInfo({...userInfo, companyGuess: e.target.value})}
                    placeholder="예: 삼성전자, 네이버, 쿠팡 등"
                    className="border-2 border-blue-100 focus:border-blue-300 py-4 text-lg"
                  />
                  <p className="text-sm text-gray-500">
                    💡 모르셔도 괜찮아요! 문의 내용을 보고 저희가 적절한 기업을 찾아드려요
                  </p>
                </div>
              )}
              
              {(selectedType === "refund" || selectedType === "complaint") && (
                <div className="space-y-3">
                  <Label htmlFor="orderNumber" className="text-lg font-medium">주문번호 (있는 경우)</Label>
                  <Input
                    id="orderNumber"
                    value={userInfo.orderNumber}
                    onChange={(e) => setUserInfo({...userInfo, orderNumber: e.target.value})}
                    placeholder="예: ORD-2024-001"
                    className="border-2 border-blue-100 focus:border-blue-300 py-4 text-lg"
                  />
                </div>
              )}
              
              <div className="space-y-3">
                <Label htmlFor="keywords" className="text-lg font-medium">키워드 (AI 문구 생성용)</Label>
                <Input
                  id="keywords"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="예: 배송 지연, 제품 불량, 계정 잠금"
                  className="border-2 border-blue-100 focus:border-blue-300 py-4 text-lg"
                />
                <p className="text-base text-gray-500">
                  💡 키워드를 입력하면 AI가 더 정확한 문의 문구를 생성합니다
                </p>
              </div>
              
              <div className="flex space-x-4 pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 py-4 text-lg"
                  size="lg"
                >
                  이전
                </Button>
                <Button 
                  onClick={() => setCurrentStep(3)}
                  disabled={!userInfo.name || !userInfo.email}
                  className="flex-1 py-4 text-lg"
                  size="lg"
                >
                  다음 단계
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: 문의 내용 작성 */}
        {currentStep === 3 && (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-4">문의 내용을 작성해주세요</CardTitle>
              <p className="text-center text-lg text-gray-600">
                AI가 도와드리니까 키워드만 입력하셔도 됩니다
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex space-x-4 mb-6">
                <Button
                  onClick={generateAIInquiry}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-4 px-8 text-lg"
                  size="lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {isGenerating ? "AI 문구 생성 중..." : "AI 문구 자동 생성"}
                </Button>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="inquiry" className="text-lg font-medium">문의 내용</Label>
                <Textarea
                  id="inquiry"
                  value={inquiryText}
                  onChange={(e) => setInquiryText(e.target.value)}
                  placeholder="문의할 내용을 입력하세요. AI 자동 생성 버튼을 사용하면 더 쉽게 작성할 수 있습니다."
                  className="min-h-[250px] border-2 border-blue-100 focus:border-blue-300 text-lg"
                />
              </div>
              
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-bold text-lg mb-4">📋 문의 요약</h4>
                <div className="text-base space-y-2">
                  <p><strong>기업:</strong> {skipCompanySelection ? (userInfo.companyGuess || '저희가 찾아드려요') : company}</p>
                  <p><strong>유형:</strong> {inquiryTypes.find(t => t.id === selectedType)?.label}</p>
                  <p><strong>이름:</strong> {userInfo.name}</p>
                  <p><strong>이메일:</strong> {userInfo.email}</p>
                  {skipCompanySelection && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-yellow-800 text-sm">
                        💡 기업을 선택하지 않으셨어도 괜찮아요! 문의 내용을 분석해서 적절한 기업을 찾아 전달해드릴게요.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-4 pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 py-4 text-lg"
                  size="lg"
                >
                  이전
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!inquiryText.trim() || isSubmitting}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 py-4 text-lg"
                  size="lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isSubmitting ? "전송 중..." : skipCompanySelection ? "문의 접수하기" : "문의 전송"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InquiryFlow;
