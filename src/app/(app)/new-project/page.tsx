
import { IslamicPattern } from "@/components/islamic-pattern";
import { NewProjectForm } from "@/components/new-project-form";


export default function NewProjectPage() {

  return (
    <div>
        <header className="bg-gradient-to-br from-primary to-green-600 text-primary-foreground p-6 relative overflow-hidden">
            <IslamicPattern className="opacity-10" />
            <div className="relative z-10">
                <h1 className="text-3xl font-bold font-headline mb-1">Submit Your Project</h1>
            </div>
        </header>

        <div className="p-4 md:p-6">
            <NewProjectForm />
        </div>
    </div>
  );
}
