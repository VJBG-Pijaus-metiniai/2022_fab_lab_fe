import React, { useEffect, useState } from "react";
import { SectionWrapper } from "components/wrappers/SectionWrapper";
import { ProgressBar } from "components/items/ProgressBar";
import { useRouter } from "next/router";
import { GetCurrentUser } from "api";
import { ImageUpload } from "components/pages/ImageUpload";
import { ProjectInfo } from "components/pages/ProjectInfo";
import { ProjectSummary } from "components/pages/ProjectSummary";

const steps = ["Images", "Project info", "Preview"];

const CreateProject = () => {
  const [step, setStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    GetCurrentUser().then((user) => !user && router.push("/"));
  }, []);

  const handleBack = () => {
    if (step <= 0) {
      router.push("/");
    } else {
      setStep(step - 1);
    }
  };

  const handleNext = () => {
    if (step >= steps.length - 1) {
      router.push("/");
    } else {
      setStep(step + 1);
    }
  };

  return (
    <SectionWrapper>
      <ProgressBar onBack={handleBack} steps={steps} currStep={step} />
      {step === 0 && <ImageUpload onNext={handleNext} />}
      {step === 1 && <ProjectInfo onNext={handleNext} />}
      {step === 2 && <ProjectSummary />}
    </SectionWrapper>
  );
};

export default CreateProject;
