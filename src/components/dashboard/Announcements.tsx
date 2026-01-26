import { Check, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const announcements = [
  { id: 1, text: "Team Outing on August 5th!", completed: true },
  { id: 2, text: "Submit Expense Reports by Friday", completed: true },
];

export function Announcements() {
  return (
    <div className="bg-card rounded-xl p-5 border border-border shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-foreground">Announcements</h3>
        <div className="flex gap-1">
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className={`w-1.5 h-1.5 rounded-full ${
                dot === 1 ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
          >
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-5 h-5 rounded border-2 border-primary bg-primary-light flex items-center justify-center">
                {announcement.completed && (
                  <Check className="w-3 h-3 text-primary" />
                )}
              </div>
            </div>
            <p className="text-sm text-foreground">{announcement.text}</p>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="w-full mt-4 border-primary text-primary hover:bg-primary-light"
      >
        Post New
      </Button>
    </div>
  );
}
