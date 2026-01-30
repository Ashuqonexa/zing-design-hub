import { Building2, CreditCard, Hash, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface BankDetails {
  accountHolderName: string;
  accountNumber: string;
  confirmAccountNumber: string;
  bankName: string;
  branchName: string;
  ifscCode: string;
  accountType: string;
  isVerified: boolean;
}

interface BankDetailsCardProps {
  details: BankDetails;
  onDetailsChange?: (details: BankDetails) => void;
}

export function BankDetailsCard({ details, onDetailsChange }: BankDetailsCardProps) {
  const handleSave = () => {
    if (details.accountNumber !== details.confirmAccountNumber) {
      toast({
        title: "Account Numbers Don't Match",
        description: "Please ensure both account numbers are the same.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Bank Details Updated",
      description: "Your bank account information has been saved.",
    });
  };

  const handleChange = (field: keyof BankDetails, value: string | boolean) => {
    onDetailsChange?.({ ...details, [field]: value });
  };

  const maskAccountNumber = (num: string) => {
    if (num.length <= 4) return num;
    return "•".repeat(num.length - 4) + num.slice(-4);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Bank Account Details
            </CardTitle>
            <CardDescription>
              Your salary will be credited to this account
            </CardDescription>
          </div>
          {details.isVerified ? (
            <Badge variant="default" className="bg-green-500">Verified</Badge>
          ) : (
            <Badge variant="secondary">Pending Verification</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="accountHolder" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Account Holder Name
          </Label>
          <Input
            id="accountHolder"
            value={details.accountHolderName}
            onChange={(e) => handleChange("accountHolderName", e.target.value)}
            placeholder="Name as per bank records"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="accountNumber" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Account Number
            </Label>
            <Input
              id="accountNumber"
              value={details.accountNumber}
              onChange={(e) => handleChange("accountNumber", e.target.value)}
              placeholder="Enter account number"
              type="password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmAccount">Confirm Account Number</Label>
            <Input
              id="confirmAccount"
              value={details.confirmAccountNumber}
              onChange={(e) => handleChange("confirmAccountNumber", e.target.value)}
              placeholder="Re-enter account number"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="bankName" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Bank Name
            </Label>
            <Input
              id="bankName"
              value={details.bankName}
              onChange={(e) => handleChange("bankName", e.target.value)}
              placeholder="e.g., HDFC Bank"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="branchName">Branch Name</Label>
            <Input
              id="branchName"
              value={details.branchName}
              onChange={(e) => handleChange("branchName", e.target.value)}
              placeholder="e.g., Sector 15, Gurugram"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="ifsc" className="flex items-center gap-2">
              <Hash className="h-4 w-4" />
              IFSC Code
            </Label>
            <Input
              id="ifsc"
              value={details.ifscCode}
              onChange={(e) => handleChange("ifscCode", e.target.value.toUpperCase())}
              placeholder="e.g., HDFC0001234"
              maxLength={11}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="accountType">Account Type</Label>
            <Input
              id="accountType"
              value={details.accountType}
              onChange={(e) => handleChange("accountType", e.target.value)}
              placeholder="e.g., Savings"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Bank Details</Button>
        </div>
      </CardContent>
    </Card>
  );
}
