import { Info } from "lucide-react";

const EnrolledQuizzesPlaceholder = () => {
  return (
    <div className="border border-dashed border-border rounded-2xl p-8 text-center">
      <Info className="w-6 h-6 mx-auto text-muted-foreground mb-3" />
      <h3 className="font-semibold mb-1">No Enrolled Quizzes Yet</h3>
      <p className="text-sm text-muted-foreground">
        Once you enroll in a quiz, it will appear here.
      </p>
    </div>
  );
};

export default EnrolledQuizzesPlaceholder;
