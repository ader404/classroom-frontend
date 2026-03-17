import { useGo } from "@refinedev/core";
import { Button } from "@/components/ui/button";

const SubjectCreate = () => {
  const go = useGo();
  return (
    <div>
      <Button
        onClick={() =>
          go({
            to: "/subjects",
            type: "push",
          })
        }
      >
        Go back
      </Button>
    </div>
  );
};

export default SubjectCreate;
