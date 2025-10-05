import { Clock, type LucideIcon, Shield, CalendarClock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { HouseRuleIconMap, PoliciesData } from "@/lib/data/data";

interface PolicyProps {
  policies: PoliciesData;
}

const Policy = ({ policies }: PolicyProps) => {
  const getRuleIcon = (iconName: string): LucideIcon | undefined => {
    return HouseRuleIconMap[iconName];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Stay policies</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="bg-[#F1F3EE] rounded-xl p-6 text-[#333333]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2">
              <Clock className="size-5" />
            </div>
            <h3 className="font-semibold text-lg">Check-in & Check-out</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-[#5C5C5A]">Check-in Time</p>
              <p className="font-semibold text-lg">
                {policies.checkTimes.checkInTime}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-[#5C5C5A]">Check-out Time</p>
              <p className="font-semibold text-lgå">
                {policies.checkTimes.checkOutTime}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#F1F3EE] rounded-xl p-6 text-[#333333]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2">
              <Shield className="size-5" />
            </div>
            <h3 className="font-semibold text-lg">House Rules</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {policies.houseRules.map((rule) => {
              const IconComponent = getRuleIcon(rule.icon);

              return (
                <div
                  className="flex items-center gap-3 bg-white rounded-lg p-4"
                  key={rule.name}
                >
                  {IconComponent && (
                    <IconComponent className="text-[#5C5C5A] size-5" />
                  )}
                  <p className="font-semibold text-lg">{rule.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#F1F3EE] rounded-xl p-6 text-[#333333]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2">
              <CalendarClock className="size-5" />
            </div>
            <h3 className="font-semibold text-lg">Cancellation Policy</h3>
          </div>
          <div className="space-y-4">
            {policies.cancellationPolicies.map((policy, i) => (
              <div className="bg-white rounded-lg p-4" key={i}>
                <h4 className="font-medium mb-2 text-[#333333]">
                  {policy.duration}
                </h4>
                <ul className="text-sm text-[#5C5C5A] list-disc">
                  {policy.rules.map((rule, j) => (
                    <li className="ml-4" key={j}>
                      {rule.condition} {rule.details}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Policy;
