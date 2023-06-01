import { useAuth0 } from "@auth0/auth0-react";
import { message } from "antd";
import { useEffect } from "react";
import "./App.css";
import RoutesTree from "./components/shared/routes/RoutesTree";
import { PageLoader } from "./shared/loader/PageLoader";

export const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      messageApi.open({
        type: "success",
        content: "Already authenticated",
      });
    }
  }, [isAuthenticated, messageApi]);

  return (
    <>
      {contextHolder}
      {isLoading ? <PageLoader /> : <RoutesTree />}
    </>);
};

export default App;
