
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Building2, Star } from "lucide-react";

interface CompanySearchProps {
  onCompanySelect: (company: string) => void;
  onBack: () => void;
}

const CompanySearch = ({ onCompanySelect, onBack }: CompanySearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const popularCompanies = [
    { name: "삼성전자", category: "전자제품", rating: 4.5 },
    { name: "네이버", category: "IT/인터넷", rating: 4.3 },
    { name: "쿠팡", category: "이커머스", rating: 4.1 },
    { name: "카카오", category: "IT/인터넷", rating: 4.4 },
    { name: "현대자동차", category: "자동차", rating: 4.2 },
    { name: "LG전자", category: "전자제품", rating: 4.3 },
    { name: "SK텔레콤", category: "통신", rating: 4.0 },
    { name: "KB국민은행", category: "금융", rating: 3.9 },
  ];

  const filteredCompanies = popularCompanies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              돌아가기
            </Button>
            <h1 className="text-xl font-bold text-gray-900">기업 선택</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center text-2xl">문의할 기업을 찾아보세요</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="기업명을 검색하세요 (예: 삼성, 네이버, 쿠팡)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 text-lg border-2 border-blue-100 focus:border-blue-300 rounded-xl"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Companies Grid */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            {searchTerm ? `"${searchTerm}" 검색 결과` : '인기 기업'}
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCompanies.map((company) => (
              <Card 
                key={company.name}
                className="border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/60 backdrop-blur-sm hover:bg-white/80"
                onClick={() => onCompanySelect(company.name)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-gray-900">{company.name}</h4>
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                          {company.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{company.rating}</span>
                    </div>
                    <Button size="sm" variant="ghost" className="text-blue-600 hover:bg-blue-50">
                      문의하기 →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-500">다른 키워드로 검색해보거나 인기 기업을 선택해보세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanySearch;
