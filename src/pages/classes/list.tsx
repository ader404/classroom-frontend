import { useGo } from "@refinedev/core";
import { Button } from "@/components/ui/button.tsx";





const list = () => {

    const go = useGo();

    return (
        <div>
            <h4>list</h4>
            <Button
                onClick={() =>
                    go({
                        to: "/classes/create",
                        type: "push",
                    })
                }
            >
                Create Class
            </Button>
        </div>

    )
}

export default list