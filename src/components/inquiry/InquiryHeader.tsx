
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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="hover:bg-gray-50 px-4 py-2 text-black"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              돌아가기
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-black">문의 작성</h1>
              {skipCompanySelection ? (
                <p className="text-base text-[#00BB66] font-medium">저희가 적절한 기업을 찾아드려요</p>
              ) : (
                <p className="text-base text-gray-600">{company}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="bg-gray-100 text-black px-3 py-1 font-medium">
              단계 {currentStep}/2
            </Badge>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="border-2 border-[#00BB66] text-[#00BB66] hover:bg-gray-50 px-3 py-1 text-sm">
                <Phone className="w-3 h-3 mr-1" />
                전화: 1588-1234
              </Button>
              <Button variant="outline" size="sm" className="border-2 border-gray-300 text-black hover:bg-gray-50 px-3 py-1 text-sm">
                <MessageCircle className="w-3 h-3 mr-1" />
                문자: 010-1234-5678
              </Button>
            </div>
          </div>
        </div>
        <Progress value={progress} className="mt-4 h-2 bg-gray-200">
          <div 
            className="h-full bg-[#00BB66] transition-all duration-300 rounded-full" 
            style={{ width: `${progress}%` }}
          />
        </Progress>
      </div>
    </header>
  );
};

export default InquiryHeader;
