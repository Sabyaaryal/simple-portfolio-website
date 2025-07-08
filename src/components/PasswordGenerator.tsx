
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, Shield, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
}

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: false,
    excludeSimilar: false,
  });
  const { toast } = useToast();

  const generatePassword = () => {
    let charset = "";
    let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowercase = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    // Exclude similar characters if requested
    if (options.excludeSimilar) {
      uppercase = uppercase.replace(/[IL]/g, "");
      lowercase = lowercase.replace(/[il]/g, "");
      numbers = numbers.replace(/[01]/g, "");
      symbols = symbols.replace(/[|`]/g, "");
    }

    if (options.includeUppercase) charset += uppercase;
    if (options.includeLowercase) charset += lowercase;
    if (options.includeNumbers) charset += numbers;
    if (options.includeSymbols) charset += symbols;

    if (charset === "") {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive",
      });
      return;
    }

    let result = "";
    for (let i = 0; i < options.length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(result);
    setCopied(false);
    
    toast({
      title: "Password Generated",
      description: "New secure password created successfully!",
    });
  };

  const copyToClipboard = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Password copied to clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy password",
        variant: "destructive",
      });
    }
  };

  const getPasswordStrength = (pwd: string): { level: string; color: string; score: number } => {
    if (!pwd) return { level: "None", color: "text-gray-400", score: 0 };

    let score = 0;
    
    // Length scoring
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 1;
    
    // Character variety scoring
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 1;

    if (score <= 2) return { level: "Weak", color: "text-red-500", score };
    if (score <= 4) return { level: "Fair", color: "text-yellow-500", score };
    if (score <= 6) return { level: "Good", color: "text-blue-500", score };
    return { level: "Strong", color: "text-green-500", score };
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Password Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Generated Password Display */}
          <div className="space-y-2">
            <Label>Generated Password</Label>
            <div className="flex gap-2">
              <Input
                value={password}
                readOnly
                placeholder="Click 'Generate' to create a password"
                className="font-mono text-lg"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={copyToClipboard}
                disabled={!password}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            {password && (
              <div className="flex items-center justify-between text-sm">
                <span>
                  Strength: <span className={strength.color}>{strength.level}</span>
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((level) => (
                    <div
                      key={level}
                      className={`w-3 h-2 rounded-sm ${
                        level <= strength.score
                          ? strength.score <= 2
                            ? "bg-red-500"
                            : strength.score <= 4
                            ? "bg-yellow-500"
                            : strength.score <= 6
                            ? "bg-blue-500"
                            : "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Password Options */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Password Length: {options.length}</Label>
              <Input
                type="range"
                min="4"
                max="50"
                value={options.length}
                onChange={(e) =>
                  setOptions({ ...options, length: parseInt(e.target.value) })
                }
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="uppercase"
                    checked={options.includeUppercase}
                    onCheckedChange={(checked) =>
                      setOptions({ ...options, includeUppercase: !!checked })
                    }
                  />
                  <Label htmlFor="uppercase">Uppercase Letters (A-Z)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lowercase"
                    checked={options.includeLowercase}
                    onCheckedChange={(checked) =>
                      setOptions({ ...options, includeLowercase: !!checked })
                    }
                  />
                  <Label htmlFor="lowercase">Lowercase Letters (a-z)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="numbers"
                    checked={options.includeNumbers}
                    onCheckedChange={(checked) =>
                      setOptions({ ...options, includeNumbers: !!checked })
                    }
                  />
                  <Label htmlFor="numbers">Numbers (0-9)</Label>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="symbols"
                    checked={options.includeSymbols}
                    onCheckedChange={(checked) =>
                      setOptions({ ...options, includeSymbols: !!checked })
                    }
                  />
                  <Label htmlFor="symbols">Symbols (!@#$%...)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="excludeSimilar"
                    checked={options.excludeSimilar}
                    onCheckedChange={(checked) =>
                      setOptions({ ...options, excludeSimilar: !!checked })
                    }
                  />
                  <Label htmlFor="excludeSimilar">Exclude Similar (i, l, 1, L, o, 0, O)</Label>
                </div>
              </div>
            </div>
          </div>

          <Button onClick={generatePassword} className="w-full" size="lg">
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate Password
          </Button>

          {/* Security Tips */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Security Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use passwords that are at least 12 characters long</li>
              <li>• Include a mix of uppercase, lowercase, numbers, and symbols</li>
              <li>• Never reuse passwords across multiple accounts</li>
              <li>• Consider using a password manager</li>
              <li>• Enable two-factor authentication when available</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordGenerator;
