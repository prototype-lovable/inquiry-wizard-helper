
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Send } from "lucide-react";

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  orderNumber: string;
  companyGuess: string;
}

interface InquiryType {
  id: string;
  label: string;
}

interface InquiryComposerProps {
  inquiryText: string;
  onInquiryTextChange: (text: string) => void;
  isGenerating: boolean;
  onGenerateAI: () => void;
  isSubmitting: boolean;
  onSubmit: () => void;
  onBack: () => void;
  company: string;
  skipCompanySelection: boolean;
  userInfo: UserInfo;
  selectedType: string;
  inquiryTypes: InquiryType[];
}

const InquiryComposer = ({
  inquiryText,
  onInquiryTextChange,
  isGenerating,
  onGenerateAI,
  isSubmitting,
  onSubmit,
  onBack,
  company,
  skipCompanySelection,
  userInfo,
  selectedType,
  inquiryTypes
}: InquiryComposerProps) => {
  return (
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
            onClick={onGenerateAI}
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
            onChange={(e) => onInquiryTextChange(e.target.value)}
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
            onClick={onBack}
            className="flex-1 py-4 text-lg"
            size="lg"
          >
            이전
          </Button>
          <Button 
            onClick={onSubmit}
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
  );
};

export default InquiryComposer;
