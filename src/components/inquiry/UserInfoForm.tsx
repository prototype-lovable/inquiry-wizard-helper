
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2 } from "lucide-react";

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
}

const UserInfoForm = ({ 
  userInfo, 
  onUserInfoChange, 
  keywords, 
  onKeywordsChange, 
  selectedType, 
  skipCompanySelection, 
  onBack, 
  onNext 
}: UserInfoFormProps) => {
  return (
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
            onChange={(e) => onUserInfoChange({...userInfo, name: e.target.value})}
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
            onChange={(e) => onUserInfoChange({...userInfo, email: e.target.value})}
            placeholder="example@email.com"
            className="border-2 border-blue-100 focus:border-blue-300 py-4 text-lg"
          />
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="phone" className="text-lg font-medium">연락처 (선택사항)</Label>
          <Input
            id="phone"
            value={userInfo.phone}
            onChange={(e) => onUserInfoChange({...userInfo, phone: e.target.value})}
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
              onChange={(e) => onUserInfoChange({...userInfo, companyGuess: e.target.value})}
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
              onChange={(e) => onUserInfoChange({...userInfo, orderNumber: e.target.value})}
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
            onChange={(e) => onKeywordsChange(e.target.value)}
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
            onClick={onBack}
            className="flex-1 py-4 text-lg"
            size="lg"
          >
            이전
          </Button>
          <Button 
            onClick={onNext}
            disabled={!userInfo.name || !userInfo.email}
            className="flex-1 py-4 text-lg"
            size="lg"
          >
            다음 단계
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoForm;
