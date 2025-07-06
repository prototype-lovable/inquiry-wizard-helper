
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Sparkles } from "lucide-react";
import { useInquiryAI } from "@/hooks/useInquiryAI";

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  orderNumber: string;
  companyGuess: string;
}

interface UserInfoFormProps {
  userInfo: UserInfo;
  onUserInfoChange: (userInfo: UserInfo) => void;
  keywords: string;
  onKeywordsChange: (keywords: string) => void;
  selectedType: string;
  skipCompanySelection: boolean;
  onBack: () => void;
  onNext: () => void;
  inquiryText: string;
  onInquiryTextChange: (text: string) => void;
  company: string;
}

const UserInfoForm = ({ 
  userInfo, 
  onUserInfoChange, 
  keywords, 
  onKeywordsChange, 
  selectedType, 
  skipCompanySelection, 
  onBack, 
  onNext,
  inquiryText,
  onInquiryTextChange,
  company
}: UserInfoFormProps) => {
  const { generateAIInquiry } = useInquiryAI();
  const [isGenerating, setIsGenerating] = useState(false);

  // Auto-generate inquiry text when keywords change
  useEffect(() => {
    if (keywords.trim()) {
      generateAIInquiry(selectedType, company, userInfo, keywords, onInquiryTextChange, setIsGenerating);
    }
  }, [keywords, selectedType, company, userInfo, onInquiryTextChange, generateAIInquiry]);

  return (
    <Card className="border-2 border-gray-200 shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="text-2xl text-center mb-3 text-black">기본 정보 및 문의 내용</CardTitle>
        <p className="text-center text-base text-gray-600">
          답변을 받기 위해 필요한 정보와 문의 내용을 입력해주세요
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-medium text-black">이름 *</Label>
            <Input
              id="name"
              value={userInfo.name}
              onChange={(e) => onUserInfoChange({...userInfo, name: e.target.value})}
              placeholder="홍길동"
              className="border-2 border-gray-200 focus:border-[#00BB66] h-10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-medium text-black">이메일 *</Label>
            <Input
              id="email"
              type="email"
              value={userInfo.email}
              onChange={(e) => onUserInfoChange({...userInfo, email: e.target.value})}
              placeholder="example@email.com"
              className="border-2 border-gray-200 focus:border-[#00BB66] h-10"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base font-medium text-black">연락처 (선택사항)</Label>
            <Input
              id="phone"
              value={userInfo.phone}
              onChange={(e) => onUserInfoChange({...userInfo, phone: e.target.value})}
              placeholder="010-1234-5678"
              className="border-2 border-gray-200 focus:border-[#00BB66] h-10"
            />
          </div>
          
          {(selectedType === "refund" || selectedType === "complaint") && (
            <div className="space-y-2">
              <Label htmlFor="orderNumber" className="text-base font-medium text-black">주문번호 (있는 경우)</Label>
              <Input
                id="orderNumber"
                value={userInfo.orderNumber}
                onChange={(e) => onUserInfoChange({...userInfo, orderNumber: e.target.value})}
                placeholder="예: ORD-2024-001"
                className="border-2 border-gray-200 focus:border-[#00BB66] h-10"
              />
            </div>
          )}
        </div>
        
        {skipCompanySelection && (
          <div className="space-y-2">
            <Label htmlFor="companyGuess" className="text-base font-medium text-black flex items-center">
              <Building2 className="w-4 h-4 mr-2 text-[#00BB66]" />
              문의할 기업명 (아는 경우만)
            </Label>
            <Input
              id="companyGuess"
              value={userInfo.companyGuess}
              onChange={(e) => onUserInfoChange({...userInfo, companyGuess: e.target.value})}
              placeholder="예: 삼성전자, 네이버, 쿠팡 등"
              className="border-2 border-gray-200 focus:border-[#00BB66] h-10"
            />
            <p className="text-sm text-gray-500">
              💡 모르셔도 괜찮아요! 문의 내용을 보고 저희가 적절한 기업을 찾아드려요
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="keywords" className="text-base font-medium text-black flex items-center">
            <Sparkles className="w-4 h-4 mr-2 text-[#00BB66]" />
            키워드 입력 (실시간 문의 생성)
          </Label>
          <Input
            id="keywords"
            value={keywords}
            onChange={(e) => onKeywordsChange(e.target.value)}
            placeholder="예: 배송 지연, 제품 불량, 계정 잠금"
            className="border-2 border-gray-200 focus:border-[#00BB66] h-10"
          />
          <p className="text-sm text-gray-500">
            💡 키워드를 입력하면 아래 문의 내용이 실시간으로 생성됩니다
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="inquiry" className="text-base font-medium text-black">문의 내용</Label>
          <Textarea
            id="inquiry"
            value={inquiryText}
            onChange={(e) => onInquiryTextChange(e.target.value)}
            placeholder="키워드를 입력하면 문의 내용이 자동으로 작성됩니다. 직접 입력하거나 수정도 가능합니다."
            className="min-h-[200px] border-2 border-gray-200 focus:border-[#00BB66]"
          />
          {isGenerating && (
            <p className="text-sm text-[#00BB66] flex items-center">
              <Sparkles className="w-4 h-4 mr-1 animate-spin" />
              AI가 문의 내용을 생성하고 있어요...
            </p>
          )}
        </div>
        
        <div className="flex space-x-3 pt-4">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex-1 h-10 border-2 border-gray-300 text-black hover:bg-gray-50"
          >
            이전
          </Button>
          <Button 
            onClick={onNext}
            disabled={!userInfo.name || !userInfo.email}
            className="flex-1 h-10 bg-[#00BB66] hover:bg-[#009955] text-white"
          >
            문의 전송
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoForm;
