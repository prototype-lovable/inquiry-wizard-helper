
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Phone, MessageCircle } from "lucide-react";

interface InquiryHeaderProps {
  onBack: () => void;
  company: string;
  skipCompanySelection: boolean;
  currentStep: number;
  progress: number;
}

const InquiryHeader = ({ onBack, company, skipCompanySelection, currentStep, progress }: InquiryHeaderProps) => {
  return (
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
  );
};

export default InquiryHeader;
